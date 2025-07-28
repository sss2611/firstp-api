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

    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, data, { new: true });
    } else {
      setting = await Settings.create(data);
    }

    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
