const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  publicado: { type: Boolean, default: false },
  imagen: { type: String } // aquí almacenarás la URL de Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
