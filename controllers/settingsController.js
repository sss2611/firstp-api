const Settings = require('../models/Settings');

const actualizarLogo = async (req, res) => {
    try {
        const logoUrl = req.file?.path;
        if (!logoUrl) return res.status(400).json({ error: 'No se recibió ninguna imagen' });

        const settings = await Settings.findOneAndUpdate({}, { logo: logoUrl }, { new: true, upsert: true });
        res.status(200).json(settings);
    } catch (error) {
        console.error('❌ Error actualizando logo:', error);
        res.status(500).json({ error: 'No se pudo actualizar el logo' });
    }
};

const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) return res.status(404).json({ error: 'No hay configuración almacenada' });
        res.status(200).json(settings);
    } catch (error) {
        console.error('❌ Error al obtener configuración:', error);
        res.status(500).json({ error: 'No se pudo obtener la configuración' });
    }
};

module.exports = { actualizarLogo, getSettings };

