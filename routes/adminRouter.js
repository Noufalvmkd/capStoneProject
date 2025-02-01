import express, { Router } from "express";
import { adminSignup ,adminLogin ,adminProfile ,adminprofileUpdate , adminLogout } from "../controllers/adminController.js";
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
router.put('/update',adminAuth,adminprofileUpdate)
//forgot password
//change password
//account deactivated

export {router as adminRouter} 