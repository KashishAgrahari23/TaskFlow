import express from "express";


const app = express()
app.use(express.json())
app.get("/" ,(req,res)=>{
    res.json("taskflow")
})
app.get("/test" , (req,res)=>{
    res.json("tested")
})

export default app