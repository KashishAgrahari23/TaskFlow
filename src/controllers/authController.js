import bcrypt from "bcrypt"

import User from "../models/user.js"

const registerUser = async (req , res) =>{
    try {
        const {name , email , password } = req.body
        if (!name || !email || !password){
            return res.status(400).json({ message:"All fields are required"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message:"User already exist"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password , salt)
        const newUser = await User.create({
            name ,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            message:"registered",
            user:{
                id: newUser.id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        })
    } catch (error) {
        res.status(500).json({message:"failed" , error:error.message})
    }
}

export default registerUser