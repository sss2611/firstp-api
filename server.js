// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const productRoutes = require('./routes/products');
// const settingsRoutes = require("./routes/settings");

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));

// app.use('/api/products', productRoutes);
// app.use("/api/settings", settingsRoutes);

// app.get('/', (req, res) => {
//   res.send('API Firstp funcionando 🚀');
// });


// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDB conectado');
//     app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
// }).catch(err => console.error(err));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

const productRoutes = require('./routes/products');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 3000;

// ☁️ Configuración Cloudinary
cloudinary.config({
  cloud_name: 'dhuxbiud1',
  api_key: '828983722687148',
  api_secret: process.env.CLOUDINARY_SECRET // siempre oculto en .env
});

// 🧼 Middleware
app.use(cors({
  origin: 'https://first-p-iota.vercel.app'
}));

app.use(express.json({ limit: '10mb' }));

// 📦 Rutas principales
app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);

// 📤 Ruta para subir imagen
const upload = multer({ dest: 'temp/' });
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'productos'
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('❌ Error al subir imagen:', error.message);
    res.status(500).json({ error: 'Falló el upload' });
  }
});

// 🚀 Ruta base
app.get('/', (req, res) => {
  res.send('API FirstP funcionando 🚀');
});

// 🔌 Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB conectado correctamente');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(error => {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  });
