import Equipo from '../../../../models/Equipos';
import { connectDB } from '../../../../lib/db';

export default function handler(req, res) {
  const { entrenador } = req.query;

  const equipos = [
    {
      nombre: 'Zaragoza',
      entrenador: '1',
      imagen: 'url-de-imagen-zaragoza',
      porteros: ['Portero Zaragoza 1 - 1', 'Portero Zaragoza 2 - 13'],
      jugadores: [
        'Jugador',
        'Jugador',
        'Jugador',
        '9',
        'Jugador Zaragoza 5 - 11',
        'Jugador Zaragoza 6 - 12',
      ],
      banquillo: [
        'Banquillo Zaragoza 1 - 14',
        'Banquillo Zaragoza 2 - 15',
        'Banquillo Zaragoza 3 - 16',
        'Banquillo Zaragoza 4 - 17',
        'Banquillo Zaragoza 5 - 18',
        'Banquillo Zaragoza 6 - 19',
        'Banquillo Zaragoza 7 - 20',
        'Banquillo Zaragoza 8 - 21',
      ],
      sistemaDefensivo: '6:0',
    },
  ];

  // Filtra el equipo por el entrenador
  const equipo = equipos.find((e) => e.entrenador === entrenador);

  if (equipo) {
    res.status(200).json(equipo);
  } else {
    res.status(404).json({ message: 'Equipo no encontrado' });
  }
}

export async function GET(req) {
  await connectDB(); // Conéctate a la base de datos

  try {
    // Obtener todos los campos de los equipos (sin restricción de campos)
    const equipos = await Equipo.find({}); // Esto devuelve todos los campos de cada equipo
    console.log('Equipos encontrados:', equipos); // Imprimir los equipos en la consola

    if (equipos.length === 0) {
      return new Response('No se encontraron equipos', { status: 404 });
    }

    // Devuelve todos los datos de los equipos
    return new Response(JSON.stringify(equipos), { status: 200 });
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    return new Response('Error al obtener equipos', { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB(); // Conéctate a la base de datos

  try {
    // Parsear el cuerpo de la solicitud (se asume que es un JSON)
    const data = await req.json();
    const { entrenadorId, userID, posicion } = data; // Suponemos que el ID del entrenador se pasa en el cuerpo de la solicitud

    // Buscar el equipo con el ID del entrenador
    const equipo = await Equipo.findOne({ entrenador: entrenadorId });

    if (!equipo) {
      return new Response('Equipo no encontrado para este entrenador', { status: 404 });
    }

    let posicionJugador;

    // Si la posición es "PO", buscar en el campo de porteros
    if (posicion === "PO") {
      posicionJugador = equipo.porteros.findIndex((jugador) => jugador.includes('Portero'));
    } else {
      // Si no es "PO", primero buscamos en jugadores
      posicionJugador = equipo.jugadores.findIndex((jugador) => jugador.includes('Jugador'));

      // Si no encontramos en jugadores, buscamos en banquillo
      if (posicionJugador === -1) {
        posicionJugador = equipo.banquillo.findIndex((jugador) => jugador.includes('Banquillo'));
      }
    }

    // Si no se encontró espacio en ninguno de los lugares (jugadores, porteros o banquillo)
    if (posicionJugador === -1) {
      return new Response('Equipo lleno, no hay espacio para más jugadores', { status: 400 });
    }

    let userIDInt = parseInt(userID, 10);
    // Ahora asignamos el UserID al primer jugador disponible en la posición encontrada
    if (posicion === "PO") {
      equipo.porteros[posicionJugador] = userIDInt;
    } else if (posicionJugador < equipo.jugadores.length) {
      equipo.jugadores[posicionJugador] = userIDInt;
    } else {
      equipo.banquillo[posicionJugador] = userIDInt;
    }

    // Guardar el equipo actualizado
    const equipoActualizado = await equipo.save();

    // Responder con el equipo actualizado
    return new Response(JSON.stringify(equipoActualizado), { status: 200 });

  } catch (error) {
    console.error('Error al actualizar el equipo:', error);
    return new Response('Error al actualizar el equipo', { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener los datos del cuerpo de la solicitud
    const equipoActualizado = await req.json(); // Estado completo del equipo
    const { entrenador } = equipoActualizado; // Asegúrate de que el entrenador esté presente

    // Verificar que el campo entrenador esté presente
    if (!entrenador) {
      return new Response(
        JSON.stringify({ error: 'Debe proporcionar un entrenador' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Buscar el equipo por el ID del entrenador
    const equipo = await Equipo.findOne({ entrenador });

    if (!equipo) {
      return new Response(
        JSON.stringify({ error: 'Equipo no encontrado' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Actualizar el equipo con los datos proporcionados
    equipo.nombre = equipoActualizado.nombre || equipo.nombre;
    equipo.imagen = equipoActualizado.imagen || equipo.imagen;
    equipo.porteros = equipoActualizado.porteros || equipo.porteros;
    equipo.jugadores = equipoActualizado.jugadores || equipo.jugadores;
    equipo.banquillo = equipoActualizado.banquillo || equipo.banquillo;
    equipo.sistemaDefensivo = equipoActualizado.sistemaDefensivo || equipo.sistemaDefensivo;

    // Guardar los cambios en la base de datos
    const equipoGuardado = await equipo.save();

    // Responder con el equipo actualizado
    return new Response(
      JSON.stringify({
        message: 'Equipo actualizado exitosamente',
        equipo: equipoGuardado,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al guardar los cambios en el equipo:', error);
    return new Response(
      JSON.stringify({ error: 'Error al guardar los cambios en el equipo' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}