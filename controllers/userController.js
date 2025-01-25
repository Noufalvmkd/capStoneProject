import { User } from "../models/userModels";

export const userSignup = async (req,res,next)=>{
    try {
        const {name,email,password ,mobile} =req.body;
        if(!name || !email || !password ){
            return res.status(400).json({message:"all field required"})
        }
        const isUserExist = await user.findOne({email})

        if(isUserExist){
            return res.status(400).json({message:"user exist"})
        }

        const userData = new user({name,email,password ,mobile})
        await userData.save();
        return res.json({data:userData,message:"user account created"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}