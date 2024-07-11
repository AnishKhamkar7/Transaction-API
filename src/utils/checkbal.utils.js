import { User } from "../models/user.model.js"

const checkbalance = async(userId) =>{
    const user = await User.findById(userId)

    if (user.Balance <= 0) {
        throw new Error("You dont have sufficenit balance");
    }

    const remaningBal = user.Balance

}

export { checkbalance }