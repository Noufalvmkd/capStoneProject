import jwt from "jsonwebtoken";

export const gentoken= ()=>{
    try {
        var token = jwt.sign({id:id ,role:roel || "user"},process.env.JWT_SECRET-KEY);
        return token;
    } catch (error) {
        console.log(error);
    }

}