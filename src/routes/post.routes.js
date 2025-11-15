const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateFeedback } = require('../middleware/validation.middleware');
const upload = require('../middleware/upload.middleware');

// ==================== POST ROUTES ====================

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
 */
router.post(
  '/feedback',
  protect,
  validateFeedback,
  postController.giveFeedback
);

// ==================== GET ROUTES ====================
// Note: Order matters! Specific routes (/search) must come before parameterized routes (/:postId)

/**
 * @route   GET /api/posts/search
 * @desc    Search posts by name
 * @access  Private (requires authentication)
 */
router.get(
  '/search',
  protect,
  postController.searchPosts
);

/**
 * @route   GET /api/posts/view/:postId
 * @desc    View specific post with all feedback and recommendations
 * @access  Private (requires authentication)
 */
router.get(
  '/view/:postId',
  protect,
  postController.viewPost
);

/**
 * @route   GET /api/posts
 * @desc    Get all posts with basic info and counts
 * @access  Private (requires authentication)
 */
router.get(
  '/',
  protect,
  postController.getAllPosts
);

module.exports = router;
