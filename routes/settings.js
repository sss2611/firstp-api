const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// Imagen base64 (¡reemplazala por la tuya completa!)
const defaultLogo = "static/img/SS.png";

const defaultSettings = {
    theme: "lux",
    marca: "FirstP",
    logo: defaultLogo
};

// GET → responde con la última config, o con valores por defecto si no existe
router.get("/", async (req, res) => {
    try {
        const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });
        if (ultimaConfig) {
            res.json(ultimaConfig);
        } else {
            res.json(defaultSettings);
        }
    } catch (err) {
        console.error("Error al obtener configuración:", err);
        res.status(500).json({ error: "No se pudo obtener la configuración." });
    }
});

// POST → guarda nueva configuración
router.post("/", async (req, res) => {
    const { theme, marca, logo } = req.body;

    try {
        const nuevaConfig = new Settings({ theme, marca, logo });
        await nuevaConfig.save();
        res.status(201).json(nuevaConfig);
    } catch (err) {
        console.error("No se pudo guardar la configuración:", err);
        res.status(500).json({ error: "Error al guardar configuración." });
    }
});

module.exports = router;
