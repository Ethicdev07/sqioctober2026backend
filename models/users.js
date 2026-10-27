const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please provide firstname"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "please provide lastname"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide a vlaid email"],
    unique: [true, "Email must be unique"],
    trim: true,
  },
  pasword: {
    type: String,
    required: [true, "please provide a vlaid email"],
    minLength: [8, "Password must be at least 8 characters"],
    trim: true,
    select: false
  },
});
