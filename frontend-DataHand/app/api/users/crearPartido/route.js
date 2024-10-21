// app/api/users/crearPartido/route.js
import connectDB from '../../../../lib/db'; // Ruta relativa para db.js
import CrearPartidos from '../../../../models/CrearPartido'; // Ruta relativa para Usuario.js
import { getNextPartidoId } from '../../../utils/generatePartido';


export default async function handler(req, res) {
    if (req.method === 'POST') {
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
                Parte: 'Parte 1',
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
            return res.status(201).json({ message: 'Partido creado exitosamente', partido: partidoVacio });
        } catch (error) {
            console.error(error);
        return res.status(500).json({ error: 'Error al crear el partido' });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}
