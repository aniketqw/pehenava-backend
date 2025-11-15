const Post = require('../models/post.model');
const Feedback = require('../models/feedback.model');

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private (requires authentication)
 */
exports.createPost = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({
        message: 'Name and description are required'
      });
    }

    // Check if post with same name already exists
    const existingPost = await Post.findOne({ name });
    if (existingPost) {
      return res.status(409).json({
        message: 'Post with this name already exists'
      });
    }

    // Get photo path if uploaded
    const photoPath = req.file ? req.file.path : null;

    // Create new post
    const post = new Post({
      name,
      description,
      photo: photoPath,
      userId: req.user._id // From auth middleware
    });

    await post.save();

    // Populate user information
    await post.populate('userId', 'Name email role');

    // Return success response
    res.status(201).json({
      message: 'Post created successfully',
      post: {
        postId: post._id,
        name: post.name,
        description: post.description,
        photo: post.photo,
        creator: {
          userId: post.userId._id,
          Name: post.userId.Name,
          email: post.userId.email,
          role: post.userId.role
        },
        likesCount: post.likesCount,
        dislikesCount: post.dislikesCount,
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Give feedback on a post (thumbs up/down)
 * @route   POST /api/posts/feedback
 * @access  Private (requires authentication)
 * @status  PLACEHOLDER - To be implemented
 */
exports.giveFeedback = async (req, res) => {
  try {
    // TODO: Implement feedback functionality
    // Expected request body: { postName, description, like: true/false }
    // Expected response: { feedbackId, postId, postName, message }

    res.status(501).json({
      message: 'Feedback feature coming soon',
      note: 'This endpoint will allow users to give thumbs up/down on posts',
      expectedRequest: {
        postName: 'string',
        description: 'string',
        like: 'boolean (true=👍, false=👎)'
      },
      expectedResponse: {
        feedbackId: 'string',
        postId: 'string',
        postName: 'string',
        message: 'string'
      }
    });
  } catch (error) {
    console.error('Give feedback error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    View post with all feedback and recommendations
 * @route   GET /api/posts/view
 * @access  Private (requires authentication)
 * @status  PLACEHOLDER - To be implemented
 */
exports.viewPost = async (req, res) => {
  try {
    // TODO: Implement view post with feedback functionality
    // Expected request body: { postName }
    // Expected response: { postId, postName, feedbacks[], recommendations[] }

    res.status(501).json({
      message: 'View post feature coming soon',
      note: 'This endpoint will show post details with all feedback and recommendations',
      expectedRequest: {
        postName: 'string'
      },
      expectedResponse: {
        postId: 'string',
        postName: 'string',
        description: 'string',
        photo: 'string',
        creator: 'object',
        feedbacks: [
          {
            feedbackId: 'string',
            userId: 'string',
            userName: 'string',
            like: 'boolean',
            createdAt: 'date'
          }
        ],
        likesCount: 'number',
        dislikesCount: 'number',
        recommendations: 'array (to be defined)'
      }
    });
  } catch (error) {
    console.error('View post error:', error);
    res.status(500).json({ message: error.message });
  }
};
