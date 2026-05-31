const Ticket = require('../models/Ticket');

// 1. Crear un Ticket (C)
exports.crearTicket = async (req, res) => {
    try {
        const { asunto, descripcion, prioridad } = req.body;
        
        // Creamos el nuevo ticket enlazando el ID del usuario autenticado
        const nuevoTicket = new Ticket({
            asunto,
            descripcion,
            prioridad,
            creador: req.usuario.id, // Viene de tu guardia (middleware)
            evidencia: req.file ? req.file.filename : null // Si suben archivo, lo guardamos
        });

        const ticketGuardado = await nuevoTicket.save();
        res.status(201).json(ticketGuardado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el ticket' });
    }
};

// 2. Leer los Tickets del Usuario (R)
exports.obtenerMisTickets = async (req, res) => {
    try {
        // Buscamos solo los tickets donde el creador sea el usuario actual
        // Usamos populate para traer también el nombre y correo del creador
        const tickets = await Ticket.find({ creador: req.usuario.id })
                                    .populate('creador', 'nombre email');
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los tickets' });
    }
};

// 3. Actualizar un Ticket (U)
exports.actualizarTicket = async (req, res) => {
    try {
        const { asunto, descripcion, prioridad, estado } = req.body;
        
        let ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ mensaje: 'Ticket no encontrado' });

        // Verificamos que el usuario que actualiza sea el dueño del ticket
        if (ticket.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ mensaje: 'No autorizado para editar este ticket' });
        }

        // Actualizamos los campos
        ticket.asunto = asunto || ticket.asunto;
        ticket.descripcion = descripcion || ticket.descripcion;
        ticket.prioridad = prioridad || ticket.prioridad;
        ticket.estado = estado || ticket.estado;
        if (req.file) ticket.evidencia = req.file.filename;

        ticket = await Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true });
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el ticket' });
    }
};

// 4. Eliminar un Ticket (D)
exports.eliminarTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ mensaje: 'Ticket no encontrado' });

        if (ticket.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ mensaje: 'No autorizado para eliminar este ticket' });
        }

        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Ticket eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el ticket' });
    }
};