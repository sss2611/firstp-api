const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    theme: { type: String },
    marca: { type: String },
    logo: { type: String } // Aquí guardarás la URL de Cloudinary
}, {
    timestamps: true
});

module.exports = mongoose.model("Settings", settingSchema);
