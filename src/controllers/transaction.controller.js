import { Transaction } from "../models/transaction.model.js"
import { checkbalance } from "../utils/checkbal.utils.js"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"

const sendcredit = async(req,res)=>{
    const user = req.user

    const { ReceiverMobile, Amount, Category } = req.body

    const { balanceLeft }  = await checkbalance(user._id)

    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the sender and receiver within the session
        const sender = await User.findById(user._id).session(session);
        const receiver = await User.findOne({ ReceiverMobile }).session(session);

        // Ensure both users are valid
        if (!sender || !receiver) {
            throw new Error('Invalid sender or receiver');
        }

        // Ensure sender has enough balance
        if (sender.Balance < Amount) {
            throw new Error('Insufficient balance');
        }

        // Update balances
        sender.Balance -= Amount;
        receiver.Balance += Amount;

        // Save the updates within the session
        await sender.save({ session });
        await receiver.save({ session });

        // Record the transaction within the session
        const transaction = new Transaction({
            UserId: sender._id,
            ReceiverId: receiver._id,
            Amount,
            Balance: sender.Balance,
            Category,
            ReceiverMobile,
        });

        await transaction.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Transaction successful' });
    } catch (error) {
        // Abort the transaction on error
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error:error.message });
    }


}


export { sendcredit }