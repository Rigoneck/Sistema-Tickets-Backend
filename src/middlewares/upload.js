const multer = require('multer');
const path = require('path');

// Configuración de dónde y cómo se guardarán los archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // La carpeta destino
    },
    filename: function (req, file, cb) {
        // Renombramos el archivo para que sea único (fecha actual + nombre original)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;