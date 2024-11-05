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
        const usuarioGuardado = await nuevoUsuario.save();

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

// Método GET para obtener todos los usuarios
export async function GET(request) {
    // Conectar a la base de datos
    await connectDB();

    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await Usuario.find(); // Devuelve todos los documentos en la colección

        // Retornar una respuesta con la lista de usuarios
        return new Response(JSON.stringify(usuarios), {
            status: 200, // Estado HTTP para solicitud exitosa
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return new Response('Error al obtener los usuarios', { status: 500 });
    }
}