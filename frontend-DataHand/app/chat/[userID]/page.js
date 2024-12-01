'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radar } from 'react-chartjs-2';
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

  const chats = [
    { id: 1, name: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', image: '/images/user1.jpg' },
    { id: 2, name: 'Usuario 2', lastMessage: '¿Recibiste el archivo?', image: '/images/user2.jpg' },
    { id: 3, name: 'Usuario 3', lastMessage: '¿Vienes a la reunión?', image: '/images/user3.jpg' },
  ];

  const messages = [
    { text: 'Hola, ¿cómo estás?', fromUser: true },
    { text: 'Bien, ¿y tú?', fromUser: false },
    { text: 'Genial, gracias por preguntar.', fromUser: true },
  ];

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
  });

  useEffect(() => {
    obtenerUsuario(userID, setUsuario);
  }, [userID]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-500">
      {!selectedChat ? (
        <>
          <h1 className="text-5xl font-bold text-white mb-6">Lista de Chats</h1>
          <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 mb-4"
              >
                <Image src={chat.image} alt={chat.name} width={50} height={50} className="rounded-full" />
                <div className="ml-4">
                  <h2 className="text-xl text-gray-800 font-bold">{chat.name}</h2>
                  <p className="text-gray-800 font-bold">{chat.lastMessage}</p>
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
                    <Image src={selectedChat.image} alt={selectedChat.name} width={50} height={50} className="rounded-full" />
                    <h2 className="text-2xl text-gray-800 font-bold ml-4">{selectedChat.name}</h2>
                </div>
            </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg max-w-[70%] font-bold ${
                  msg.fromUser 
                    ? 'bg-blue-500 text-white ml-auto text-right'
                    : 'bg-gray-300 text-black mr-auto text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full p-2 border rounded-lg outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
  
}
