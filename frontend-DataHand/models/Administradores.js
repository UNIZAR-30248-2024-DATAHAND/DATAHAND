// models/Administradores.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const administradoresSchema = new Schema(
  {
    nombreCompleto: {
      type: String,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true, // El correo debe ser único para cada administrador
    },
    contrasena: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'administradores', // Nombre de la colección
    timestamps: true, // Agrega los campos createdAt y updatedAt automáticamente
  }
);

const Administradores =
  mongoose.models.Administradores ||
  mongoose.model('Administradores', administradoresSchema);
export default Administradores;
