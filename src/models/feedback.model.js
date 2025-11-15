const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to Post model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  like: {
    type: Boolean,
    required: true
    // true = thumbs up (👍)
    // false = thumbs down (👎)
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound unique index: Ensure one user can only give one feedback per post
// This prevents duplicate feedback from same user on same post
feedbackSchema.index({ postId: 1, userId: 1 }, { unique: true });

// Simple indexes for faster queries
feedbackSchema.index({ postId: 1 }); // Get all feedback for a specific post
feedbackSchema.index({ userId: 1 }); // Get all feedback by a specific user

// Update the updatedAt timestamp before saving
feedbackSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
