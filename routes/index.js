import express from "express";

import { userRouter } from "./userRoutes.js";

const router = express.Router();



router.use('/user',userRouter);

//other routes



export {router as apiRouter}