
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


module.exports = {
    getAllUsers,
    getUserProfile
};

