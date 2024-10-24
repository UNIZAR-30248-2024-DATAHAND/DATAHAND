//POST Y GET DE EVENTOS
import { connectDB } from '../../../../lib/db'; // Ruta correcta para db.js
import Eventos from '../../../../models/Eventos'; // Ruta correcta para CrearPartido.js
import { getNextEventoId } from '../../../utils/generatePartido'; // Ruta correcta para generatePartido.js


//A la variable POST le entra un vector con las respuestas que necesita:
export async function POST(req) {
    try {
      // Conectar a la base de datos
      await connectDB();
  
      // Obtener los datos del cuerpo de la solicitud
      const datos = await req.json();
  
      const IdEvento = await getNextEventoId();
  
      // Crear el evento con los valores proporcionados
      const nuevoEvento = new Eventos({
        IdEvento: `Evento-${IdEvento}`,
        IdPartido: datos.IdPartido,
        IdJugador: datos.idJugador,
        MinSeg: datos.MinSeg,
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
  
      console.log("Estoy en el POST de eventos");
  
      // Guardar en la base de datos
      await nuevoEvento.save();
  
      // Devolver respuesta exitosa
      return new Response(
        JSON.stringify({ message: 'Evento creado exitosamente', evento: nuevoEvento }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    } catch (error) {
      console.error('Error al crear el evento:', error);
      return new Response(
        JSON.stringify({ error: 'Error al crear el evento' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }
  }

//HAY QUE EDITARLO PARA SACAR EVENTOS 
export async function GET(req) {
    try {
        // Conectar a la base de datos
        await connectDB();
  
        // Obtener todos los partidos de la base de datos
        const eventos = await Eventos.find({}); 
    
        // Devolver la respuesta con el conteo y los IdPartido
        return new Response(JSON.stringify({ totalEventos: eventos.length, eventos }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al obtener la lista de eventos:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener la lista de eventos' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
  }