import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const dbConnect = async() =>{
    try {
        const connectdb = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MONGO CONNECTED !!!!!!!")

    } catch (error) {
        console.error("ERROR HERE",error)
        process.exit(1)
    }
}

export { dbConnect }