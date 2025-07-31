const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");


router.get("/", async (req, res) => {
    try {
        const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });
        res.json(ultimaConfig || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "No se pudo obtener la configuración." });
    }
});

router.post("/", async (req, res) => {
    const { theme, marca, logo } = req.body;

    try {
        const nuevaConfig = new Settings({ theme, marca, logo });
        await nuevaConfig.save();
        res.status(201).json(nuevaConfig);
    } catch (err) {
        console.error("No se pudo guardar la configuración:", err);
        res.status(500).json({ error: "Error al guardar configuración" });
    }
});



module.exports = router;
