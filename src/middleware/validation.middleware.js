const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user registration
 */
const validateRegister = [
  body('Name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['Influencer', 'Recommender', 'Explorer'])
    .withMessage('Role must be one of: Influencer, Recommender, Explorer'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

/**
 * Validation rules for user login
 */
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

/**
 * Validation rules for post feedback
 */
const validateFeedback = [
  body('postName')
    .trim()
    .notEmpty()
    .withMessage('Post name is required')
    .isLength({ min: 1 })
    .withMessage('Post name cannot be empty'),

  body('like')
    .notEmpty()
    .withMessage('Like field is required')
    .isBoolean()
    .withMessage('Like must be a boolean value (true or false)'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = {
  validateRegister,
  validateLogin,
  validateFeedback
};
