const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Crear ticket (Protegido con auth y recibe un archivo llamado 'evidencia')
router.post('/', auth, upload.single('evidencia'), ticketController.crearTicket);

// Obtener mis tickets (Protegido con auth)
router.get('/', auth, ticketController.obtenerMisTickets);

// Actualizar ticket (Protegido, puede recibir nuevo archivo)
router.put('/:id', auth, upload.single('evidencia'), ticketController.actualizarTicket);

// Eliminar ticket (Protegido)
router.delete('/:id', auth, ticketController.eliminarTicket);

module.exports = router;