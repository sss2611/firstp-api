# Firstp API

API REST desarrollada en Node.js y Express para gestionar productos artesanales. Pensada para integrarse con el frontend desplegado en Vercel.

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Render (Deploy)
- dotenv

## 🔧 Instalación local

```bash
git clone https://github.com/sss2611/firstp-api.git
cd firstp-api
npm install

🔗 Integración con frontend en Vercel
Este backend está diseñado para ser consumido por el dashboard de Firstp desplegado en Vercel. Asegurate de que las llamadas a la API usen la URL pública provista por Render:

fetch('https://firstp-api.onrender.com/api/products')

const API_URL = 'https://firstp-api.onrender.com/api/products';

EJEMPLO const API_BASE = 'https://firstp-api.onrender.com/api/products';

const cargarProductos = async () => {
  try {
    const res = await fetch(API_BASE);
    const productos = await res.json();
    // renderizar productos en pantalla...
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

