import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (UserID) => {
    try {
    const user = await User.findById(UserID);

    if (!user) {
    throw new Error("User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    
    return { refreshToken, accessToken };
} catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error(error.message); // Re-throw the error to be handled by the caller
    }
};



const registerUser = async(req,res)=>{
    try {
        const { Username, Email, Password,MobileNo} = req.body

        if(!Username || !Email || !Password || !MobileNo){
            return res.status(400).json({
                message: " All the fields are mandatory"
            })
        }
        
        const checkuser = await User.findOne({
            $or:[{Username},{Email}]
        })

        if(checkuser){
            return res.status(400).json({
                message: "Email or Username already exists"
            })
        }

        const Createduser = await User.create({
            Username: Username.toLowerCase(),
            Email,
            Password,
            MobileNo
        })

        const user = await User.findById(Createduser._id).select("-Password -refreshToken")

        if (!user) {
            return res.status(400).json({
                messgae:"Something went wrong during registration"
            })
        }

        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async(req,res)=>{
try {
    
        const { Email,Username, Password } = req.body
    
        if(!Email && !Username){
            return res.status(400).json({
                message:"Username or Email is required"
            })
        }
    
        const checkuser = await User.findOne({
            $or:[{Email},{Username}]
        })
    
        if(!checkuser){
            return res.status(400).json({
                message:"Username or Email not found"
            })
        }
    
        const checkpass = await checkuser.isPasswordCorrect(Password)
    
        if(!checkpass){
            return res.status(400).json({
                message:"The password is incorrect"
            })
        }
    
        const {refreshToken,accessToken} = await generateAccessAndRefreshToken(checkuser._id)
    
        const loggeduser = await User.findById(checkuser._id).select("-Password -refreshToken")
    
        const options = {
            httpOnly: true,
            secure: true 
        }
        
     
        res
        .status(200)
        .cookie("accessToken", accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(loggeduser,accessToken,refreshToken)
    
    
} catch (error) {
    return res.status(500).json({
        message: error.message

    })
} 
}


const changePassword = async(req,res)=>{
    try {
        const userId = req.user

        const { NewPassword } = req.body

        const user = await User.findById(userId)

        const checkSamePassword = user.isPasswordCorrect(NewPassword)
        console.log(checkSamePassword)

        if(checkSamePassword){
            return res.status(400).json({
                message: "The Password is same to that if the old password"
            })
        }

        user.Password = NewPassword

        const newPassUser = await user.save()

        if(!newPassUser){
            return res.status(400).json({
                message: "Something went wrong during the saving of the new password"
            })
        }

        return res
        .status(200)
        .json({
            message: "Password updated Succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })       
    }
}

const logout = async(req,res)=>{
    try {
        //clear cookie
        //clear refreshtoken from db
        //the user needs to be loggedin before to log out

        const deluser = await User.findByIdAndDelete(
            req.user,
            {
                $set:{
                    refreshToken: undefined
                }


        },{
            new: true
        })

        const options ={
            httpOnly: true,
            secure: true
        }

        res
        .status(200)
        .clearCookie("refreshToken",options)
        .clearCookie("accessToken",options)
        .json({
            message: "User Logged Out"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export { registerUser,loginUser,changePassword }
