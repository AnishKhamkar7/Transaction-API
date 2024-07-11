import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    MobileNo:{
        type: Number,
        required: true,
        unique: true

    },
    Email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Password:{
        type:String,
        required: [true,"Password is required"]
    },
    Balance:{
        type:Number,
        required: true,
        default: 100
    },
    refreshToken:{
        type: String
    }
},{
    timestamps:true
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('Password')){
        return next();
    }
    this.Password = await bcrypt.hash(this.Password,10)
    next();
})

UserSchema.methods.isPasswordCorrect = async function(Password){
    return await bcrypt.compare(Password,this.Password)
}

UserSchema.methods.generateAccessToken = function() {
    const token = jwt.sign(
    {
    _id: this._id,
    Username: this.Username,
    Email: this.Email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    );
    return token;
};
  
  UserSchema.methods.generateRefreshToken = function() {
    const token = jwt.sign(
    {
    _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    );
    return token;
  };

export const User = mongoose.model("User",UserSchema)