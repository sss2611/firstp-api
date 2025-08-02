require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoute = require("./routes/imageRoute");
const settingRoute = require('./routes/settingRoute');
const productRoute = require('./routes/productRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/images", imageRoute);
app.use('/api/config', settingRoute);
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('✨ API de FirstP online');
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar la app:", err);
  }
}

startServer();

