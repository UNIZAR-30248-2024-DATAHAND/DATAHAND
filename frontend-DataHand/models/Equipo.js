// models/Equipo.js
import mongoose from 'mongoose';

// Define el esquema para la colección 'equipos'
const equipoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        jugadores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jugador', // Si tienes un modelo de jugador
        }],
        entrenadorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entrenador', // Si tienes un modelo de entrenador
        },
    },
    {
        collection: 'equipos' // Especifica aquí el nombre de la colección
    }
);

// Exporta el modelo, asegurando que se use la colección 'equipos'
const Equipo = mongoose.models.Equipo || mongoose.model('Equipo', equipoSchema);
export default Equipo;
