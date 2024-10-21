// app/api/users/crearPartido/route.js
import connectDB from '../../../../lib/db'; // Ruta relativa para db.js
import CrearPartidos from '../../../../models/CrearPartido'; // Ruta relativa para Usuario.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Conectar a la base de datos
      await connectDB();

      // Crear un nuevo documento basado en el modelo
      const partido = new CrearPartidos(req.body);

      // Guardar en la base de datos
      await partido.save();

      // Devolver respuesta exitosa
      return res
        .status(201)
        .json({ message: 'Partido registrado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al registrar el partido' });
    }
  } else {
    // Método no permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
