import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            dbName:"TaskFlow"
        })
        console.log("connected")
    }catch(err){
        console.error("error: " , err.message)
    }
}

export default connectDB