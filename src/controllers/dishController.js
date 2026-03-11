const Dish = require('../models/dish.Model');

// 1. GET (Read All) - Get all dishes with optional filtering
const getDishes = async (req, res) => {
    try {
        const { category, price, name, isVegetarian } = req.query;
        
        // Build filter object
        let filter = {};
        
        if (category) {
            filter.category = category;
        }
        
        if (price) {
            filter.price = { $lte: parseFloat(price) };
        }
        
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        
        if (isVegetarian !== undefined) {
            filter.isVegetarian = isVegetarian === 'true';
        }

        const dishes = await Dish.find(filter);

        if (dishes.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No dishes found matching the criteria',
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Retrieved dishes successfully',
            data: dishes,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// 2. GET (Read One) - Get dish by ID
const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);

        if (!dish) {
            return res.status(404).json({
                status: 404,
                message: `Dish with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Dish retrieved successfully',
            data: dish,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// 3. POST (Create) - Create a new dish
const createDish = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: Request body is missing or invalid content type'
            });
        }
        
        const { name, price, category, isVegetarian } = req.body;

        // Validation: Check if required fields are missing
        if (!name || !price || !category) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: Name, Price, and Category are required',
            });
        }

        // Check if dish with same name already exists
        const existingDish = await Dish.findOne({ name });
        if (existingDish) {
            return res.status(409).json({
                status: 409,
                message: 'Dish with this name already exists',
            });
        }

        const newDish = await Dish.create({
            name,
            price,
            category,
            isVegetarian: isVegetarian || false
        });

        return res.status(201).json({
            status: 201,
            message: 'Dish created successfully',
            data: newDish,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// 4. PUT (Update Full Resource) - Update a dish by ID
const updateDish = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: Request body is missing or invalid content type'
            });
        }

        const { name, price, category, isVegetarian } = req.body;

        // Validation: Check if at least one field is provided
        if (!name && !price && !category && isVegetarian === undefined) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: At least one field is required to update',
            });
        }

        // Build update object
        let updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (category) updateData.category = category;
        if (isVegetarian !== undefined) updateData.isVegetarian = isVegetarian;

        const updatedDish = await Dish.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedDish) {
            return res.status(404).json({
                status: 404,
                message: `Dish with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Dish updated successfully',
            data: updatedDish,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// 5. DELETE (Remove) - Delete a dish by ID
const deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);

        if (!deletedDish) {
            return res.status(404).json({
                status: 404,
                message: `Dish with ID ${req.params.id} not found`,
            });
        }

        return res.status(203).json({
            status: 203,
            message: 'Dish deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// Export all controller functions
module.exports = {
    getDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};

