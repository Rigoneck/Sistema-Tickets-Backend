const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');

// 1. Inicializar la aplicación
const app = express();

// 2. Conectar a la base de datos MongoDB
conectarDB();

// 3. Middlewares
app.use(cors()); // Permite peticiones desde el frontend (React)
app.use(express.json()); // Permite leer datos en formato JSON
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
// Permite que las imagenes de la carpeta uploads se vean en el navegador
app.use('/uploads', express.static('uploads'));

// 4. Ruta de prueba básica
app.get('/', (req, res) => {
    res.send('API del Sistema de Tickets funcionando correctamente ');
});

// 5. Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});