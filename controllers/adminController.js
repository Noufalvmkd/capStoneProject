
import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { gentoken } from "../utils/token.js";



export const adminSignup = async (req,res,next)=>{
    try {
        console.log("hitted")
        const {name, email, password, mobile} = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({message:"all field required"})
        }
        const isAdminExist = await Admin.findOne({email})

        if(isAdminExist){
            return res.status(400).json({message:"Admin exist"})
        }
        const saltRounds =10;

        const hashedpswrd = bcrypt.hashSync(password, saltRounds);

        const AdminData = new Admin({name,email,password:hashedpswrd ,mobile})
        await AdminData.save();
console.log(AdminData)
        const token = gentoken(AdminData._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
          });

          const AdminId =AdminData._id;

        const AdminDataId = await Admin.findById(AdminId).select('-password');
        return res.json({data:AdminDataId,message:"Admin account created"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

//Admin login

export const adminLogin = async (req,res,next)=>{
    try {
        console.log("hitted")
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(400).json({message:"all field required"})
        }
        const AdminExist = await Admin.findOne({email})

        if(!AdminExist){
            return res.status(400).json({message:"Admin does not exist"})
        }
    const passwordMatch = bcrypt.compareSync(password, AdminExist.password)

        // const hashedpswrd = bcrypt.hashSync(password, AdminExist.password);

        if(!passwordMatch){
            return res.status(401).json({message: "Admin not authenticated"})
        }

        const token = gentoken(AdminExist._id)
        res.cookie("token",token);
        
        const adminDataWithoup = await Admin.findById(AdminExist._id).select('-password')
        return res.json({data:adminDataWithoup,message:"Admin login success"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

//fetching profile data

export const adminProfile = async (req,res,next)=>{
    console.log(req.body)
    try {
        const AdminId =req.admin.id;

        const AdminData = await Admin.findById(AdminId).select('-password');
        return res.json({data:AdminData , message:"Admin profile fetched"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}
// profile update
export const adminprofileUpdate = async (req,res,next)=>{
    try {
        const adminId =req.admin.id;
        const { name, email, mobile, profilePic, password } = req.body;
        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (name) admin.name = name;
        if (email) admin.email = email;
        if (mobile) admin.mobile = mobile;
        if (profilePic) admin.profilePic = profilePic;

        // If admin wants to update password
        if (password) {
            const saltRounds = 10;
            admin.password = bcrypt.hashSync(password, saltRounds);
        }

        // Save updated admin data
        await admin.save();

        // Exclude password from response
        const updatedadmin = admin.toObject();
        delete updatedadmin.password;

        return res.json({ data: updatedadmin, message: "admin profile updated successfully" });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }

        }



//loggin out

export const adminLogout = async (req,res,next)=>{
    try {
        res.clearCookie('token')

        
        return res.json({message:"Admin loged out"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}