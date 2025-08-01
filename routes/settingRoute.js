const express = require('express');
const router = express.Router();
const uploadLogo = require('../middleware/uploadLogo');
const { actualizarLogo, getSettings } = require('../controllers/settingsController');

// Ruta para actualizar el logo
router.patch('/logo', uploadLogo.single('logo'), actualizarLogo);
router.get('/', getSettings);

module.exports = router;
