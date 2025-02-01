import express from "express";
const router = express.Router();
import { addToCart, getCart, updateCartItem,  removeFromCart,} from '../controllers/cartController.js'; 

//user cart
router.get('/cart', addToCart);

// add item
router.post('/cart',getCart);

// update item 
router.put('/cart/:dishId',updateCartItem);

//  remove item 
router.delete('/cart/:dishId',removeFromCart);



export {router as cartRouter}