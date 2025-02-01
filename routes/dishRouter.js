import express from "express";
import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../controllers/dishController.js'
const router=express.Router()


// add dish
router.post("/adddish",createDish)
// display all dishes
router.get("/alldishes",getAllDishes)
// display one dish
router.get("/dish/:id",getDishById)


// update dish
router.put("/updateDish",updateDish)

// delete dish
router.delete("/deletedish",deleteDish)

export {router as dishRouter}