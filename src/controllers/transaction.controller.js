import { Transaction, Transaction } from "../models/transaction.model.js"

const savetransaction = async(req,res)=>{
    try {
        user = req.user
    
        const { Amount,Description,Category } = req.body
    
        if(!Amount || !Category){
            return res.status(400).json({
                message: "Fields are empty"
            })
        }
    
        const transaction = await Transaction.create({
            Amount: Amount,
            Description: Description,
            Category: Category,
            UserId: user._id 
        })
    
        if (!transaction) {
            return res.status(500).json({
                message: " ERROR DURinG SAVING TRANSCATION"
            })
        }

        const finaltransaction = await Transaction.findById(transaction._id).select( "-UserId")

        return res.status(200).json(finaltransaction)
    
    } catch (error) {
        
        return res.status(400).json({
            message: error.message
        })

    }
}


export { savetransaction }