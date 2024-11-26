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
        IdJugador: datos.IdJugador,
        IdPortero: datos.IdPortero,
        EquipoJugador: datos.EquipoJugador,
        MinSeg: datos.MinSeg,
        FaseDeJuego: datos.faseDeJuego,
        Resultado: datos.resultado,
        LocalizacionLanzamiento: datos.localizacionLanzamiento,
        PosicionLanzador: datos.posicionLanzador,
        Asistencia: datos.asistenciaDada,
        SistemaDeAtaque: datos.sistemaAtaque,
        SistemaDeDefensa: datos.sistemaDefensa,
        Accion: datos.Accion,
        Suspension: datos.Suspension,
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

      // Obtener el parámetro idPartido de la consulta
      const url = new URL(req.url);
      const idPartido = url.searchParams.get('idPartido'); // Obtener el valor del query param

      // Construir el filtro
      const filtro = idPartido ? { IdPartido: idPartido } : {};

      // Obtener los eventos filtrados
      const eventos = await Eventos.find(filtro);

      // Devolver la respuesta con el conteo y los eventos filtrados
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

export async function DELETE(req) {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener el parámetro `IdEvento` desde la URL
    const url = new URL(req.url);
    const idEvento = url.searchParams.get('IdEvento');

    if (!idEvento) {
      return new Response(
        JSON.stringify({ error: 'El parámetro IdEvento es requerido' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Buscar y eliminar el evento
    const eventoEliminado = await Eventos.findOneAndDelete({ IdEvento: idEvento });

    if (!eventoEliminado) {
      return new Response(
        JSON.stringify({ error: 'Evento no encontrado' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Devolver la respuesta exitosa
    return new Response(
      JSON.stringify({ message: 'Evento eliminado exitosamente', evento: eventoEliminado }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    return new Response(
      JSON.stringify({ error: 'Error al eliminar el evento' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
