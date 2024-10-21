// models/Partidos.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const partidosSchema = new Schema(
  {
    fechaPartido: {
      type: Date,
      required: true,
    },
    local: {
      type: String,
      required: true,
    },
    rival: {
      nombre: {
        type: String,
        required: true,
      },
      escudo: {
        type: String,
        required: false, // Puede ser opcional si no siempre se tiene el escudo
      },
    },
    estadio: {
      type: String,
      required: true,
    },
    jugadoresLocales: [
      {
        jugador: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Usuario', // Referencia al modelo Usuario
          required: true,
        },
        posicion: {
          type: String,
          required: true,
        },
      },
    ],
    jugadoresRivales: [
      {
        nombre: {
          type: String,
          required: true,
        },
        numero: {
          type: Number,
          required: true,
        },
      },
    ],
    eventos: [
      {
        jugador: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Usuario', // Referencia al modelo Usuario
          required: true,
        },
        evento: {
          type: String,
          enum: ['gol', 'pase', 'falta', 'tarjeta', 'lesion'], // Ajustar según los tipos de eventos
          required: true,
        },
        minuto: {
          type: Number,
          required: true,
        },
        ubicacion: {
          type: String,
          required: true,
        },
      },
    ],
    resultado: {
      type: String,
      required: true,
    },
    estadisticas: {
      posesionLocal: {
        type: Number,
        required: true,
      },
      posesionRival: {
        type: Number,
        required: true,
      },
      golesLocales: {
        type: Number,
        required: true,
      },
      golesRivales: {
        type: Number,
        required: true,
      },
      faltasLocales: {
        type: Number,
        required: true,
      },
      faltasRivales: {
        type: Number,
        required: true,
      },
    },
  },
  {
    collection: 'partidos', // Asegúrate de que la colección en la base de datos es 'partidos'
    timestamps: true, // Esto agregará las propiedades createdAt y updatedAt
  }
);

const Partidos =
  mongoose.models.Partidos || mongoose.model('Partidos', partidosSchema);
export default Partidos;
