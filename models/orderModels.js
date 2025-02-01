import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema =  new Schema(
    {paymentMethod:String,
    deliverAddress: String
    }
)


export const Order = mongoose.model("Order",orderSchema)