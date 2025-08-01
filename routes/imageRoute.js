const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/imageController');

router.post('/upload', upload.single('imagen'), uploadImage);

module.exports = router;
