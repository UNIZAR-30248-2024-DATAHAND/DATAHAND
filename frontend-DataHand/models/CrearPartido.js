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
          MarcadorLocal: {
            type: Number,
            required: true,
          },
          MarcadorVisitante: {
            type: Number,
            required: true,
          },
          TiempoDeJuego: {
            type: String,
            required: true,
          },
          Parte: {
            type: [String],
            enum: ['Parte1', 'Parte2', 'Prórroga'],
            required: true,
          },
          Equipos: {
            Locales: {
              Porteros: {
                type: [String],
                required: true,
              },
              Jugadores: {
                type: [String],
                required: true,
              },
              Banquillo: {
                type: [String],
                required: true,
              },
            },
            Visitantes: {
              Porteros: {
                type: [String],
                required: true,
              },
              Jugadores: {
                type: [String],
                required: true,
              },
              Banquillo: {
                type: [String],
                required: true,
              },
            },
          },
          SistemaDefensivoLocal: {
            type: String,
            required: true,
          },
          SistemaDefensivoVisitante: {
            type: String,
            required: true,
          },

    }, {
        collection: 'CrearPartido', // Asegúrate de que la colección en la base de datos es 'partidos'
        timestamps: true, // Esto agregará las propiedades createdAt y updatedAt
      });

const CrearPartidos = mongoose.models.CrearPartidos || mongoose.model('CrearPartido', crearPartidoSchema);
export default CrearPartidos;