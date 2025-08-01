const Product = require('../models/Products');

const uploadImage = async (req, res) => {
    try {
        const { nombre, descripcion, precio, publicado } = req.body;
        const imagen = req.file?.path;

        const nuevoProducto = new Product({
            nombre,
            descripcion,
            precio,
            publicado,
            imagen
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al subir imagen y guardar producto' });
    }
};

module.exports = { uploadImage };
