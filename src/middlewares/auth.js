const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Leer el token del header de la petición
    const token = req.header('x-auth-token');

    // 2. Revisar si no hay token
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
    }

    // 3. Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado.usuario; // Agregamos el ID del usuario a la petición
        next(); // Le decimos que puede continuar a la siguiente ruta
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });
    }
};