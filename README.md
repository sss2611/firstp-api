# 🧵 FirstP API

API RESTful desarrollada en **Node.js** y **Express** para la gestión de productos artesanales. Pensada para integrarse con el frontend desplegado en Vercel, esta API ofrece persistencia de datos, carga dinámica de imágenes, configuración personalizada de diseño, y escalabilidad modular.

## ⚙️ Funcionalidades

- 📦 **Gestión de productos**: Crear, listar, editar y eliminar productos con imágenes subidas a Cloudinary.
- 🎨 **Configuración de diseño (Settings)**: Actualización de marca, tema visual, y logo personalizado.
- ☁️ **Subida de imágenes**: Integración con Cloudinary mediante Multer para productos y logos.
- 🔒 **Persistencia de datos**: Uso de MongoDB Atlas para almacenamiento remoto y seguro.

## 🚀 Tecnologías

| Tecnología        | Propósito                             |
|------------------|----------------------------------------|
| **Node.js**       | Motor principal del servidor           |
| **Express**       | Framework para rutas y middleware      |
| **MongoDB Atlas** | Base de datos remota y escalable       |
| **Mongoose**      | ODM para modelar y validar esquemas    |
| **Cloudinary**    | Almacenamiento y transformación de imágenes |
| **Multer**        | Middleware para manejo de archivos     |
| **dotenv**        | Gestión de variables de entorno        |
| **Railway**       | Plataforma para despliegue del backend |

## 📁 Estructura de Carpetas

firstp-api/
│
├── config/
│   └── cloudinary.js          # Configuración de Cloudinary
│
├── controllers/
│   ├── imageController.js     # Lógica para crear productos con imagen
│   └── settingsController.js  # Lógica para actualizar el logo de Settings
│
├── middleware/
│   ├── upload.js              # Middleware Multer para imágenes de productos
│   └── uploadLogo.js          # Middleware Multer para imagen de logo
│
├── models/
│   ├── Product.js             # Esquema de producto con campo 'imagen'
│   └── Settings.js            # Esquema de configuración con campo 'logo'
│
├── routes/
│   ├── imageRoutes.js         # Ruta para subir producto con imagen
│   └── settingsRoutes.js      # Ruta para actualizar logo en Settings
│
├── .env                       # Variables de entorno (CLOUDINARY y MONGO_URI)
├── package.json               # Dependencias y metadatos del proyecto
└── server.js                  # Entrada principal del servidor Express



## 📡 Endpoints clave

| Método | Ruta                  | Descripción                            |
|--------|-----------------------|----------------------------------------|
| POST   | `/api/images/upload`  | Crear producto con imagen vía Cloudinary |
| PATCH  | `/api/config/logo`    | Actualizar logo de configuración        |
| GET    | `/api/products`       | Listar todos los productos              |
| GET    | `/api/config`         | Obtener configuración general           |

## 🔗 Frontend

Integración con frontend desplegado en [Vercel](https://first-p-iota.vercel.app/), que consume los endpoints para representar los productos y personalizar la interfaz de acuerdo a la configuración guardada.

---

💡 *Desarrollado con foco en modularidad, escalabilidad y experiencia de usuario.*  
✒️ _By Sandra S._  


# 1. Clona el repositorio
git clone https://github.com/sss2611/firstp-api.git
cd firstp-api

# 2. Instala las dependencias (usa el flag si hay conflictos)
npm install --legacy-peer-deps

# 3. Configura las variables de entorno
# Crea un archivo .env con tus credenciales, por ejemplo:
CLOUDINARY_CLOUD_NAME=tu_nombre
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_secreto
MONGODB_URI=tu_uri_de_mongodb

# 4. Ejecuta el servidor
npm start
