const express = require("express");

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const {cloudinaryConfig} = require("../utils/cloudinary");
const { imageUploads } = require("../utils/multer");


const router = express.Router();

router.route("/allusers").get(userController.getAllUsers);

router.route("/profile")
.get(authMiddleware.protectRoute,  userController.getUserProfile)
.patch(authMiddleware.protectRoute, userController.updateProfile);

router.route("/update-profile-picture").patch(authMiddleware.protectRoute, imageUploads, cloudinaryConfig, userController.updateProfilePicture);

module.exports = router;