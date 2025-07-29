const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

router.post('/', async (req, res) => {
  console.log("Datos recibidos:", req.body); // 👀 debug en la terminal

  try {
    const { nombre, descripcion, precio, imagen, publicado } = req.body;
    const nuevo = await Product.create({ nombre, descripcion, precio, imagen, publicado });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al guardar producto:", error.message); // 👀 detalle del error
    res.status(400).json({ error: error.message });
  }
});


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

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // Publicar un producto
router.patch('/:id/publicar', async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { publicado: true },
      { new: true }
    );
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ocultar un producto
router.patch('/:id/ocultar', async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { publicado: false },
      { new: true }
    );
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

});

module.exports = router;
