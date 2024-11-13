const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  nombre: String,
  entrenador: String,
  imagen: String, // Para el URL de la imagen del equipo
  porteros: [String], // Almacenamos como strings
  jugadores: [String], // Almacenamos como strings
  banquillo: [String], // Almacenamos como strings
  sistemaDefensivoLocal: String,
});

const Equipo = mongoose.models.Equipo || mongoose.model('Equipo', EquipoSchema);

module.exports = mongoose.model('Equipo', EquipoSchema); 
