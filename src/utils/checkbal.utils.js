import { User } from "../models/user.model.js"

const checkbalance = async(userId) =>{
    const user = await User.findById(userId)

    if (user.Balance <= 0) {
        return resizeBy.status(400).json({
            message:"You dont have sufficient Balance"
        })
    }

    const remaningBal = user.Balance

    return { balanceLeft }
}

export { checkbalance }