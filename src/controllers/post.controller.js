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
 */
exports.giveFeedback = async (req, res) => {
  try {
    const { postName, like, description } = req.body;
    const userId = req.user._id; // From auth middleware

    // Find the post by name
    const post = await Post.findOne({ name: postName });
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        postName: postName
      });
    }

    // Check if feedback already exists for this user on this post
    const existingFeedback = await Feedback.findOne({
      postId: post._id,
      userId: userId
    });

    let feedback;
    let message;
    let isUpdate = false;

    if (existingFeedback) {
      // User already gave feedback - update it
      isUpdate = true;
      const oldLike = existingFeedback.like;

      // If changing from thumbs up to thumbs down (or vice versa)
      if (oldLike !== like) {
        // Update the feedback
        existingFeedback.like = like;
        if (description !== undefined) {
          existingFeedback.description = description;
        }
        await existingFeedback.save();

        // Adjust post counts
        if (oldLike === true) {
          // Was thumbs up, now thumbs down
          post.likesCount = Math.max(0, post.likesCount - 1);
          post.dislikesCount += 1;
        } else {
          // Was thumbs down, now thumbs up
          post.dislikesCount = Math.max(0, post.dislikesCount - 1);
          post.likesCount += 1;
        }
        await post.save();

        message = `Feedback updated from ${oldLike ? '👍' : '👎'} to ${like ? '👍' : '👎'}`;
      } else {
        // Same feedback value, just update description if provided
        if (description !== undefined) {
          existingFeedback.description = description;
          await existingFeedback.save();
        }
        message = 'Feedback updated successfully';
      }

      feedback = existingFeedback;
    } else {
      // New feedback - create it
      feedback = new Feedback({
        postId: post._id,
        userId: userId,
        like: like,
        description: description
      });
      await feedback.save();

      // Update post counts
      if (like === true) {
        post.likesCount += 1;
      } else {
        post.dislikesCount += 1;
      }
      await post.save();

      message = `Feedback submitted successfully: ${like ? '👍 Thumbs up' : '👎 Thumbs down'}`;
    }

    // Return response
    res.status(isUpdate ? 200 : 201).json({
      message: message,
      feedback: {
        feedbackId: feedback._id,
        postId: post._id,
        postName: post.name,
        like: feedback.like,
        description: feedback.description,
        createdAt: feedback.createdAt,
        updatedAt: feedback.updatedAt
      },
      postStats: {
        likesCount: post.likesCount,
        dislikesCount: post.dislikesCount
      }
    });
  } catch (error) {
    console.error('Give feedback error:', error);

    // Handle duplicate key error (shouldn't happen with our logic, but just in case)
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Feedback already exists for this post'
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all posts with basic info and counts
 * @route   GET /api/posts
 * @access  Private (requires authentication)
 */
exports.getAllPosts = async (req, res) => {
  try {
    // Find all posts sorted by creation date (newest first)
    const posts = await Post.find()
      .populate('userId', 'Name role') // Populate creator info (exclude email for privacy)
      .sort({ createdAt: -1 }); // Newest first

    // Format response - include counts but NOT feedback details
    const formattedPosts = posts.map(post => ({
      postId: post._id,
      name: post.name,
      description: post.description,
      photo: post.photo,
      creator: {
        userId: post.userId._id,
        Name: post.userId.Name,
        role: post.userId.role
      },
      likesCount: post.likesCount,
      dislikesCount: post.dislikesCount,
      createdAt: post.createdAt
    }));

    res.status(200).json({
      message: 'Posts retrieved successfully',
      count: formattedPosts.length,
      posts: formattedPosts
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Search posts by name
 * @route   GET /api/posts/search
 * @access  Private (requires authentication)
 */
exports.searchPosts = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate name parameter
    if (!name || name.trim() === '') {
      return res.status(400).json({
        message: 'Search parameter "name" is required'
      });
    }

    // Search posts by name (case-insensitive partial match)
    const posts = await Post.find({
      name: { $regex: name.trim(), $options: 'i' } // Case-insensitive regex search
    }).select('_id name'); // Only select postId and name

    // Format results
    const results = posts.map(post => ({
      postId: post._id,
      name: post.name
    }));

    res.status(200).json({
      message: 'Search completed',
      count: results.length,
      results: results
    });
  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    View post with all feedback and recommendations
 * @route   GET /api/posts/view/:postId
 * @access  Private (requires authentication)
 */
exports.viewPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const mongoose = require('mongoose');

    // Validate postId format
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: 'Invalid post ID format'
      });
    }

    // Find post by ID and populate creator info
    const post = await Post.findById(postId)
      .populate('userId', 'Name role');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        postId: postId
      });
    }

    // Find all feedback for this post
    const feedbacks = await Feedback.find({ postId: post._id })
      .populate('userId', 'Name')
      .sort({ createdAt: -1 }); // Newest first

    // Format feedback array
    const formattedFeedbacks = feedbacks.map(feedback => ({
      feedbackId: feedback._id,
      userId: feedback.userId._id,
      userName: feedback.userId.Name,
      like: feedback.like,
      description: feedback.description,
      createdAt: feedback.createdAt
    }));

    // Build complete response
    res.status(200).json({
      postId: post._id,
      postName: post.name,
      description: post.description,
      photo: post.photo,
      creator: {
        userId: post.userId._id,
        Name: post.userId.Name,
        role: post.userId.role
      },
      feedbacks: formattedFeedbacks,
      likesCount: post.likesCount,
      dislikesCount: post.dislikesCount,
      recommendations: [] // Empty array for future implementation
    });
  } catch (error) {
    console.error('View post error:', error);
    res.status(500).json({ message: error.message });
  }
};
