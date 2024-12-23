const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
  {
    userID: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    nombreCompleto: {
      type: String,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    tipoUsuario: {
      type: String,
      enum: ['jugador', 'entrenador', 'ambos'], // Ajusta según tus necesidades
      required: true,
    },
    fotoPerfil: {
      type: String,
      required: false, // Si es opcional
    },
    club: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
    posicion: {
      type: String,
      required: true,
    },
    atributos: {
      goles: { type: Number, required: true },
      asistencias: { type: Number, required: true },
      efectividad: { type: Number, required: true },
      blocajes: { type: Number, required: true },
      recuperaciones: { type: Number, required: true },
    },
    historialPartidos: [
      {
        type: String,  // Usamos String porque IdPartido es una cadena
        required: true,
      },
    ],
    historialNotificaciones: [
      {
        type: [mongoose.Schema.Types.Mixed], // Array con diferentes tipos
        validate: {
          validator: function (value) {
            return (
              Array.isArray(value) &&
              value.every(
                (item) =>
                  Array.isArray(item) &&
                  item.length === 2 &&
                  typeof item[0] === 'number' &&
                  typeof item[1] === 'string'
              )
            );
          },
          message: 'Cada elemento debe ser un array con un número y un string.',
        },
      },
    ],
  },
  {
    collection: 'usuarios', // Asegúrate de que esta colección exista en tu base de datos
  }
);

// Comprobar si el modelo ya está definido y usarlo, o definirlo si no lo está
const Usuario = mongoose.models.Usuarios || mongoose.model('Usuarios', UsuarioSchema);

module.exports = Usuario;
