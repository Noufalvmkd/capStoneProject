

import express from "express";
import { userSignup } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";
import { userLogin } from "../controllers/userController.js";
import { userProfile } from "../controllers/userController.js";

const router =express.Router();


//signup
router.post('/signup',userSignup)
//login
router.put('/login', userLogin) // bcz new datas not adding (so can be used put)
//profile
router.get('/profile',userAuth,userProfile)
//Logout
//profileUpdate
//forgot password
//change password
//account deactivated

export {router as userRouter} // reason for userRouter = can be more router , so for clarity