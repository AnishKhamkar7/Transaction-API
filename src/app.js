import express from "express"
import dotevnv from "dotenv"

dotevnv.config({
    path:"./.env"
})

const app = express()

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())



//routes
import transactionRoute from "./routes/transaction.routes.js"
import userRoute from "./routes/user.routes.js"

app.use('/api',transactionRoute)
app.use('/api',userRoute)


export { app }