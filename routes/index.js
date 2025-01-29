import express from "express";

import { userRouter  } from "./userRoutes.js";
import { sellerRouter } from "./sellerRouter.js";

const router = express.Router();



router.use('/user',userRouter);
router.use('/seller', sellerRouter);

//other routes



export {router as apiRouter}