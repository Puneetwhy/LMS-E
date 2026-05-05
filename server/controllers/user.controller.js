import User from "../models/user.model.js";
import appError from "../utils/error.util.js";
import { v2 as cloudinary } from "cloudinary"; // ✅ Fixed: named import so .uploader works directly
import fs from 'fs';
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none"
}

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new appError('All fields are required', 400));
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new appError('Email already exists', 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=360'
    }
  });

  if (!user) {
    return next(new appError('User registration failed, please try again', 400));
  }

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lms',
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'fill'
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.unlink(req.file.path, (err) => {
          if (err) console.log("File delete fail:", err.message);
          else console.log("File deleted");
        });
      }
    } catch (e) {
      console.error("Upload error:", e.message);
    }
  }

  await user.save();

  const token = await user.generateJWTToken();

  user.password = undefined;

  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user,
    token  // ✅ Return token in body for Bearer fallback
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new appError('All fields are required', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return next(new appError(`Email or password doesn't match`, 400));
    }

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user,
      token  // ✅ Return token in body for Bearer fallback
    });

  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie('token', null, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: 'User Details',
      user,
    });
  } catch (e) {
    return next(new appError('Failed to fetch User Details', 500));
  }
};

async function forgotPassword(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next(new appError('Email required, please try again', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new appError('Email not registered', 400));
  }

  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const subject = 'Reset Password';
  const message = `You can reset your password by clicking <a href="${resetPasswordURL}" target="_blank">Reset your password</a>\nIf the above link does not work, copy and paste this link in a new tab: ${resetPasswordURL}.\nIf you did not request this, kindly ignore.`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully`
    });
  } catch (e) {
    // ✅ Correct field names (was 'frogotPasswordExpiry' — typo fixed)
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    return next(new appError(e.message, 500));
  }
}

async function resetPassword(req, res, next) {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // ✅ Consistent field name (fixed typo: was 'frogotPasswordExpiry')
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return next(new appError('Token is invalid or expired, please try again', 400));
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save(); // ✅ Fixed: was missing await

  res.status(200).json({
    success: true,
    message: 'Password changed successfully!',
  });
}

async function changePassword(req, res, next) {
  const { oldPassword, newPassword } = req.body;
  const id = req.user._id || req.user.id; // ✅ Fixed: was wrongly destructuring

  if (!oldPassword || !newPassword) {
    return next(new appError('All fields are required, please try again', 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new appError('User does not exist', 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new appError('Invalid old password', 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Password changed successfully!'
  });
}

async function updateUser(req, res, next) {
  const { fullName } = req.body;
  const id = req.user._id || req.user.id;

  const user = await User.findById(id);

  if (!user) {
    return next(new appError('User does not exist', 400));
  }

  // ✅ Fixed: was setting req.fullName instead of user.fullName
  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    // ✅ Destroy old avatar only if it's not the default email placeholder
    if (user.avatar?.public_id && user.avatar.public_id !== user.email) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lms',
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'fill'
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // ✅ Fixed: use fs.unlink instead of fs.rm (more compatible)
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("File delete fail:", err.message);
        });
      }
    } catch (e) {
      return next(new appError(e.message || 'File not uploaded, please try again', 500));
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: `User's details updated successfully!`
  });
}

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
};
