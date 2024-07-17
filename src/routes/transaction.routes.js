import { Router } from "express";
import { vertfyJWT } from "../middlewares/auth.middleware.js";
import { sendcredit,checkStatement,getCategoryHistory } from "../controllers/transaction.controller.js";
const router = Router()

// transfer credit and save the record of the trasaction
router.route('/transfer').post(vertfyJWT, sendcredit)

//check statement
router.route('/history/:_id').get(vertfyJWT,checkStatement)

//check statement on the basis of categories
router.route('/history').get(vertfyJWT,getCategoryHistory) //not tested yet


export default router




// router.get("/protected", vertfyJWT, (req, res) => {
//         res.status(200).json({
//           message: "This is a protected route",
//           user: req.user
//         });
//       });
    

//to regiter
//login
//profile update
//get transaction history
//downlaod the statement
//get nofifiction regarding the transaction