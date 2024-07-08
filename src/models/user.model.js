import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username:{
        type: Number,
        required: true,
        unqiue: true,
        lowercase:true
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
    }
},{
    timestamps:true
})


export const User = mongoose.model("User",UserSchema)