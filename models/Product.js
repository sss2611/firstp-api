const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   nombre: { type: String, required: true },
//   descripcion: { type: String },
//   precio: { type: Number, required: true },
//   imagen: { type: String }
// }, { timestamps: true });

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String },
  publicado: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
