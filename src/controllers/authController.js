const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
        }

        // 2. Crear la instancia del nuevo usuario
        usuario = new Usuario({ nombre, email, password });

        // 3. Encriptar la contraseña con bcrypt
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // 4. Guardar en la base de datos
        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};

// Función para iniciar sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        // 2. Comparar la contraseña enviada con la encriptada
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        // 3. Crear y firmar el JWT
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // La clave secreta que pusimos en el .env
            { expiresIn: '1h' }, // El token expira en 1 hora
            (error, token) => {
                if (error) throw error;
                res.json({ token, mensaje: 'Login exitoso' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};