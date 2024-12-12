const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  nombre: String,
  entrenador: String,
  imagen: String, // Para el URL de la imagen del equipo
  porteros: [Number], // Almacenamos como strings
  jugadores: [Number], // Almacenamos como strings
  banquillo: [Number], // Almacenamos como strings
  sistemaDefensivoLocal: String,
});

const Equipo = mongoose.models.Equipo || mongoose.model('Equipo', EquipoSchema);

module.exports = Equipo; // Exporta el modelo directamente
