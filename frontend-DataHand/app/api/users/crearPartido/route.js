// app/api/usuarios/route.js
import { connectDB } from '../../../../lib/db'; // Ruta relativa para db.js
import CrearPartidos from '../../../../models/CrearPartido'; // Ruta relativa para Usuario.js

export async function POST(request) {
    // Conectar a la base de datos
    await connectDB();

    // Obtener los datos del usuario desde la solicitud
    const data = await request.json();

    // Crear una nueva instancia del modelo Usuario
    const nuevoPartido = new CrearPartidos(data);

    try {
        // Guardar el nuevo usuario en la base de datos
        const partidoGuardado = await nuevoPartido.save();

        // Retornar una respuesta con el usuario guardado
        return new Response(JSON.stringify(partidoGuardado), {
            status: 201, // Estado HTTP para creación exitosa
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al guardar el partido:', error);
        return new Response('Error al crear el partido', { status: 500 });
    }
}
