// models/CrearPartido.js
import mongoose from 'mongoose';

const crearPartidoSchema = new mongoose.Schema(
  {
    IdPartido: {
      type: String,
      required: true,
    },
    Fecha: {
      type: Date,
      required: true,
    },
    EquipoLocal: {
      type: String,
      required: true,
    },
    EquipoVisitante: {
      type: String,
      required: true,
    },
    EscudoLocal: {
      type: String,
      required: true,
    },
    EscudoVisitante: {
      type: String,
      required: true,
    },
    MarcadorLocal: {
      type: Number,
      required: true,
    },
    MarcadorVisitante: {
      type: Number,
      required: true,
    },
    TiempoDeJuego: {
      type: Number, 
      required: true,
    },
    Parte: {
      type: String,
      required: true,
    },
    local: {  
      porteros: {
        type: [Number],
        required: true,
      },
      jugadores: {
        type: [Number],
        required: true,
      },
      banquillo: {
        type: [Number],
        required: true,
      },
    },
    visitante: {  
      porteros: {
        type: [Number],
        required: true,
      },
      jugadores: {
        type: [Number],
        required: true,
      },
      banquillo: {
        type: [Number],
        required: true,
      },
    },
    sistemaDefensivoLocal: {
      type: String,
      required: true,
    },
    sistemaDefensivoVisitante: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'CrearPartido',
    timestamps: true,
  }
);

const CrearPartido =
  mongoose.models.CrearPartido ||
  mongoose.model('CrearPartido', crearPartidoSchema);
export default CrearPartido;
