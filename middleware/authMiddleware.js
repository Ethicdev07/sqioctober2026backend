const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
;

const protectRoute = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in, please login", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(decoded.id);

    if (!user) {
      return next(AppError("User with specified ID not found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(
        new AppError("You are not authorized to access this route", 403),
      );
    }
  } catch (error) {
    next(new AppError("Failed to verify admin status", 500));
  }
};

module.exports = {
  protectRoute,
  verifyAdmin,
};
