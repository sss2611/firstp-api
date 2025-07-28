const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const data = req.body;

    // Validación opcional del logo base64
    if (data.logo && !data.logo.startsWith("data:image/")) {
      return res.status(400).json({ error: "El logo debe ser una imagen en formato base64" });
    }

    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, data, { new: true });
    } else {
      settings = await Settings.create(data);
    }

    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
