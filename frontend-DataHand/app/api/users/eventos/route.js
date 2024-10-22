//POST Y GET DE EVENTOS
import { connectDB } from '../../../../lib/db'; // Ruta correcta para db.js
import Eventos from '../../../../models/Eventos'; // Ruta correcta para CrearPartido.js
import { getNextEventoId } from '../../../utils/generatePartido'; // Ruta correcta para generatePartido.js


//A la variable POST le entra un vector con las respuestas que necesita:
export async function POST(req, datos) {
    try {
        // Conectar a la base de datos
        await connectDB();

        const IdEvento = await getNextEventoId();

        // Crear el partido con valores predeterminados
        const nuevoEvento = new Eventos({
            IdEvento: `Evento-${IdEvento}`,
            IdPartido: datos.idPartido, 
            IdJugador: datos.idJugador,
            MinSeg: datos.tiempoJugado, 
            FaseDeJuego: datos.faseDeJuego,
            Resultado: datos.resultado, 
            LocalizacionLanzamiento: datos.localizacionLanzamiento,
            PosicionLanzador: datos.posicionLanzador,
            Asistencia: datos.asistenciaDada,
            SistemaDeAtaque: datos.sistemaAtaque,
            SistemaDeDefensa: datos.sistemaDefensa,
            Accion: datos.accion,
            Suspension: datos.suspension,
        });

        // Guardar en la base de datos
        await nuevoEvento.save();

        // Devolver respuesta exitosa
        return new Response(JSON.stringify({ message: 'Evento creado exitosamente', evento: nuevoEvento }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al crear el evento:', error);
        return new Response(JSON.stringify({ error: 'Error al crear el evento' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

//HAY QUE EDITARLO PARA SACAR EVENTOS
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