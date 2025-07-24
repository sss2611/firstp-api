const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔍 Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen } = req.body;
    const nuevo = await Product.create({ nombre, descripcion, precio, imagen });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🧪 Ruta de prueba para insertar un producto fijo
router.get('/insertar-producto', async (req, res) => {
  try {
    const nuevo = await Product.create({
      nombre: "Bombilla grabada",
      descripcion: "Con diseño artesanal santiagueño",
      precio: 700,
      imagen: "https://ejemplo.com/bombilla.jpg"
    });
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
