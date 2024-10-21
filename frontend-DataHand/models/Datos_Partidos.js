// models/Datos_Partidos.js
const mongoose = require('mongoose');

const datosPartidosSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    equipoLocal: { type: String, required: true },
    equipoVisitante: { type: String, required: true },
    resultado: { type: String, required: true },
    alineacionLocal: {
        jugadoresCampo: [{ jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' }, posicion: String }],
        portero: { jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' } }
    },
    equipoLocalInfo: {
        horarios: [String],
        imagen: String,
        sistemaDefensivoInicial: String
    },
    alineacionVisitante: {
        jugadoresCampo: [{ jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' }, posicion: String }],
        portero: { jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' } }
    },
    equipoVisitanteInfo: {
        imagen: String,
        sistemaDefensivoInicial: String
    },
    jugadores: [
        {
            jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' },
            estadisticas: {
                goles: Number,
                asistencias: Number,
                penaltis: Number
            }
        }
    ],
    entrenadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entrenador' },
    eventos: [
        {
            tipo: String,
            jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' },
            minuto: Number,
            descripcion: String
        }
    ]
}, { collection: 'datos_partidos' });

const Datos_Partidos = mongoose.model('Datos_Partidos', datosPartidosSchema);
module.exports = Datos_Partidos;
