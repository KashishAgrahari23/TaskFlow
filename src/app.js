import express from "express";


const app = express()

app.get("/test" , (req,res)=>{
    res.json("tested")
})

export default app