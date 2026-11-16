const Users = require("../models/User");

const {
  validateSignUp,
  validateLogin,
} = require("../validations/userValidation");
const signJwt = require("../utils/signJWT");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const crypto = require('crypto')

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

    //send email verification

    const options = {
      email: email,
      subject: "Welcome to Shopsy online store, where products are affordable.",
      message: "Welcome Onboard. We're pleased to have  you. Kindly keep an eye peel for verification."
    };

    await sendEmail(options);

    //create verification token

    const verificationToken = crypto.randomBytes(32).toString("hex");

    //hash verifiction token

    const hashedVerificationToken = await bcrypt.hash(verificationToken, salt);

    //create verification url

    const verificationUrl = `${req.protocol}"//${req.get(
      "host",
    )}/api/v1/auth/verify/${user.email}/${verificationToken}`;

    //create verifictaion message

    const verificationMessage = `Please click on the verification link to verify your email ${verificationUrl}`;

    const verificationMessageOption = {
      email: email,
      subject: "Verify your email address",
      message: verificationMessage
    };

    await sendEmail(verificationMessageOption);

    user.verification_token = hashedVerificationToken;


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

//verifyemail function

const verifyEmailAddress = async(req, res, next)=>{
  try {

    const {email, verificationToken} = req.params;

    if(!email || !verificationToken){
      throw new AppError("Provide email and token", 400);
    };

    //checj if use email exist

    const user = await Users.findOne({ email });

    if(!user){
      throw new AppError("User not found", 404)
    };

    const tokenValid = await bcrypt.compare(
      verificationToken,
      user.verification_token
    );

    if(!tokenValid){
      throw new AppError("Failed to verify user- invalid token")
    };
    
    user.email_verified = true;

    await user.save();

    res.status(201).json({
      message: "User Verified successfully",
      data: {
        user
      }
    })

    
  } catch (error) {
    next(error.message);
    res.status(404).json({
      status: "Failed",
      message: error.message
    })
  }
}

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


        //check if email is verified

        if(!user.email_verified){
          throw new AppError("Kindly verify email", 401)
        }

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


//write function for forgotPassword

module.exports = { 
  signUp, 
  verifyEmailAddress,
  login,
};
