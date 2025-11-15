const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const path = require('path');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pehenava/posts', // Folder in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Allowed file formats
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: 'limit', // Don't crop, just limit size
        quality: 'auto', // Automatic quality optimization
        fetch_format: 'auto' // Automatic format conversion (WebP when supported)
      }
    ],
    public_id: (req, file) => {
      // Create unique filename: timestamp-userId-originalname (without extension)
      const uniqueSuffix = Date.now() + '-' + req.user._id;
      const originalName = path.parse(file.originalname).name; // Get filename without extension
      return `${uniqueSuffix}-${originalName}`;
    }
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: fileFilter
});

module.exports = upload;
