const mongoose = require('mongoose');
require('dotenv').config();//  load env variable from .env

const connectDB = async function() {
try {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,// Uses MongoDB's new URL parser instead of the deprecated one
        useUnifiedTopology:true,// Uses new Server Discovery and Monitoring engine for better connection handling
    });

     console.log('MongoDB connected');

}
catch(err)
{
    console.error('MongoDB connection error:', err.message);
    process.exit(1);

}
};

module.exports = connectDB;