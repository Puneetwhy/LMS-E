import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
  fullName: {
    type: String,           // ✅ Fixed: was 'String' (string literal), should be String (constructor)
    required: [true, 'Name is required'],
    minLength: [5, 'Name must be at least 5 characters'],
    maxLength: [50, 'Name should be less than 50 characters'],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,           // ✅ Fixed: same issue
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [
      /^[a-z0-9][a-z0-9._%+-]{0,63}@[a-z0-9][a-z0-9.-]{0,252}\.[a-z]{2,}$/i,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,           // ✅ Fixed: same issue
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,         // ✅ Fixed
    },
    secure_url: {
      type: String          // ✅ Fixed
    }
  },
  role: {
    type: String,           // ✅ Fixed
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,   // ✅ Fixed: was 'frogotPasswordExpiry' (typo)
  subscription: {
    id: String,
    status: String,
  }
}, {
  timestamps: true
});

// ================= PRE SAVE =================
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // ✅ Simplified
  this.password = await bcrypt.hash(this.password, 10);
  next(); // ✅ Fixed: was missing next() call
});

// ================= METHODS =================
userSchema.methods = {

  generateJWTToken: async function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY || '7d'
      }
    );
  },

  comparePassword: async function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
  },

  // ✅ Fixed: was arrow function — arrow functions don't bind 'this'
  // so this.forgotPasswordToken was setting on undefined, causing 500
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

    return resetToken;
  }
};

const User = model('User', userSchema);
export default User;
