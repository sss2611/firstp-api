const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    theme: { type: String },
    marca: { type: String },
    logo: { type: String } // Imagen como base64
}, {
    timestamps: true
});

module.exports = mongoose.model("Settings", settingSchema);
