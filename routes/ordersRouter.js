import express from "express";
import { placeOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } from '../controllers/orderController.js'
const router=express.Router()

// display all orders
router.get("/orders",getOrders)

// add an order
router.post("/orderadd",placeOrder)

// get orders by id
router.get("/orders/:id",getOrderById)


// updating order
router.put("/updateorder",updateOrderStatus)

// cancell the order
router.delete("/ordercancell",deleteOrder)


export {router as orderRouter}