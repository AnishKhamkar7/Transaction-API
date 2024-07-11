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
    ReceiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ReceiverMobile:{
        type: Number,
        required: true
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    Balance:{ 
        type: Number,
        required: true
    }

},{
    timestamps:true
})


export const Transaction = mongoose.model("Transaction",TransactionSchema)