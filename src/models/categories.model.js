import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  
},{
    timestamps:true
})


export const Category = mongoose.model("Category",CategorySchema)