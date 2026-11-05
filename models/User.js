
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
    required: [true, "please provide a valid email"],
    unique: [true, "Email must be unique"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "please provide a valid password"],
    minLength: [8, "Password must be at least 8 characters"],
    trim: true,
    select: false
  },
  verification_token: {
    type: String
  }
//   role:{
//     type: String,
//     enum: ['user' | "admin"],
//     default: 'user'
//   }

});

userSchema.methods.comparePassword = async function(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

const Users = mongoose.model("Users", userSchema);
module.exports = Users;