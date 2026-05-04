import appError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new appError("Unauthenticated, please login again", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new appError("User not found", 401));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new appError("Invalid or expired token", 401));
  }
};

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new appError("Permission denied", 403));
    }
    next();
  };
};

const authorizeSubscriber = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new appError("User not found", 404));
  }

  if (user.role !== "ADMIN" && user.subscription?.status !== "active") {
    return next(new appError("Please subscribe", 403));
  }

  next();
};

export { isLoggedIn, authorizedRoles, authorizeSubscriber };