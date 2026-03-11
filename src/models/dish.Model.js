const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,        // It must be text
    required: true,      // You MUST provide a name
    unique: true         // No two dishes can have the same name
  },
  price: {
    type: Number,        // It must be a number (10.99)
    required: true
  },
  category: {
    type: String,
    // Only these 4 words are allowed:
    enum: ['Starters', 'Main', 'Dessert', 'Drinks'],
    required: true
  },
  isVegetarian: {
    type: Boolean,       // True or False
    default: false       // If you don't say, we assume it's NOT vegetarian
  }
});

module.exports = mongoose.model('Dish', dishSchema);

