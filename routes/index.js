import express from "express";

import { userRouter  } from "./userRoutes.js";
import { adminRouter } from "./adminRouter.js";
import { ownerRouter } from "./ownerRouter.js";
import { cartRouter } from "./cartRouter.js";
import { restaurantRouter } from "./restaurantRouter.js";
import { dishRouter } from "./dishRouter.js";
import { reviewRouter } from "./reviewRouter.js";
import { orderRouter } from "./ordersRouter.js";

const router = express.Router();



router.use('/user',userRouter);
router.use('/admin', adminRouter);
router.use('/owner', ownerRouter);
router.use('/cart', cartRouter);
router.use('/restaurant', restaurantRouter);
router.use('/dish', dishRouter);
router.use('/review', reviewRouter);
router.use('/orders', orderRouter);

//other routes



export {router as apiRouter}