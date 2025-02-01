import {Review} from"../models/reviewModel.js"
import { User } from "../models/userModel.js";


export const addReview = async (req, res) => {
  try {
    const { dishId, rating, comment } = req.body
    const userId = req.userId;

  
    if (!dishId || !rating || !comment) {
      return res.status(400).json({ message: "Food ID, rating, and comment are required." })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." })
    }

    
    const dish = await dish.findById(dishId)
    if (!dish) {
      return res.status(404).json({ message: "Food item not found" })
    }

    
    const existingReview = await Review.findOne({ dishId, userId })
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this food item." })
    }

 
    const review = new Review({
      dishId,
      userId,
      rating,
      comment,
    })

    await review.save()

    
    await updateDishRating(dishId)

    return res.status(201).json({ message: "Review added successfully", review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


 export const getDishReviews = async (req, res) => {
  try {
    const {dishId} = req.params;

    
    if (!dishId) {
      return res.status(400).json({ message: "Food ID is required." });
    }

 
    const reviews = await Review.find({ dish}).populate("userId", "name profilePic")

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this food item." })
    }

    return res.status(200).json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const getUserReviews = async (req, res) => {
  try {
    const userId = req.userId;  


    const reviews = await Review.find({ userId }).populate("dishId", "name price category")

    if (reviews.length === 0) {
      return res.status(404).json({ message: "You haven't reviewed any food items." })
    }

    return res.status(200).json({ reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
};


export const updateReview = async (req, res) => {
  try {
    const { dishId, rating, comment } = req.body
    const userId = req.userId


    if (!dishId || !rating || !comment) {
      return res.status(400).json({ message: "Food ID, rating, and comment are required." })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." })
    }


    const review = await Review.findOne({ dishId, userId })
    if (!review) {
      return res.status(404).json({ message: "Review not found." })
    }

   
    review.rating = rating
    review.comment = comment

    await review.save()

   
    await updateDishRating(dishId)

    return res.status(200).json({ message: "Review updated successfully", review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const deleteReview = async (req, res) => {
  try {
    const { dishId } = req.params
    const userId = req.userId  

  
    const review = await Review.findOne({ dishId, userId })
    if (!review) {
      return res.status(404).json({ message: "Review not found." })
    }

    
    await review.remove()

    
    await updateDishRating(dishId)

    return res.status(200).json({ message: "Review deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const updateDishRating = async (dishId) => {
  const reviews = await Review.find({ dishId })

  if (reviews.length === 0) {
    return
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length

  await dish.findByIdAndUpdate(dishId, { rating: averageRating });
};

