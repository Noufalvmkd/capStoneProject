import mongoose from "mongoose";
import { Schema } from "mongoose";


const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food", 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,  
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);


cartSchema.methods.calculateTotalPrice = async function () {
  let total = 0;
  for (let item of this.items) {
    const foodItem = await mongoose.model("Food").findById(item.foodId);
    total += foodItem.price * item.quantity;  
  }
  this.totalPrice = total;
  await this.save();
};

export const Cart = mongoose.model("Cart", cartSchema);



