const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    theme: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("Settings", settingSchema);

// marca: { type: String },
// logo: { type: String } // Imagen como base64