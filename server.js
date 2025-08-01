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

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
