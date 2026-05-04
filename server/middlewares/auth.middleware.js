import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import appError from "../utils/error.util.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new appError("Unauthenticated, please login again", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new appError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new appError("Invalid or expired token, please login again", 401));
  }
};

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new appError("Unauthorized access", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new appError("You are not allowed to access this route", 403));
    }

    next();
  };
};