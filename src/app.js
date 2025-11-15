const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // Log HTTP requests

// Body Parser Middleware
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api', userRoutes); // User routes

// Default route
app.get('/', (req, res) => {
  res.send('Pehenava Backend is Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
