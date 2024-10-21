import { connectDB } from '../../../../lib/db';
import DatosPartidos from '../../../../models/Datos_Partidos';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectDB();  // Conecta a la base de datos
            console.log('Conexión a MongoDB exitosa');  // Log para conexión

            console.log("Datos recibidos en la API:", req.body);  // Log para ver los datos que llegan a la API

            const nuevoPartido = new DatosPartidos(req.body);  // Crea un nuevo registro
            console.log("Datos que se intentan guardar:", nuevoPartido);  // Log antes de guardar

            await nuevoPartido.save();  // Guarda en la base de datos
            console.log("Partido guardado correctamente en la base de datos:", nuevoPartido);  // Log si se guarda correctamente

            res.status(201).json({ message: 'Partido guardado correctamente', partido: nuevoPartido });
        } catch (error) {
            console.error('Error al guardar el partido:', error);  // Log en caso de error
            res.status(500).json({ message: 'Error al guardar el partido', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
