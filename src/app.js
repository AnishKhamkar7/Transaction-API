import express from "express"
import dotevnv from "dotenv"

dotevnv.config({
    path:"./.env"
})

const app = express()



export { app }