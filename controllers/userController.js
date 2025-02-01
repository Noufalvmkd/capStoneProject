
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { gentoken } from "../utils/token.js";



export const userSignup = async (req,res,next)=>{
    try {
        console.log("hitted")
        const {name, email, password, mobile} = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({message:"all field required"})
        }
        const isUserExist = await User.findOne({email})

        if(isUserExist){
            return res.status(400).json({message:"user exist"})
        }
        const saltRounds =10;

        const hashedpswrd = bcrypt.hashSync(password, saltRounds);

        const userData = new User({name,email,password:hashedpswrd ,mobile})
        await userData.save();
console.log("hi")
        const token = gentoken(userData._id)
        console.log(token ,"token new")
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
          });
          const userWithoutPassword =await User.findById(userData._id).select('-password');
        return res.json({data:userWithoutPassword,message:"user account created"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

//user login

export const userLogin = async (req,res,next)=>{
    try {
        console.log("hitted")
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(400).json({message:"all field required"})
        }
        const UserExist = await User.findOne({email})

        if(!UserExist){
            return res.status(400).json({message:"user does not exist"})
        }
    const passwordMatch = bcrypt.compareSync(password, UserExist.password)

        // const hashedpswrd = bcrypt.hashSync(password, UserExist.password);

        if(!passwordMatch){
            return res.status(401).json({message: "user not authenticated"})
        }

        const token = gentoken(UserExist._id)
        res.cookie("token",token);

        const userprofWithoutPswrd =await User.findById(UserExist._id).select('-password');
        return res.json({data:userprofWithoutPswrd,message:"user login success"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

//fetching profile data

export const userProfile = async (req,res,next)=>{
    try {
        const userId =req.user.id;

        const userData = await User.findById(userId).select('-password');
        return res.json({data:userData , message:"user profile fetched"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

export const profileUpdate = async (req,res,next)=>{
    try {
        const userId =req.user.id;
        const { name, email, mobile, profilePic, password } = req.body;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;
        if (profilePic) user.profilePic = profilePic;

        // If user wants to update password
        if (password) {
            const saltRounds = 10;
            user.password = bcrypt.hashSync(password, saltRounds);
        }

        // Save updated user data
        await user.save();

        // Exclude password from response
        const updatedUser = user.toObject();
        delete updatedUser.password;

        return res.json({ data: updatedUser, message: "User profile updated successfully" });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }

        }



//loggin out

export const userLogout = async (req,res,next)=>{
    try {
        res.clearCookie('token')

        
        return res.json({message:"user loged out"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}