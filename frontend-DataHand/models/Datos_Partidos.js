// models/Datos_Partidos.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const datosPartidosSchema = new Schema({
  goles: {
    type: Number,
    required: true,
  },
  asistencias: {
    type: Number,
    required: true,
  },
  penaltis: {
    type: Number,
    required: true,
  },
});

const jugadorSchema = new Schema({
  jugadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios', // Referencia al modelo Usuario
    required: true,
  },
  estadisticas: estadisticasJugadorSchema,
});

const eventoSchema = new Schema({
  tipo: {
    type: String,
    enum: ['gol', 'asistencia', 'penalti', 'tarjeta', 'cambio'], // Puedes agregar más eventos si es necesario
    required: true,
  },
  jugadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  minuto: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

const datosPartidoSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  equipoLocal: {
    type: String,
    required: true,
  },
  equipoVisitante: {
    type: String,
    required: true,
  },
  resultado: {
    type: String,
    required: true,
  },
  jugadores: [jugadorSchema], // Lista de jugadores con estadísticas
  entrenadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  eventos: [eventoSchema], // Lista de eventos ocurridos en el partido
}, {
  collection: 'datos_partidos', // Nombre de la colección en la base de datos
  timestamps: true, // Agrega campos createdAt y updatedAt
});

const DatosPartidos = mongoose.models.DatosPartidos || mongoose.model('DatosPartidos', datosPartidosSchema);
export default DatosPartidos;
