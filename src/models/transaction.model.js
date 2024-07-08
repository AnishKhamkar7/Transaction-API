import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    Amount:{
        type: Number,
        required: true,
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Description:{
        type:String
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

},{
    timestamps:true
})


export const Transaction = mongoose.model("Transaction",TransactionSchema)