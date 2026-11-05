const Users = require("../models/User");

const {
  validateSignUp,
  validateLogin,
} = require("../validations/userValidation");
const signJwt = require("../utils/signJWT");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

//signup

const signUp = async (req, res, next) => {
  try {
    const validation = validateSignUp(req.body);

    if (validation.error) {
      throw new AppError(validation?.error.message, 400);
    }

    const { firstname, lastname, email, password } = req.body;

    //if user already exist

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      throw new AppError(
        "User with email already exist, kindly use a different email",
      );
    }

    //Hashing of password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user

    const user = await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError("Failed to create user");
    }

    //save user

    await user.save();

    const token = signJwt(user._id);

    res.status(201).json({
      status: "successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

//write login controller login


const login = async(req, res, next)=>{
    try {

        // const validation = validateLogin(req.body);

        // if(validation.error){
        //     throw new AppError(validation?.error.message)
        // };


        const {email, password} = req.body;

        const user = await Users.findOne({ email }).select("+password");

        if(!user){
            throw new AppError("Incorrect email or password")
        };

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            throw new AppError("Invalid email or password");
        };


        const token = signJwt(user._id);

        user.password = undefined;

        res.status(200).json({
            status: 'successful',
            message: "login successful",
            data: {
                user,
                token
            }
        });
        
    } catch (error) {
        next(error);
        res.status(404).json({
            status: "Invalid login details",
            message: error.message

        })
    }
};

module.exports = { signUp, login };
