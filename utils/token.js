import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const gentoken= (id ,role)=>{
    try {
        var token = jwt.sign({id:id ,role:role || "user"},process.env.JWT_SECRET-KEY);
        return token;
    } catch (error) {
        console.log(error);
    }

}