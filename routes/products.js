const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔍 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 Obtener un producto específico por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, publicado } = req.body;
    const nuevo = await Product.create({ nombre, descripcion, precio, imagen, publicado });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✏️ Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// 🧪 Ruta de prueba para insertar producto fijo
router.get('/insertar-producto', async (req, res) => {
  try {
    const nuevo = await Product.create({
      nombre: "Bombilla grabada",
      descripcion: "Con diseño artesanal santiagueño",
      precio: 700,
      imagen: "https://ejemplo.com/bombilla.jpg",
      publicado: true
    });
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
