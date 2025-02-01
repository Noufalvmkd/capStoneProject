import mongoose from "mongoose";
import { Schema } from "mongoose";


const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantLocation: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantDescription: {
      type: String,
      default: "",
    },
    restaurantImage: {
      type: String,  
    },
    isActive: {
      type: Boolean,
      default: true,  
    },
    menu: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",  
        },
        price: {
          type: Number,
          required: true,
        },
        available: {
          type: Boolean,
          default: true, 
        },
      },
    ],
  },
  { timestamps: true }
);





export const Owner = mongoose.model("Owner", ownerSchema);


