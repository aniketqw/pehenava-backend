const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true },
  email: {
    type: String,
    required: true,
    unique: true },
  role:{
    type:String,
    enum:['Influencer','Recommender','Explorer'],
    required:true},
  password: {
    type: String,
    required: true }, // Stored hashed automatically via pre-save hook
  createdAt: {
    type: Date,
    default: Date.now },
});

// Pre-save hook to hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);//compile schema into a model

module.exports = User;