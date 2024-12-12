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
            EquipoLocal: 'Equipo A',
            EquipoVisitante: 'Equipo B',
            MarcadorLocal: 0,
            MarcadorVisitante: 0,
            EscudoLocal: '/images/icon_shield.svg',
            EscudoVisitante: '/images/icon_shield.svg',
            TiempoDeJuego: 0,
            Parte: 'Primera parte',
            local: {
                porteros: [15, 16], // Dos porteros
                jugadores: [1, 2, 3, 4, 5, 6],
                banquillo: [7, 8, 9, 10, 11, 12, 13, 14],
            },
            visitante: {
                porteros: [31, 32], // Dos porteros
                jugadores: [17, 18, 19, 20, 21, 22],
                banquillo: [23, 24, 25, 26, 27, 28, 29, 30],
            },
            sistemaDefensivoLocal: '6:0',
            sistemaDefensivoVisitante: '5:1',
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
  
        // Obtener el parámetro `IdPartido` de la URL
        const url = new URL(req.url);
        const IdPartido = url.searchParams.get("IdPartido");

        // Verificar si se proporcionó `IdPartido`
        if (!IdPartido) {
            return new Response(JSON.stringify({ error: 'Debe proporcionar un IdPartido' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Buscar el partido en la base de datos por `IdPartido`
        const partido = await CrearPartidos.findOne({ IdPartido });

        // Verificar si se encontró el partido
        if (!partido) {
            return new Response(JSON.stringify({ error: 'No se encontró el partido con el IdPartido especificado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Devolver los datos del partido encontrado
        return new Response(JSON.stringify(partido), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al obtener el partido:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener el partido' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function PUT(req) {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Obtener los datos del partido del cuerpo de la solicitud
        const partidoData = await req.json();
        const { IdPartido } = partidoData;

        // Verificar que `IdPartido` está presente
        if (!IdPartido) {
            return new Response(JSON.stringify({ error: 'Debe proporcionar un IdPartido' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Buscar y actualizar el partido en la base de datos
        const partidoActualizado = await CrearPartidos.findOneAndUpdate(
            { IdPartido },
            { $set: partidoData },
            { new: true } // Devuelve el partido actualizado
        );

        if (!partidoActualizado) {
            return new Response(JSON.stringify({ error: 'No se encontró el partido' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Respuesta de éxito
        return new Response(JSON.stringify({ message: 'Partido actualizado exitosamente', partido: partidoActualizado }), {
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