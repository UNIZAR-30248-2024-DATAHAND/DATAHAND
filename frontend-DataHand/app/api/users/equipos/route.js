// app/api/equipos/route.js
import Equipo from '../../../../models/Equipos';
import { connectDB } from '../../../../lib/db';

export async function GET(req) {
  await connectDB(); // Conéctate a la base de datos

  try {
    const equipos = await Equipo.find(); // Obtén todos los equipos
    console.log('Equipos encontrados:', equipos); // Imprimir los equipos en la consola

    if (equipos.length === 0) {
      return new Response('No se encontraron equipos', { status: 404 });
    }

    return new Response(JSON.stringify(equipos), { status: 200 }); // Devuelve los equipos
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    return new Response('Error al obtener equipos', { status: 500 });
  }
}
