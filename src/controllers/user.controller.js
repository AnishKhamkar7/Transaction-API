import { User } from "../models/user.model.js"

const registerUser = async(req,res)=>{
    try {
        const { Username, Email, Password} = req.body

        if(!Username || !Email || !Password){
            return res.status(400).json({
                message: " All the fields are mandatory"
            })
        }
        
        const checkuser = await User.findOne({
            $or:{
                Username,
                Email
            }
        })

        if(checkuser){
            return res.status(400).jon({
                message: "Email or Username already exists"
            })
        }

        




    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}