import { app } from "./app.js";
import { dbConnect } from "./db/db.js";



dbConnect()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT}`)
    }),
    app.on('error', (error) => {
        console.log("ERROR",error)
        throw error
    }
)
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)
})
   
