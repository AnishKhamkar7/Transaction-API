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


export { app }