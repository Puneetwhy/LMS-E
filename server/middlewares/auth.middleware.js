import appError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new appError('Unauthenticated, please login again', 401));
  }

  const userDetails = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new appError('Permission denied', 403));
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

export{
      isLoggedIn,
      authorizedRoles,
      authorizeSubscriber
}