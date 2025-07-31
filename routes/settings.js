// const express = require("express");
// const router = express.Router();
// const Settings = require("../models/Settings");

// const defaultLogo = "static/img/SS.png";

// const defaultSettings = {
//     theme: "lux",
//     marca: "FirstP",
//     logo: defaultLogo
// };

// router.get("/", async (req, res) => {
//     try {
//         const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });
//         if (ultimaConfig) {
//             res.json(ultimaConfig);
//         } else {
//             res.json(defaultSettings);
//         }
//     } catch (err) {
//         console.error("Error al obtener configuración:", err);
//         res.status(500).json({ error: "No se pudo obtener la configuración." });
//     }
// });

// router.post("/", async (req, res) => {
//     const { theme, marca, logo } = req.body;

//     try {
//         const nuevaConfig = new Settings({ theme, marca, logo });
//         await nuevaConfig.save();
//         res.status(201).json(nuevaConfig);
//     } catch (err) {
//         console.error("No se pudo guardar la configuración:", err);
//         res.status(500).json({ error: "Error al guardar configuración." });
//     }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// Imagen default base64 o ruta local
const defaultLogo = "static/img/SS.png"; // Podés reemplazar esto con base64 si querés evitar rutas

// Configuración por defecto
const defaultSettings = {
    theme: "lux",
    marca: "FirstP",
    logo: defaultLogo
};

// 📥 GET → devuelve última configuración guardada o la default si no hay ninguna
router.get("/", async (req, res) => {
    try {
        const ultimaConfig = await Settings.findOne().sort({ createdAt: -1 });

        return res.json(ultimaConfig || defaultSettings);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        res.status(500).json({ error: "No se pudo obtener la configuración." });
    }
});

// 📝 POST → guarda nueva configuración
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

module.exports = router;
