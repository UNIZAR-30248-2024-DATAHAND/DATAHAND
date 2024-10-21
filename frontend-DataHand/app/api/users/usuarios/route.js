// app/api/usuarios/route.js
import { connectDB } from '../../../../lib/db'; // Ruta relativa para db.js
import Usuario from '../../../../models/Usuarios'; // Ruta relativa para Usuario.js

export async function POST(request) {
    // Conectar a la base de datos
    await connectDB();

    // Obtener los datos del usuario desde la solicitud
    const data = await request.json();

    // Crear una nueva instancia del modelo Usuario
    const nuevoUsuario = new Usuario(data);

    try {
        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.sample_mfix.save();

        // Retornar una respuesta con el usuario guardado
        return new Response(JSON.stringify(usuarioGuardado), {
            status: 201, // Estado HTTP para creación exitosa
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return new Response('Error al crear el usuario', { status: 500 });
    }
}
