import appError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"

const isLoggedIn = async (req, res, next) => {
      const { token } = req.cookies;

      if(!token){
            return next(new appError('Unauthenticated, please login again', 500))
      }

      const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = userDetails;

      next();
}

const authorizedRoles = (...roles) => {
      return async (req,res, next) => {
            const currentUserRoles = req.user.role;
            if(!roles.include(currentUserRoles)){
                  return next(new appError('you do not have to permisson to access this route', 500));
            }
            next();
      }
}

const authorizeSubscriber = async (req, res, next) => {
      
      const user = await User.findById(req.user.id);
      const subscription = user.subscription;
      const currentUserRole = user.role;
      if(currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
            return next(new appError('Please subscribe to access this route', 500));
      }

      next();
}

export{
      isLoggedIn,
      authorizedRoles,
      authorizeSubscriber
}