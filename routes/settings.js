const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");
const Products = require("../models/Products"); // Asegurate que el path sea correcto

const defaultLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

const defaultSettings = {
    theme: "lux",
    marca: "FirstP",
    logo: defaultLogo
};

// 📥 GET configuración actual
router.get("/", async (req, res) => {
    try {
        const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });
        return res.json(ultimaConfig || defaultSettings);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        res.status(500).json({ error: "No se pudo obtener la configuración." });
    }
});

// 📤 POST nueva configuración
router.post("/", async (req, res) => {
    const { theme, marca, logo } = req.body;

    if (!theme || !marca || !logo) {
        return res.status(400).json({ error: "Faltan campos en la configuración." });
    }

    try {
        const nuevaConfig = new Settings({ theme, marca, logo });
        await nuevaConfig.save();
        res.status(201).json(nuevaConfig);
    } catch (error) {
        console.error("Error al guardar configuración:", error);
        res.status(500).json({ error: "No se pudo guardar la configuración." });
    }
});

// 🚀 GET configuración + productos combinados
router.get("/full", async (req, res) => {
    try {
        const config = await Settings.findOne().sort({ createdAt: -1 });
        const products = await Products.find();

        const response = {
            theme: config?.theme || defaultSettings.theme,
            marca: config?.marca || defaultSettings.marca,
            logo: config?.logo || defaultSettings.logo,
            products: products || [],
        };

        res.json(response);
    } catch (error) {
        console.error("Error al obtener configuración completa:", error);
        res.status(500).json({ error: "Error al obtener configuración completa." });
    }
});

module.exports = router;
