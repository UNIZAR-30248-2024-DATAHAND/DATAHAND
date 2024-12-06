import Equipo from '../../../../models/Equipos';
import { connectDB } from '../../../../lib/db';

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

    // Ahora asignamos el UserID al primer jugador disponible en la posición encontrada
    if (posicion === "PO") {
      equipo.porteros[posicionJugador] = userID;
    } else if (posicionJugador < equipo.jugadores.length) {
      equipo.jugadores[posicionJugador] = userID;
    } else {
      equipo.banquillo[posicionJugador] = userID;
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