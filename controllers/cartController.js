

import { Cart } from "../models/cartModel.js";


export const addToCart = async (req, res) => {
  try {
    const { dishId, quantity } = req.body
    const userId = req.userId

    if (!dishId || !quantity) {
      return res.status(400).json({ message: "Food ID and quantity are required" })
    }

    const dish = await Food.findById(dishId)
    if (!dish) {
      return res.status(404).json({ message: "Food item not found" })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }

    const existingItemIndex = cart.items.findIndex((item) => item.dishId.toString() === dishId)

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ dishId, quantity })
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const { dishId } = req.body
    const userId = req.userId 

    
    if (!dishId) {
      return res.status(400).json({ message: "Food ID is required" })
    }

  
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    
    const initialCartLength = cart.items.length
    cart.items = cart.items.filter((item) => item.dishId.toString() !== dishId)

    
    if (cart.items.length === initialCartLength) {
      return res.status(404).json({ message: "Item not found in the cart" })
    }

   
    if (cart.items.length === 0) {
      await Cart.deleteOne({ userId })
      return res.status(200).json({ message: "Cart is now empty", cart: null })
    }

   
    await cart.save()


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


export const getCart = async (req, res) => {
  try {
    const userId = req.userId

    const cart = await Cart.findOne({ userId }).populate("items.dishId")
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    res.status(200).json({ cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
};

