import mongoose from "mongoose";
import { Schema } from "mongoose";


const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,  
      trim: true,   
    },
    description: {
      type: String,
      required: true,
      trim: true,  
    },
    price: {
      type: Number,
      required: true,
      min: 0,  
    },
    category: {
      type: String,
      required: true,
      enum: ["starter", "main course", "dessert", "beverage"], // Restrict category to predefined options
    },
    imageUrl: {
      type: String,
      default: "",  
    },
    availability: {
      type: Boolean,
      default: true,   
    },
    ingredients: {
      type: [String],  
      required: true,
    },
    ratings: {
      type: [Number],  
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }  
);




export const Dish = mongoose.model("Dish", dishSchema);


