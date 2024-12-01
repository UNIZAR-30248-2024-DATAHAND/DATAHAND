'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from '../../components/Sidebar';
import React, { useState, useEffect } from "react"; 
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ProfileForm from '../../components/profileform'; // Importamos el componente ProfileForm

ChartJS.register(...registerables);

const obtenerUsuario = async (userID, setUsuario) => {
  try {
    console.log(`Solicitando usuario con userID: ${userID}`);
    const res = await fetch(`/api/users/usuarios?userID=${userID}`);
    const data = await res.json();
    setUsuario(data);
  } catch (error) {
    console.error('Error al obtener el usuario', error);
  }
};

export default function EditarPerfil() {
  const { userID } = useParams();
  const router = useRouter();

  const [selectedChat, setSelectedChat] = useState(null);

  const [usuario, setUsuario] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    contrasena: '',
    fechaNacimiento: '',
    tipoUsuario: '',
    fotoPerfil: '',
    club: '',
    pais: '',
    posicion: '',
    atributos: {
      goles: 0,
      asistencias: 0,
      efectividad: 0,
      blocajes: 0,
      recuperaciones: 0,
    },
    historialPartidos: [],  
    historialNotificaciones: [],
  }); 

  useEffect(() => {
    obtenerUsuario(userID, setUsuario);
  }, [userID]);

  // Filtrar los mensajes del chat seleccionado
  const mensajesFiltrados = selectedChat
    ? usuario.historialNotificaciones.filter((notif) => notif[0] === selectedChat.id)
    : [];

    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-500">
        {!selectedChat ? (
          <>
            <h1 className="text-5xl font-bold text-white mb-6">Lista de Chats</h1>
            <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
              {usuario.historialNotificaciones.map((notif, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedChat({ id: notif[0], name: `Chat ${notif[0]}` })}
                  className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 mb-4"
                >
                  <Image src="/default-chat-icon.png" alt={`Chat ${notif[0]}`} width={50} height={50} className="rounded-full" />
                  <div className="ml-4">
                    <h2 className="text-xl text-gray-800 font-bold">Chat {notif[0]}</h2>
                    <p className="text-gray-800">Último mensaje...</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <button
              onClick={() => setSelectedChat(null)}
              className="text-blue-500 underline mb-4 font-bold"
            >
              Volver a la lista
            </button>
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center">
                <Image src="/default-chat-icon.png" alt={selectedChat.name} width={50} height={50} className="rounded-full" />
                <h2 className="text-2xl text-gray-800 font-bold ml-4">{selectedChat.name}</h2>
              </div>
            </div>
  
            <div className="flex-1 overflow-y-auto space-y-4 flex flex-col items-center px-4">
              {/* Mostrar los mensajes del chat seleccionado */}
              {mensajesFiltrados.map((msg, index) => (
                <div
                  key={index}
                  className="w-full max-w-4xl px-4 py-2 rounded-lg bg-blue-500 text-white font-bold text-center mx-auto"
                >
                  {msg[1]} {/* Mensaje del historialNotificaciones */}
                </div>
              ))}
            </div>

            <div className="mt-4 w-full flex justify-center">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full max-w-4xl p-2 border rounded-lg outline-none"
              />
            </div>
          </div>
        )}
      </div>
    );
  
}
