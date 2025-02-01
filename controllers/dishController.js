import { Dish } from "../models/dishModel.js";


export const createDish = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" })
    }

    const newDish = new Dish({
      name,
      description,
      price,
      category,
      imageUrl,
    })

    await newDish.save()

    res.status(201).json({ message: "Dish created successfully", dish: newDish })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const getAllDishes = async (req, res) => {
  try {
    const { category } = req.query

    let dishes
    if (category) {
      dishes = await Dish.find({ category }).populate('category')
    } else {
      dishes = await Dish.find().populate('category')
    }

    if (dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" })
    }

    res.status(200).json({ dishes })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const getDishById = async (req, res) => {
  try {
    const { id } = req.params

    const dish = await Dish.findById(id).populate("category")

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" })
    }

    res.status(200).json({ dish })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const updateDish = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, category, imageUrl } = req.body

    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl },
      { new: true } 
    )

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" })
    }

    res.status(200).json({ message: "Dish updated successfully", dish: updatedDish })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params

    const deletedDish = await Dish.findByIdAndDelete(id)

    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found" })
    }

    res.status(200).json({ message: "Dish deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


