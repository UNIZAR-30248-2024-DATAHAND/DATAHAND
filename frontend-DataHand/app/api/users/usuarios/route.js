import { connectDB } from '../../../../lib/db'; // Ruta relativa para db.js
import Usuario from '../../../../models/Usuarios'; // Ruta relativa para Usuario.js

// Método POST para crear un nuevo usuario
export async function POST(request) {
    await connectDB();
  
    const data = await request.json();
  
    try {
      // 1. Buscar el último usuario creado para obtener el último userID
      const ultimoUsuario = await Usuario.findOne().sort({ userID: -1 }); // Orden descendente por userID
  
      // 2. Si hay usuarios, incrementamos el último userID en 1, si no, asignamos 4
      const nuevoUserID = ultimoUsuario ? ultimoUsuario.userID + 1 : 4;
  
      // 3. Crear el nuevo usuario con el nuevo userID
      const nuevoUsuario = new Usuario({
        userID: nuevoUserID, // Asignamos el userID incremental
        nombreCompleto: data.nombreCompleto,
        correoElectronico: data.correoElectronico,
        contrasena: data.contrasena, // Recuerda hashear la contraseña antes de guardarla
        fechaNacimiento: data.fechaNacimiento,
        tipoUsuario: data.tipoUsuario, // 'jugador' o 'entrenador'
        fotoPerfil: data.fotoPerfil, // La URI de la imagen
        club: data.club,
        pais: data.pais,
        posicion: data.posicion, // Usamos 'NA' si es entrenador
        atributos: data.atributos, // Atributos del jugador o entrenador
        historialPartidos: data.historialPartidos, // Historial vacío
        historialNotificaciones: [] // Campo de historialNotificaciones vacío
      });
  
      // Guardamos el nuevo usuario
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

// Método PUT para actualizar un usuario usando el userID desde el cuerpo de la solicitud (JSON)
export async function PUT(req) {
    // Obtener los datos desde el cuerpo de la solicitud (JSON)
    const { userID, nombre, contrasenia, foto, club } = await req.json();

        // Imprimir las variables para verificar su contenido
        console.log('userID:', userID);
        console.log('nombre:', nombre);
        console.log('contrasenia:', contrasenia);
        console.log('foto:', foto);
        console.log('club:', club);

    // Validar que se proporcione el userID
    if (!userID) {
        return new Response(JSON.stringify({ error: 'Falta el userID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Asegurarnos de que userID sea un número válido
    const userIDInt = parseInt(userID);
    if (isNaN(userIDInt)) {
        return new Response(JSON.stringify({ error: 'El userID debe ser un número válido' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Conectar a la base de datos
    await connectDB();

    try {
        // Buscar el usuario por su userID (como entero)
        const usuario = await Usuario.findOne({ userID: userIDInt });

        // Verificar si el usuario existe
        if (!usuario) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Actualizar solo los campos permitidos si se proporcionan
        if (nombre !== undefined) usuario.nombreCompleto = nombre;
        if (contrasenia !== undefined) usuario.contrasena = contrasenia;
        if (foto !== undefined) usuario.fotoPerfil = foto;
        if (club !== undefined) usuario.club = club;

        // Guardar los cambios en la base de datos
        await usuario.save();

        return new Response(JSON.stringify({ 
            message: 'Usuario actualizado exitosamente', 
            usuario 
        }), {
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
