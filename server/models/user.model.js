import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from  'crypto';


const userSchema = new Schema({
      fullName : {
            type : 'String',
            required : [true, 'Name is required'],
            minLength : [5, 'Name must be at least 5 character'],
            maxLength : [50, 'Name should be less than 50 character'],
            lowercase : true,
            trim : true, 
      },

      email : {
            type : 'String',
            required : [true, 'Email is required'],
            lowercase : true,
            trim : true, 
            unique : true,
            match :[
                  /^[a-z0-9][a-z0-9._%+-]{0,63}@[a-z0-9][a-z0-9.-]{0,252}\.[a-z]{2,}$/i
            ]
      },

      password : {
            type : 'String',
            required : [true, 'Password is required'],
            minLength : [8, 'Password must be at least 8 character'],
            select : false
      },

      avatar : {
            public_id : {
                  type : 'String',

            },

            secure_url : {
                  type : 'String'
            }
      },

      role : {
            type : 'String',
            enum : ['USER', 'ADMIN'],
            default : 'USER'
      },

      forgotPasswordToken : String,
      frogotPasswordExpiry : Date,
      subscription: {
            id: String,
            status:  String,
      }
}, {
      timestamps : true
});


userSchema.pre('save', async function (next) {

    if (this && typeof this.isModified === 'function' && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    } else {
        console.log("[PRE-SAVE] Password not modified or this.isModified missing");
    }

});

userSchema.methods = { 
      generateJWTToken : async function() {
            return await jwt.sign({
                  id: this._id,
                  email: this.email,
                  subscription : this.subscription,
                  role: this.role
            },

             process.env.JWT_SECRET,

            {
                  expiresIn: process.env.JWT_EXPIRY,
            }
      )
      },


      comparePassword : async function(plainTextPassword) {
            return await bcrypt.compare(plainTextPassword, this.password)
      },

      generatePasswordResetToken : async () => {
            const resetToken = crypto.randomBytes(20).toString('hex');
            this.forgotPasswordToken = crypto
                  .createHash('sha256')
                  .update(resetToken)
                  .digest('hex');
            this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; 
            return resetToken;
      }
}

const User = model('User', userSchema);

export default User;