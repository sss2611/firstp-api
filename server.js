require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoute = require("./routes/imageRoute");
const settingRoute = require('./routes/settingRoute');
const productRoute = require('./routes/productRoute');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/images", imageRoute);
app.use('/api/config', settingRoute);
app.use('/api/products', productRoute);

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ Conectado a MongoDB"))
//   .catch((err) => console.error("❌ Error de conexión:", err));

// const PORT = process.env.PORT || 8080;
// try {
//   app.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
//   });
// } catch (error) {
//   console.error('❌ Error al iniciar el servidor:', error);
// }

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Conectado a MongoDB");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar la app:", err);
  }
}

startServer();

