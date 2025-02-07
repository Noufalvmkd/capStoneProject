import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; 

import dotenv from 'dotenv';
dotenv.config();

export const cartAuth = async (req, res, next) => {
  let token;

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];

      // Verify token using  JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Retrieve the user by id and attach to the request object (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If token is not provided, respond with 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
