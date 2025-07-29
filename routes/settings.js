const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// 🧩 Obtener el último tema configurado
router.get("/", async (req, res) => {
    try {
        const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });
        res.json(ultimaConfig || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "No se pudo obtener la configuración." });
    }
});

// 💾 Guardar un nuevo tema
router.post("/", async (req, res) => {
    const { theme } = req.body;

    try {
        const nuevaConfig = new Settings({ theme });
        await nuevaConfig.save();
        res.status(201).json(nuevaConfig);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "No se pudo guardar la configuración." });
    }
});

module.exports = router;
