import { Transaction } from "../models/transaction.model.js"
import { checkbalance } from "../utils/checkbal.utils.js"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { Category } from "../models/categories.model.js"

const sendcredit = async(req,res)=>{
    const user = req.user

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
        const transaction = new Transaction({
            UserId: user._id,
            ReceiverId: receiver._id,
            Amount,
            Balance: sender.Balance,
            ReceiverMobile,
        });

        const checkcategory = new Category({
            name : category,
            UserId: user._id
        })

        await transaction.save({ session });
        await checkcategory.save({ session });

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


export { sendcredit }