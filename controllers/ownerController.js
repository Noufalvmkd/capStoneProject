
import { Owner } from "../models/ownerModels.js";



export const addDishItem = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({ message: "minimum reqruire - name ,price, catogory" })
    }

    const dishItem = new Food({ name, description, price, category, imageUrl });

    await dishItem.save();
    res.status(201).json({ message: "Food item added successfully", data: dishItem })
  } catch (error) {
    res.status(500).json({ message: "internal Server error", error })
  }
}


export const updateDishItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, price, category, imageUrl } = req.body

    const dishItem = await dish.findById(id)

    if (!dishItem) {
      return res.status(404).json({ message: "Food item not found" })
    }

   
    if (name) dishItem.name = name
    if (description) dishItem.description = description
    if (price) dishItem.price = price
    if (category) dishItem.category = category
    if (imageUrl) dishItem.imageUrl = imageUrl

    await dishItem.save()
    res.status(200).json({ message: "Food item updated successfully", data: dishItem })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const deleteDishItem = async (req, res, next) => {
  try {
    const { id } = req.params

    const dishItem = await dish.findById(id)

    if (!dishItem) {
      return res.status(404).json({ message: "Food item not found" })
    }

    await dishItem.remove()
    res.status(200).json({ message: "Food item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("items.dishId", "name price")

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" })
    }

    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body 

    if (!status || !["preparing", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" })
    }

    const order = await order.findById(id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.status = status
    await order.save()

    res.status(200).json({ message: "Order status updated successfully", order })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
};


