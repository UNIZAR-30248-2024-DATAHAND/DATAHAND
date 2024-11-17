import { connectDB } from '../../../../lib/db'; // Ruta relativa para db.js
import Usuario from '../../../../models/Usuarios'; // Ruta relativa para Usuario.js

// Método POST para crear un nuevo usuario
export async function POST(request) {
    await connectDB();

    const data = await request.json();
    const nuevoUsuario = new Usuario(data);

    try {
        const usuarioGuardado = await nuevoUsuario.save();

        return new Response(JSON.stringify(usuarioGuardado), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return new Response('Error al crear el usuario', { status: 500 });
    }
}

// Método GET para obtener un usuario por su userID
export async function GET(req) {
    // Obtener el parámetro 'userID' de la URL (desde la consulta)
    const url = new URL(req.url);
    const userID = url.searchParams.get("userID");  // Obtiene el parámetro `userID` de la URL

    if (!userID) {
        return new Response(JSON.stringify({ error: 'Falta el userID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    await connectDB();

    try {
        // Buscar el usuario por su userID
        const usuario = await Usuario.findOne({ userID });

        // Verificar si el usuario existe
        if (!usuario) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Retornar el usuario encontrado
        return new Response(JSON.stringify(usuario), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al obtener el usuario por userID:', error);
        return new Response('Error al obtener el usuario', { status: 500 });
    }
}

// Método PUT para actualizar un usuario
export async function PUT(req) {
    try {
        await connectDB();

        const { idUsuario, ...actualizaciones } = await req.json();

        if (!idUsuario) {
            return new Response(JSON.stringify({ error: 'Falta el ID del usuario' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const usuario = await Usuario.findById(idUsuario);

        if (!usuario) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        Object.keys(actualizaciones).forEach(key => {
            usuario[key] = actualizaciones[key];
        });

        await usuario.save();

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

// Método DELETE para eliminar un partido del historial de un usuario
export async function DELETE(req) {
    // Obtener los parámetros userID y partidoID de la URL
    const url = new URL(req.url);
    const userID = url.searchParams.get("userID");  // Obtiene el parámetro `userID` de la URL
    const partidoID = url.searchParams.get("partidoID");  // Obtiene el parámetro `partidoID` de la URL

    if (!userID || !partidoID) {
        return new Response(JSON.stringify({ error: 'Faltan los parámetros userID o partidoID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        await connectDB();

        // Buscar el usuario por su userID
        const usuario = await Usuario.findOne({ userID });

        if (!usuario) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Eliminar el partido del historial
        const result = await Usuario.updateOne(
            { userID },
            { $pull: { historialPartidos: partidoID } }  // $pull elimina el partidoID del historial
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: 'No se pudo eliminar el partido' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify({ message: 'Partido eliminado exitosamente' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error al eliminar el partido del historial:', error);
        return new Response(JSON.stringify({ error: 'Error al eliminar el partido' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
