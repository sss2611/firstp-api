const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// 🔍 GET - Listar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Product.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los productos' });
    }
});

// 📦 POST - Crear un nuevo producto (sin imagen, opcional si usás imageRoutes.js para eso)
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto' });
    }
});

// 🔧 PUT - Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
});

// 🗑️ DELETE - Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
