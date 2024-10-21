// models/Estadisticas_Individuales.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const estadisticaIndividualesSchema = new Schema(
  {
    partido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partidos', // Referencia al modelo Partido
      required: true,
    },
    jugador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios', // Referencia al modelo Usuario
      required: true,
    },
    goles: {
      type: Number,
      required: true,
      default: 0,
    },
    asistencias: {
      type: Number,
      required: true,
      default: 0,
    },
    minutosJugados: {
      type: Number,
      required: true,
    },
    faltas: {
      type: Number,
      required: true,
      default: 0,
    },
    tirosApuerta: {
      type: Number,
      required: true,
      default: 0,
    },
    tirosFallidos: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'estadisticas_individuales', // Nombre de la colección
    timestamps: true, // Agrega los campos createdAt y updatedAt automáticamente
  }
);

const EstadisticasIndividuales =
  mongoose.models.EstadisticasIndividuales ||
  mongoose.model('EstadisticasIndividuales', estadisticaIndividualesSchema);
export default EstadisticasIndividuales;
