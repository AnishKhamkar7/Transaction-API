import { Router } from "express";
import { loginUser, registerUser, changePassword } from "../controllers/user.controller.js";
import { vertfyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

//register user
router.route('/register').post(registerUser)

//login user
router.route('/login').post(loginUser)

//update password
router.route('/updatePassword').put(vertfyJWT,changePassword) //not yet tested



export default router

