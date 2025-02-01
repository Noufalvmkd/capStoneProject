import express from "express";
import {  addDishItem, updateDishItem, deleteDishItem, getAllOrders, updateOrderStatus } from"../controllers/ownerController.js"

const router=express.Router()


// view owner
router.post("/owneradddish",addDishItem)

// all orders
router.get("/allorders",getAllOrders)

// update owner
router.put("/updatdish",updateDishItem)

// delete owner
router.delete("/deletedish",deleteDishItem)

// uppdate order status
router.put("/orderstatus",updateOrderStatus)
export {router as ownerRouter}