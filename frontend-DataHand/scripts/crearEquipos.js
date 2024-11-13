const mongoose = require('mongoose');
const Equipo = require('../models/Equipos'); // Asegúrate de que la ruta al modelo sea correcta

// Conexión a la base de datos (asegúrate de tener tu URI de conexión correcta)
mongoose.connect('mongodb+srv://816818:Jaimichu_10@datahand.acj1g.mongodb.net/?retryWrites=true&w=majority&appName=DataHand', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

async function crearEquipos() {
  const equipos = [
    {
      nombre: 'Valencia',
      entrenador: 'Entrenador1',
      imagen: 'url-de-imagen-valencia',
      porteros: [
        'Portero Valencia 1 - 1',
        'Portero Valencia 2 - 13'
      ],
      jugadores: [
        'Jugador Valencia 1 - 7',
        'Jugador Valencia 2 - 8',
        'Jugador Valencia 3 - 9',
        'Jugador Valencia 4 - 10',
        'Jugador Valencia 5 - 11',
        'Jugador Valencia 6 - 12'
      ],
      banquillo: [
        'Banquillo Valencia 1 - 14',
        'Banquillo Valencia 2 - 15',
        'Banquillo Valencia 3 - 16',
        'Banquillo Valencia 4 - 17',
        'Banquillo Valencia 5 - 18',
        'Banquillo Valencia 6 - 19',
        'Banquillo Valencia 7 - 20',
        'Banquillo Valencia 8 - 21'
      ],
      sistemaDefensivoLocal: '',
    },
    {
      nombre: 'Zaragoza',
      entrenador: 'Entrenador2',
      imagen: 'url-de-imagen-zaragoza',
      porteros: [
        'Portero Zaragoza 1 - 1',
        'Portero Zaragoza 2 - 13'
      ],
      jugadores: [
        'Jugador Zaragoza 1 - 7',
        'Jugador Zaragoza 2 - 8',
        'Jugador Zaragoza 3 - 9',
        'Jugador Zaragoza 4 - 10',
        'Jugador Zaragoza 5 - 11',
        'Jugador Zaragoza 6 - 12'
      ],
      banquillo: [
        'Banquillo Zaragoza 1 - 14',
        'Banquillo Zaragoza 2 - 15',
        'Banquillo Zaragoza 3 - 16',
        'Banquillo Zaragoza 4 - 17',
        'Banquillo Zaragoza 5 - 18',
        'Banquillo Zaragoza 6 - 19',
        'Banquillo Zaragoza 7 - 20',
        'Banquillo Zaragoza 8 - 21'
      ],
      sistemaDefensivoLocal: '',
    },
    {
      nombre: 'Madrid',
      entrenador: 'Entrenador3',
      imagen: 'url-de-imagen-madrid',
      porteros: [
        'Portero Madrid 1 - 1',
        'Portero Madrid 2 - 13'
      ],
      jugadores: [
        'Jugador Madrid 1 - 7',
        'Jugador Madrid 2 - 8',
        'Jugador Madrid 3 - 9',
        'Jugador Madrid 4 - 10',
        'Jugador Madrid 5 - 11',
        'Jugador Madrid 6 - 12'
      ],
      banquillo: [
        'Banquillo Madrid 1 - 14',
        'Banquillo Madrid 2 - 15',
        'Banquillo Madrid 3 - 16',
        'Banquillo Madrid 4 - 17',
        'Banquillo Madrid 5 - 18',
        'Banquillo Madrid 6 - 19',
        'Banquillo Madrid 7 - 20',
        'Banquillo Madrid 8 - 21'
      ],
      sistemaDefensivoLocal: '',
    },
    {
      nombre: 'Sevilla',
      entrenador: 'Entrenador4',
      imagen: 'url-de-imagen-sevilla',
      porteros: [
        'Portero Sevilla 1 - 1',
        'Portero Sevilla 2 - 13'
      ],
      jugadores: [
        'Jugador Sevilla 1 - 7',
        'Jugador Sevilla 2 - 8',
        'Jugador Sevilla 3 - 9',
        'Jugador Sevilla 4 - 10',
        'Jugador Sevilla 5 - 11',
        'Jugador Sevilla 6 - 12'
      ],
      banquillo: [
        'Banquillo Sevilla 1 - 14',
        'Banquillo Sevilla 2 - 15',
        'Banquillo Sevilla 3 - 16',
        'Banquillo Sevilla 4 - 17',
        'Banquillo Sevilla 5 - 18',
        'Banquillo Sevilla 6 - 19',
        'Banquillo Sevilla 7 - 20',
        'Banquillo Sevilla 8 - 21'
      ],
      sistemaDefensivoLocal: '',
    }
  ];

  // Guardar los equipos en la base de datos
  await Equipo.insertMany(equipos);
  console.log('Equipos creados exitosamente');
}

// Ejecutamos el script
crearEquipos().catch(console.error).finally(() => mongoose.disconnect());
