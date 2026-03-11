const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
} = require('../controllers/dishController');

// 0. GET (Base route) - Welcome message
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Vitto API!' });
});

// 1. GET (Read All) - Get all dishes with optional filtering
router.get('/dishes', getDishes);

// 2. GET (Read One) - Get dish by ID
router.get('/dishes/:id', getDishById);

// 3. POST (Create) - Create a new dish
router.post('/dishes', createDish);

// 4. PUT (Update Full Resource) - Update a dish by ID
router.put('/dishes/:id', updateDish);

// 5. DELETE (Remove) - Delete a dish by ID
router.delete('/dishes/:id', deleteDish);

// Export the router
module.exports = router;

