import { Router } from "express";
import { vertfyJWT } from "../middlewares/auth.middleware.js";
import { sendcredit,checkStatement } from "../controllers/transaction.controller.js";
const router = Router()

// transfer credit and save the record of the trasaction
router.route('/transfer').post(vertfyJWT, sendcredit)

//check statement
router.route('/history/:_id').get(vertfyJWT,checkStatement)




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