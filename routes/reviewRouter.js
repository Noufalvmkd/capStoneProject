import express from "express";
import { addReview,  getUserReviews, updateReview, deleteReview } from "../controllers/reviewController.js"
const router=express.Router()



// view one review
router.get("/reviews/:id",getUserReviews)

// add review
router.post("/addreview/:id",addReview)

// update review
router.put("/updatereview/:id",updateReview)

// delete review
router.delete("/deletereview/:id",deleteReview)


export {router as reviewRouter}