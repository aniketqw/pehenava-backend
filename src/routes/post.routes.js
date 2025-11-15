const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

/**
 * @route   POST /api/posts
 * @desc    Create a new post with optional photo
 * @access  Private (requires authentication)
 */
router.post(
  '/',
  protect, // Verify JWT token first
  upload.single('photo'), // Handle photo upload (field name: 'photo')
  postController.createPost
);

/**
 * @route   POST /api/posts/feedback
 * @desc    Give feedback (thumbs up/down) on a post
 * @access  Private (requires authentication)
 * @status  PLACEHOLDER - Returns 501 Not Implemented
 */
router.post(
  '/feedback',
  protect,
  postController.giveFeedback
);

/**
 * @route   GET /api/posts/view
 * @desc    View post with all feedback and recommendations
 * @access  Private (requires authentication)
 * @status  PLACEHOLDER - Returns 501 Not Implemented
 */
router.get(
  '/view',
  protect,
  postController.viewPost
);

module.exports = router;
