import {Restaurant}  from"../models/restaurantModel.js"


export const createRestaurant = async (req, res) => {
  try {
    const { name, address, phoneNumber, imageUrl, userId } = req.body

  
    if (!name || !address || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newRestaurant = new Restaurant({
      name,
      address,
      phoneNumber,
      imageUrl,
      userId,  
    })

    
    await newRestaurant.save()
    
    return res.status(201).json({ message: "Restaurant created successfully", newRestaurant })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
    res.status(200).json({ restaurants })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params
    
    const restaurant = await Restaurant.findById(id)
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }
    
    res.status(200).json({ restaurant })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params
    const { name, address,  phoneNumber, imageUrl } = req.body

   
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, address,  phoneNumber, imageUrl },
      { new: true }
    )
    
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.status(200).json({ message: "Restaurant updated successfully", updatedRestaurant })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params

    const deletedRestaurant = await Restaurant.findByIdAndDelete(id)
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.status(200).json({ message: "Restaurant deleted successfully", deletedRestaurant })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}





