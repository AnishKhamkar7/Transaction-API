import { Transaction } from "../models/transaction.model.js"
import { checkbalance } from "../utils/checkbal.utils.js"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { Category } from "../models/categories.model.js"

const sendcredit = async(req,res)=>{
    const userId = req.user

    const user = await User.findById(userId)

    if (!user) {
        return res.status(400).json({
            messag: "User Not found"
        })
    }

    const { ReceiverMobile, Amount, category } = req.body
    // console.log("ReceiverMobile:", ReceiverMobile);

    await checkbalance(user._id)

    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the sender and receiver within the session
        // const sender = await User.findById(user._id).session(session);

        // console.log(sender)
        const receiver = await User.findOne({MobileNo:ReceiverMobile}).session(session);
        // console.log(receiver)

        // Ensure both users are valid
        if (!receiver) {
            throw new Error('Invalid sender or receiver');
        }

        // Ensure sender has enough balance
        if (user.Balance < Amount) {
            throw new Error('Insufficient balance');
        }
        const amountToAdd = parseFloat(Amount);

        // Update balances
        user.Balance -= amountToAdd;
        receiver.Balance += amountToAdd;

        // Save the updates within the session
        await user.save({ session });
        await receiver.save({ session });

        // Record the transaction within the session
      
        const checkcategory = new Category({
            name : category,
            UserID: user._id
        })
        
        await checkcategory.save({ session });

        const transaction = new Transaction({
            UserId: user._id,
            ReceiverId: receiver._id,
            Amount,
            Balance: user.Balance,
            ReceiverMobile,
            Category: checkcategory._id
        });

        
        await transaction.save({ session });
       

        console.log(transaction);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
    

        res.status(200).json( { message: "Credit sent successfully", updatedBalance: receiver.Balance, transaction: transaction  });
    } catch (error) {
        // Abort the transaction on error
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error:error.message });
    }


}

const checkStatement = async(req,res)=>{
    try {
        const { _id } = req.params
        const userId = req.user
    
        if(_id != userId) {
            return res.status(404).json({
                message:"Cannot retrieve transaction history of this account"
            })
        }

        const statement = await Transaction.aggregate([
            {
                $match:{
                    UserId: userId
                }
            },
            {
                $lookup:{
                    from: "categories",
                    as: "userStatement",
                    foreignField: "_id",
                    localField: "Category"
                }
            },
            {
                $unwind: "$userStatement"
            },
            {
                $project:{
                    Amount: 1,
                    ReceiverMobile: 1,
                    Balance: 1,
                    Category: "$userStatement.name",
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
    
        if(!statement?.length){
            return res.status(404).json({
                message:  "Statement does not exists"
            })
        }
    
        return res
        .status(200)
        .json({message: "TRANSACTION HISTORY",statement})
    
    
    } catch (error) {
        return res.status(500).json({
            message:"something went wrong",error
        })
    }
}

export { sendcredit,checkStatement }