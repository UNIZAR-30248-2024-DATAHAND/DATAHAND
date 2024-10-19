// models/Usuario.js
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
    {
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
            enum: ['jugador', 'entrenador'], // Ajusta según tus necesidades
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
            velocidad: { type: Number, required: true },
            fuerza: { type: Number, required: true },
            resistencia: { type: Number, required: true },
        },
        historialPartidos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partido', // Asume que tienes un modelo Partido
        }],
    },
    {
        collection: 'usuarios', // Asegúrate de que esta colección exista en tu base de datos
    }
);

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
export default Usuario;
