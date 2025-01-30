import express from "express";

import { userRouter  } from "./userRoutes.js";
import { adminRouter } from "./adminRouter.js";

const router = express.Router();



router.use('/user',userRouter);
router.use('/admin', adminRouter);

//other routes



export {router as apiRouter}