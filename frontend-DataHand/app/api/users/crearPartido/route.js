import { connectDB } from '../../../../lib/db'; // Ruta correcta para db.js
import CrearPartidos from '../../../../models/CrearPartido'; // Ruta correcta para CrearPartido.js
import { getNextPartidoId } from '../../../utils/generatePartido'; // Ruta correcta para generatePartido.js

export async function POST(req) {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener el siguiente ID secuencial
        const IdPartido = await getNextPartidoId();

        // Crear el partido con valores predeterminados
        const partidoVacio = new CrearPartidos({
            IdPartido: `Partido-${IdPartido}`,
            Fecha: fechaActual,
            EquipoLocal: 'Local',
            EquipoVisitante: 'Visitante',
            MarcadorLocal: 0,
            MarcadorVisitante: 0,
            TiempoDeJuego: '0',
            Parte: ['Parte1'], // Asegúrate de que esto sea un array si lo necesitas, R: NO TIENE QUE SERLO
            Equipos: {
                Locales: {
                    Porteros: [],
                    Jugadores: [],
                    Banquillo: [],
                },
                Visitantes: {
                    Porteros: [],
                    Jugadores: [],
                    Banquillo: [],
                },
            },
            SistemaDefensivoLocal: '6:0',
            SistemaDefensivoVisitante: '6:0',
        });

        // Guardar en la base de datos
        await partidoVacio.save();

        // Devolver respuesta exitosa
        return new Response(JSON.stringify({ message: 'Partido creado exitosamente', partido: partidoVacio }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al crear el partido:', error);
        return new Response(JSON.stringify({ error: 'Error al crear el partido' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}


export async function GET(req) {
    try {
        // Conectar a la base de datos
        await connectDB();
  
        // Obtener todos los partidos de la base de datos
        const partidos = await CrearPartidos.find({}, 'IdPartido'); // Obtiene solo el IdPartido
  
        // Mapear para obtener solo los IdPartido
        const idsPartidos = partidos.map(partido => partido.IdPartido);
  
        // Devolver la respuesta con el conteo y los IdPartido
        return new Response(JSON.stringify({ totalPartidos: idsPartidos.length, idsPartidos }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al obtener la lista de partidos:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener la lista de partidos' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
  }

// CREAR PUT PARA MODIFICAR DATOS
export async function PUT(req) {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Obtener los datos del cuerpo de la solicitud (presumiblemente en formato JSON)
        const { idPartido, ...actualizaciones } = await req.json();

        // Verificar que se proporcione el Id del partido
        if (!idPartido) {
            return new Response(JSON.stringify({ error: 'Falta el Id del partido' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Buscar el partido en la base de datos
        const partido = await CrearPartidos.findOne({ IdPartido: idPartido });

        // Verificar si el partido existe
        if (!partido) {
            return new Response(JSON.stringify({ error: 'Partido no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Actualizar los campos del partido
        Object.keys(actualizaciones).forEach(key => {
            partido[key] = actualizaciones[key];
        });

        // Guardar los cambios en la base de datos
        await partido.save();

        // Devolver respuesta exitosa
        return new Response(JSON.stringify({ message: 'Partido actualizado exitosamente', partido }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al actualizar el partido:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el partido' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}