const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const logoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'firstp-logo',
        allowed_formats: ['jpg', 'png', 'svg'],
        transformation: [{ width: 400, height: 400, crop: 'limit' }]
    }
});

const uploadLogo = multer({ storage: logoStorage });

module.exports = uploadLogo;
