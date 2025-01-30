import express from "express";
import { adminSignup ,adminLogin ,adminProfile , adminLogout } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";


const router =express.Router();


//signup
router.post('/signup',adminSignup)
//login
router.put('/login', adminLogin) // bcz new datas not adding (so can be used put)
//profile
router.get('/profile',adminAuth,adminProfile)
//Logout
router.put('/logout',adminAuth,adminLogout)
//profileUpdate
//forgot password
//change password
//account deactivated

export {router as adminRouter} 