const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Pehenava Backend is Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
