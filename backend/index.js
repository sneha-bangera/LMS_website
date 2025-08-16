import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app= express()

const PORT =process.env.PORT || 5000;

//default middleware
app.use(express.json())

// apis
app.use("/api/v1/user", userRoute)
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server listen at port ${PORT}`)
})