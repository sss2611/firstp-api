// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//   try {
//     const productos = await Product.find();
//     res.json(productos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const producto = await Product.findById(req.params.id);
//     if (!producto) {
//       return res.status(404).json({ error: 'Producto no encontrado' });
//     }
//     res.json(producto);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { nombre, descripcion, precio, imagen, publicado } = req.body;
//     const nuevoProducto = await Product.create({ nombre, descripcion, precio, imagen, publicado });
//     res.status(201).json(nuevoProducto);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const { nombre, descripcion, precio, imagen, publicado } = req.body;
//     const productoActualizado = await Product.findByIdAndUpdate(
//       req.params.id,
//       { nombre, descripcion, precio, imagen, publicado },
//       { new: true }
//     );
//     if (!productoActualizado) {
//       return res.status(404).json({ error: 'Producto no encontrado' });
//     }
//     res.json(productoActualizado);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ mensaje: 'Producto eliminado' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔄 Utilidad para manejar errores internos
const handleError = (res, error, status = 500) => {
  res.status(status).json({ error: error.message });
};

// 📦 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    handleError(res, error);
  }
});

// 🔎 Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    handleError(res, error);
  }
});

// 🆕 Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, publicado } = req.body;
    const nuevoProducto = new Product({ nombre, descripcion, precio, imagen, publicado });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    handleError(res, error, 400);
  }
});

// ✏️ Actualizar producto (edición completa)
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, publicado } = req.body;
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, imagen, publicado },
      { new: true, runValidators: true }
    );
    if (!productoActualizado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (error) {
    handleError(res, error, 400);
  }
});

router.patch('/:id/publicar', async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { publicado: true },
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    handleError(res, error);
  }
});


// 🗑️ Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
