import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import appError from "../utils/error.util.js";

// ================= AUTH MIDDLEWARE =================
export const isLoggedIn = async (req, res, next) => {
  try {
    let token = null;

    // 1. From cookies
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2. From Authorization header (Bearer token) — fallback for cross-origin
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new appError("Unauthenticated, please login again", 401));
    }

    if (!process.env.JWT_SECRET) {
      return next(new appError("JWT secret not configured", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new appError("User not found, please login again", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new appError("Invalid or expired token, please login again", 401)
    );
  }
};

// ================= ROLE AUTH =================
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(new appError("Unauthorized access", 401));
      }

      if (!roles.includes(req.user.role)) {
        return next(
          new appError("You are not allowed to access this route", 403)
        );
      }

      next();
    } catch (error) {
      return next(new appError("Authorization failed", 500));
    }
  };
};

// ================= SUBSCRIBER AUTH =================
// ✅ Added: allows access only if user has an active subscription
export const authorizeSubscriber = (req, res, next) => {
  try {
    if (!req.user) {
      return next(new appError("Unauthorized access", 401));
    }

    // ADMIN always passes (handled in route before this runs, but double-safe)
    if (req.user.role === "ADMIN") {
      return next();
    }

    if (req.user.subscription?.status !== "active") {
      return next(
        new appError("Please subscribe to access course lectures", 403)
      );
    }

    next();
  } catch (error) {
    return next(new appError("Authorization failed", 500));
  }
};
