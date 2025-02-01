import express from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } from'../controllers/restaurantController.js'
const router=express.Router()

// to display all restaurant
router.get("/restaurantlist",getAllRestaurants)

// display one restaurant
router.get("/restaurant/:id",getRestaurantById)

// add restaurant
router.post("/addrestaurant",createRestaurant)

// update restaurant
router.put("/updaterestaurant",updateRestaurant)


// delete restaurant
router.delete("/deleteRestaurant",deleteRestaurant)

export {router as restaurantRouter}