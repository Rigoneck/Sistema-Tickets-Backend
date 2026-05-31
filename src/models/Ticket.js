const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    asunto: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta', 'Crítica'],
        default: 'Baja'
    },
    estado: {
        type: String,
        enum: ['Abierto', 'En progreso', 'Resuelto', 'Cerrado'],
        default: 'Abierto'
    },
    evidencia: {
        type: String,
        default: null
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);