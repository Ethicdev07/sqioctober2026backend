
const Users = require("../models/User");
const AppError = require("../utils/AppError");

//get all users

const getAllUsers = async(req, res, next)=>{
    try {

        const users = await Users.find();

        if(!users){
            throw new AppError("No users found", 404)
        };

        res.status(200).json({
            message: "All users fetched successfully",
            data: {
                users
            }
        })
        
    } catch (error) {
        next(error)
    }
}


//get user profile

const getUserProfile = async(req, res, next)=>{
    const userId = req.user._id
    try {
        
        const user = await Users.findById(userId);

        if(!user){
            throw new AppError("User not found", 404)
        };


        const fullname = user.getFullName();

        res.status(200).json({
            message: "user retrieved successfully",
            data: {
                user,
                fullname
            }
        })


    } catch (error) {
        next(error)
    }
};


//write function to updateProfile fields just firstname, lastname

const updateProfile = async(req, res, next)=>{
    try {
        const userId = req.user._id;
        const user = await Users.findById(userId);

        if(!user){
            throw new AppError("User not found", 404)
        };

        const allowFields = ["firstname", "lastname", "bio"];

        const fieldsToUpdate = Object.keys(req.body);

        fieldsToUpdate.forEach((field)=>{
            if(allowFields.includes(field)){
                user[field] = req.body[field]
            }
            else{
                throw new AppError(`Field ${field} is not allowed`, 400)
            }
        });

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            data: {
                user
            }
        })

    } catch (error) {
        next(error.message);
    }
};


//write for update password


module.exports = {
    getAllUsers,
    getUserProfile,
    updateProfile
};

