 // models/CrearPartido.js
import mongoose from 'mongoose';

/*
-IdEvento
        -IdPartido
        - Jugador
        - Minuto-segundo
        ----------------
        - Fase de juego
        - Resultado
        - Localizacion lanzamiento
        - Posicion Lanzador
        - Asistencia
        - Sistema de ataque 
        - Sistema de defensa
        ----------------
        - Acción
        ----------------
        - Suspensión
*/

const eventosSchema = new mongoose.Schema(
  {
    IdEvento: {
      type: String,
      required: true,
    },
    IdPartido: {
        type: String,
        required: true,
    },
    IdJugador: {
        type: String,
        required: true,
    },
    MinSeg: {
      type: String,
      required: true,
    },
    FaseDeJuego: {
        type: String,
        required: false, // Opcional
    },
    Resultado: {
        type: String,
        required: false, // Opcional
    },
    LocalizacionLanzamiento: {
        type: String,
        required: false, // Opcional
    },
    PosicionLanzador: {
        type: String,
        required: false, // Opcional
    },
    Asistencia: {
        type: String,
        required: false, // Opcional
    },
    SistemaDeAtaque: {
        type: String,
        required: false, // Opcional
    },
    SistemaDeDefensa: {
        type: String,
        required: false, // Opcional
    },
    Accion: {
        type: String,
        required: false, // Opcional
    },
    Suspension: {
        type: String,
        required: false, // Opcional
    },
    
  },
  {
    collection: 'Eventos', // Asegúrate de que la colección en la base de datos es 'partidos'
    timestamps: true, // Esto agregará las propiedades createdAt y updatedAt
  }
);

const Eventos =
  mongoose.models.Eventos ||
  mongoose.model('Eventos', eventosSchema);
export default Eventos;
