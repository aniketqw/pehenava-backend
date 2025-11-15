const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware - MUST come before other middleware
// Handles all CORS requests including preflight OPTIONS requests automatically
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false, // Set to false when using origin: '*'
  optionsSuccessStatus: 200
}));

// Security Middleware - Configure helmet to not interfere with CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));


// Body Parser Middleware
app.use(express.json());

// Routes
// Note: Static file serving removed - now using Cloudinary for image storage
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api', userRoutes); // User routes

// Default route
app.get('/', (req, res) => {
  res.send('Pehenava Backend is Running');
});
const PORT = process.env.PORT || 3000;
// Only start server locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
module.exports = app;