// lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://816818:Jaimichu_10@datahand.acj1g.mongodb.net/?retryWrites=true&w=majority&appName=DataHand';

// Asegúrate de que MONGODB_URI esté definido
if (!MONGODB_URI) {
  throw new Error('Por favor define la variable de entorno MONGODB_URI en .env.local');
}

let isConnected = false; // Estado de la conexión
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Tamaño del pool de conexiones
  maxIdleTimeMS: 10000, // Tiempo máximo de inactividad en milisegundos antes de liberar la conexión
};

export async function connectDB() {
  if (isConnected) {
    console.log('Ya existe una conexión activa a MongoDB.');
    return mongoose.connection; // Devuelve la instancia de la conexión
  }

  try {
    await mongoose.connect(MONGODB_URI, connectionOptions);
    isConnected = true; // Marcamos la conexión como exitosa
    console.log('Conectado a MongoDB con pool de conexiones');
    return mongoose.connection; // Devuelve la instancia de la conexión después de conectarse
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    throw new Error('Error al conectar a MongoDB');
  }
}
