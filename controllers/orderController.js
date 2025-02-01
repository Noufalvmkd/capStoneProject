
import { Order } from "../models/orderModels.js";
import { Cart } from "../models/cartModel.js";
import { User } from "../models/userModel.js";


export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId
    const { paymentMethod, deliveryAddress } = req.body

    if (!paymentMethod || !deliveryAddress) {
      return res.status(400).json({ message: "Payment method and delivery address are required" })
    }

  
    const cart = await Cart.findOne({ userId })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" })
    }

    
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      paymentMethod,
      deliveryAddress,
      status: "Pending", 
    });


    await newOrder.save();

    
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId 

    const orders = await Order.find({ userId }).populate('items.dishId');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate('items.dishId')

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.status(200).json({ order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body


    const validStatuses = ["Pending", "In Progress", "Completed", "Cancelled"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.status = status
    await order.save()

    res.status(200).json({ message: "Order status updated", order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    await order.remove()

    res.status(200).json({ message: "Order deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
};

