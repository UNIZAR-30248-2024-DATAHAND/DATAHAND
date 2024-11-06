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

export async function PUT(req) {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Obtener los datos del cuerpo de la solicitud
        const { idUsuario, ...actualizaciones } = await req.json();

        // Verificar que se proporcione el ID del usuario
        if (!idUsuario) {
            return new Response(JSON.stringify({ error: 'Falta el ID del usuario' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findById(idUsuario);

        // Verificar si el usuario existe
        if (!usuario) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Actualizar los campos del usuario
        Object.keys(actualizaciones).forEach(key => {
            usuario[key] = actualizaciones[key];
        });

        // Guardar los cambios en la base de datos
        await usuario.save();

        // Devolver respuesta exitosa
        return new Response(JSON.stringify({ message: 'Usuario actualizado exitosamente', usuario }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el usuario' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}