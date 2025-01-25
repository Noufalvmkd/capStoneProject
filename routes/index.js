import express from "express";
const router = express.Router();
import { userRouter } from "./userRoutes.js";



router.use('/user',userRouter);

//other routes



export {router as apiRouter}