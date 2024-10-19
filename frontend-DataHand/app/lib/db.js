// lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://816818:Jaimichu_10@datahand.acj1g.mongodb.net/?retryWrites=true&w=majority&appName=DataHand';

// Asegúrate de que MONGODB_URI esté definido
if (!MONGODB_URI) {
    throw new Error(
        'Por favor define la variable de entorno MONGODB_URI en .env.local'
    );
}

let isConnected; // Estado de la conexión

export async function connectDB() {
    if (isConnected) {
        return; // Si ya estamos conectados, no hacemos nada
    }

    try {
        // Conectamos a la base de datos
        await mongoose.connect(MONGODB_URI);
        isConnected = true; // Marcamos la conexión como exitosa
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        throw new Error('Error al conectar a MongoDB'); // Lanza un error si la conexión falla
    }
}
