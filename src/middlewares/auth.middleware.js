import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const vertfyJWT = async(req,res,next) =>{
    try {
        const access = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!access){
            return res.status(400).json({
                message: "Token is missing"
            })
        }


        const verification = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(verification._id)

        if(!user){
            return res.status(400).json("Invalid UserID access")
        }

        req.user = user
        next();

    } catch (error) {
        res.status(400).json(error)
    }
}

export { vertfyJWT }