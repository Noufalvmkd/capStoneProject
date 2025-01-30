import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema(
    {
        name: String,
        email:{
            type:String,
            unique: true,
            required: true
        },
        password:{
            type:String,
            required: true,
            minLength:8
        },
        profilePic:{
            type:String,
            default:""
        },
        mobile:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        }
    }
)
export const Admin = mongoose.model("Admin",adminSchema);