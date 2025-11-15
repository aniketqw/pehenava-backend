const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate Access Token (short-lived)
 * @param {String} userId - User's MongoDB _id
 * @returns {String} JWT access token
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1h' }
  );
};

/**
 * Generate Refresh Token (long-lived)
 * @param {String} userId - User's MongoDB _id
 * @returns {String} JWT refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};

/**
 * Generate both tokens at once
 * @param {String} userId - User's MongoDB _id
 * @returns {Object} { accessToken, refreshToken }
 */
const generateTokens = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId)
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
