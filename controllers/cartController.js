

import { Cart } from "../models/cartModel.js";
import { Dish } from "../models/dishModel.js";


export const addToCart = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const userId = req.user.id;
    const { dishId, quantity } = req.body;
    console.log(dishId , quantity)
    
    console.log(userId , "user id s")

    if (!dishId || !quantity) {
      return res.status(400).json({ message: "Food ID and quantity are required" })
    }

    const dish = await Dish.findById(dishId)
    if (!dish) {
      return res.status(404).json({ message: "Food item not found" })
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }
//checking dish in cart or not
    const existingItemIndex = cart.items.findIndex(item => item.foodId.equals(dishId));

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({foodId: dishId, quantity , price:dish.price })
    }
    
    await cart.save();
    await cart.calculateTotalPrice();
    res.status(200).json({ message: "Item added to cart", cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
    console.log(error)
  }
}


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id

    const cart = await Cart.findOne({ userId }).populate("items.foodId", "name price")
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    res.status(200).json({ data: cart , message: "cart fetched successfully" });
  } catch (error) {
    console.log("Error in get cart ",error) //log full error
    res.status(500).json({ message: "internal Server error", error: error.message })
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dishId } = req.body;
    
//find the user's cart
let cartItem = await Cart.findOne({userId});

    
    if (!cartItem) {
      return res.status(400).json({ message: "cart not found" })
    }
    //remove the food item from cart
    cartItem.dish = cart.dish.filter((item)=> !item.dishId.equals(dishId));
    //recaliculate the total price
    cartItem.calculateTotalPrice();
    await cartItem.save();

  
    


    res.status(200).json({ message: "Item removed from cart", cart })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const updateCartItem = async (req, res) => {
  try {
    const {dishId, quantity } = req.body
    const userId = req.userId

    if (!dishId || !quantity) {
      return res.status(400).json({ message: "Food ID and quantity are required" })
    }

    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const item = cart.items.find((item) => item.dishId.toString() === dishId)
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    item.quantity = quantity
    await cart.save()
    res.status(200).json({ message: "Cart updated", cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
};


