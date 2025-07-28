const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");

// 🔍 Obtener configuración (solo una)
router.get("/", async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ Actualizar configuración (crea si no existe)
router.put("/", async (req, res) => {
  try {
    const data = req.body;

    let setting = await Setting.findOne();
    if (setting) {
      setting = await Setting.findByIdAndUpdate(setting._id, data, { new: true });
    } else {
      setting = await Setting.create(data);
    }

    res.json(setting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
