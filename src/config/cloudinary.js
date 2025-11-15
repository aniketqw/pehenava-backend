const { v2: cloudinary } = require('cloudinary');

/**
 * Cloudinary Configuration
 * Connects to Cloudinary using credentials from environment variables
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Use HTTPS URLs
});

/**
 * Helper function to extract public_id from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - public_id or null if invalid
 */
const extractPublicId = (url) => {
  try {
    if (!url || typeof url !== 'string') return null;

    // Example URL: https://res.cloudinary.com/dhfdccotv/image/upload/v1234567890/pehenava/posts/abc123.jpg
    // We need to extract: pehenava/posts/abc123

    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    const pathParts = parts[1].split('/');
    // Remove version (v1234567890) if present
    const startIndex = pathParts[0].startsWith('v') ? 1 : 0;

    // Join remaining parts and remove file extension
    const publicIdWithExtension = pathParts.slice(startIndex).join('/');
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ''); // Remove extension

    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} url - Cloudinary URL to delete
 * @returns {Promise<Object>} - Deletion result
 */
const deleteImage = async (url) => {
  try {
    const publicId = extractPublicId(url);

    if (!publicId) {
      console.warn('Could not extract public_id from URL:', url);
      return { result: 'not found' };
    }

    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted image from Cloudinary: ${publicId}`, result);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  extractPublicId,
  deleteImage
};
