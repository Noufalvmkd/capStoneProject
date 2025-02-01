import express from "express";
import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../controllers/dishController.js'
const router=express.Router()

// display all dishes
router.get("/alldishes",getAllDishes)
// display one dish
router.get("/dish/:id",getDishById)

// add dish
router.post("/adddish",createDish)
// update dish
router.put("/updateDish",updateDish)

// delete dish
router.delete("/deletedish",deleteDish)

export {router as dishRouter}