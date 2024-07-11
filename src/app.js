import express from "express"
import dotevnv from "dotenv"
import cookieParser from "cookie-parser"

dotevnv.config({
    path:"./.env"
})

const app = express()

app.use(express.urlencoded({
    extended:true
}))

app.use(cookieParser())

app.use(express.json())



//routes
import transactionRoute from "./routes/transaction.routes.js"
import userRoute from "./routes/user.routes.js"

app.use('/api',transactionRoute)
app.use('/api',userRoute)


export { app }