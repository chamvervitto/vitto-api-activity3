// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import Database Connection
const connectDB = require('./src/config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Config
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Import Routes
const apiRoutes = require('./src/routes/apiRoutes');

// Tell the app to use them
// All URLs will start with /api/v1 (from your .env file)
app.use(process.env.BASE_URI, apiRoutes);

// Connect to Database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);  
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
