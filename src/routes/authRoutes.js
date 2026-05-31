const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar usuario: POST /api/auth/register
router.post('/register', authController.registrarUsuario);

// Ruta para iniciar sesión: POST /api/auth/login
router.post('/login', authController.loginUsuario);

module.exports = router;