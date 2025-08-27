import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cludinary.js";

export const register = async(req, res)=> {
    try {
        const { name, email, password, role } = req.body;
        if(!name || !email || !password || !role) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }
        const user= await User.findOne({ email });
        if(user) {
            return res.status(400).json({success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(201).json({success: true, message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}

export const login = async(req, res)=> {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({success: false, message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials" });
        }

        //generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.cookie('token', token, {httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000}).json({
            message: `Login successful ${user.name}`,
            success: true,
            user
        })

        // return res.status(200).json({success: true, message: "Login successful", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}

export const logout = async(_, res)=> {
    try {
        // res.clearCookie('token');
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            success: true, 
            message: "Logout successful" 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}

export const updateProfile= async(req, res) => {
    try {
        const userId= req._id
        const {name, description} = req.body
        const file= req.file

        const fileUri = getDataUri(file)
        let cloudResponse = await cloudinary.uploader.upload(fileUri)
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success: false
            })
        }

        //updating data
        if(name) user.name= name
        if(description) user.description = description
        if(file) user.photoUrl = cloudResponse.secure_url

        await user.save()
        return res.status(200).json({
            message:"profile updated successfully",
            success: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error" });
    }
}