const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    theme: { type: String },
    marca: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("Settings", settingSchema);


// logo: { type: String } // Imagen como base64