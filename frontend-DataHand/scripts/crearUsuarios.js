const mongoose = require('mongoose');
const Usuario = require('../models/Usuarios'); // Asegúrate de que la ruta al modelo sea correcta

// Conexión a la base de datos (asegúrate de tener tu URI de conexión correcta)
mongoose.connect('mongodb+srv://816818:Jaimichu_10@datahand.acj1g.mongodb.net/?retryWrites=true&w=majority&appName=DataHand', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

async function crearUsuarios() {
  const usuarios = [
    {
      userID: 1,  // ID único para este usuario
      nombreCompleto: 'Carlos Pérez',
      correoElectronico: 'carlos.perez@example.com',
      contrasena: 'password123',
      fechaNacimiento: '1980-05-20T00:00:00.000+00:00',
      tipoUsuario: 'entrenador',
      fotoPerfil: 'url_a_la_foto_carlos.jpg',
      club: 'Club Deportivo Ejemplo',
      pais: 'España',
      posicion: 'NA', // Para el caso de entrenador
      atributos: {
        goles: 0,
        asistencias: 0,
        efectividad: 0,
        blocajes: 0,
        recuperaciones: 0,
        experiencia: 0,
        estrategia: 0,
        liderazgo: 0
      },
      historialPartidos: ['Partido-77', 'Partido-78', 'Partido-79', 'Partido-80', 'Partido-81']
    },
    {
      userID: 2,  // ID único para este usuario
      nombreCompleto: 'Juan López',
      correoElectronico: 'juan.lopez@example.com',
      contrasena: 'securepass',
      fechaNacimiento: '1995-03-12T00:00:00.000+00:00',
      tipoUsuario: 'jugador',
      fotoPerfil: 'url_a_la_foto_juan.jpg',
      club: 'Club Deportivo Ejemplo',
      pais: 'España',
      posicion: 'DEL',
      atributos: {
        goles: 20,
        asistencias: 10,
        efectividad: 85,
        blocajes: 5,
        recuperaciones: 15,
        experiencia: 0,
        estrategia: 0,
        liderazgo: 0
      },
      historialPartidos: ['Partido-82', 'Partido-83', 'Partido-84', 'Partido-85', 'Partido-86']
    },
    {
      userID: 3,  // ID único para este usuario
      nombreCompleto: 'Pedro González',
      correoElectronico: 'pedro.gonzalez@example.com',
      contrasena: 'mysecurepassword',
      fechaNacimiento: '1987-08-25T00:00:00.000+00:00',
      tipoUsuario: 'ambos',
      fotoPerfil: 'url_a_la_foto_pedro.jpg',
      club: 'Club Deportivo Ejemplo',
      pais: 'España',
      posicion: 'MCD',
      atributos: {
        goles: 5,
        asistencias: 10,
        efectividad: 80,
        blocajes: 6,
        recuperaciones: 9,
        experiencia: 0,
        estrategia: 0,
        liderazgo: 0
      },
      historialPartidos: ['Partido-87', 'Partido-88', 'Partido-89', 'Partido-90', 'Partido-91']
    }
  ];

  // Guardar los usuarios en la base de datos
  await Usuario.insertMany(usuarios);
  console.log('Usuarios creados exitosamente');
}

// Ejecutamos el script
crearUsuarios().catch(console.error).finally(() => mongoose.disconnect());
