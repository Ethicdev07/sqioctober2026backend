const express = require("express");

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/allusers").get(userController.getAllUsers);

router.route("/profile")
.get(authMiddleware.protectRoute,  userController.getUserProfile)
.patch(authMiddleware.protectRoute, userController.updateProfile);

module.exports = router;