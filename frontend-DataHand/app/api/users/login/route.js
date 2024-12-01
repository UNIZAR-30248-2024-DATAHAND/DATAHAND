import { connectDB } from '../../../../lib/db'; // Asegúrate de tener esta función de conexión

export async function POST(req) {
  const { correo, contrasena } = await req.json(); // Extraemos los datos del cuerpo de la solicitud

  const db = await connectDB(); // Conectamos a la base de datos

  try {
    const collection = db.collection('usuarios'); // Accedemos a la colección 'usuarios'
    const user = await collection.findOne({ correoElectronico: correo }); // Buscamos al usuario por correo

    if (!user) {
      console.log('Usuario no encontrado');
      return new Response('Usuario no encontrado', { status: 401 }); // Si no existe el usuario
    }

    // Comparar contraseñas tal cual están (sin cifrado)
    if (contrasena !== user.contrasena) {
      console.log('Credenciales incorrectas');
      return new Response('Credenciales incorrectas', { status: 401 }); // Contraseña incorrecta
    }

    // Si las credenciales son correctas, respondemos con el userID personalizado
    return new Response(JSON.stringify({ userID: user.userID }), { status: 200 });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return new Response('Error del servidor', { status: 500 });
  }
}
