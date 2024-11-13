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
