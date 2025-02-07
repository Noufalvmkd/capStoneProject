import express from "express";
const router = express.Router();
import { addToCart, getCart, updateCartItem,  removeFromCart,} from '../controllers/cartController.js'; 
import {cartAuth} from '../middlewares/cartAuth.js'
import { userAuth } from "../middlewares/userAuth.js";

//user cart
router.post('/addcart',userAuth,addToCart);

// add item
router.get('/getcartitem',userAuth , getCart);

// update item 
router.put('/cart/:dishId',userAuth, updateCartItem);

//  remove item 
router.delete('/cart/:dishId',userAuth , removeFromCart);



export {router as cartRouter}