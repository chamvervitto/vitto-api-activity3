const Chef = require('../models/chefModel');

// POST (Create) - Create a new chef
const createChef = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: Request body is missing'
            });
        }
        
        const { name, specialty } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request: Name is required',
            });
        }

        const newChef = await Chef.create({
            name,
            specialty
        });

        return res.status(201).json({
            status: 201,
            message: 'Chef created successfully',
            data: newChef,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
            error: error.message,
        });
    }
};

module.exports = {
    createChef
};
