import express from "express";
import authRoutes from "./routes/authRoutes.js"

const app = express()
app.use(express.json())
app.get("/" ,(req,res)=>{
    res.json("taskflow")
})
app.use("/auth" , authRoutes)

export default app