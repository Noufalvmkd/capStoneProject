import mongoose from "mongoose";
import { Schema } from "mongoose";


const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    items: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: "Dish", 
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
    const foodItem = await mongoose.model("Dish").findById(item.foodId);
    total += foodItem.price * item.quantity;  
  }
  this.totalPrice = total;
  await this.save();
};

// cartSchema.method.calculateTotalPrice = function(){
//   this.totalPrice = this.courses.reduce((total,courses)=>total+ course.price, 0)
// }
export const Cart = mongoose.model("Cart", cartSchema);



