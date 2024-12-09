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
  const [showModal, setShowModal] = useState(false);  
  const [invitacionEmail, setInvitacionEmail] = useState('');
  const [isInvitacionSelected, setIsInvitacionSelected] = useState(false); 
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

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

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const res = await fetch('../api/users/equipos');
        if (!res.ok) throw new Error('Error al obtener equipos');
        const data = await res.json();
        setEquipos(data);
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };
    obtenerEquipos();
  }, []);

  useEffect(() => {
    if (equipos.length > 0 && selectedChat && selectedChat.id) {
      // Filtramos el equipo cuyo campo 'entrenador' coincida con 'selectedChat.id'
      const equipoEncontrado = equipos.find((equipo) => equipo.entrenador === selectedChat.id);
      console.log('Equipo encontrado:', equipoEncontrado);
      
      // Si encontramos un equipo que coincide, actualizamos el estado
      if (equipoEncontrado) {
        setEquipoSeleccionado(equipoEncontrado);
      } else {
        setEquipoSeleccionado(null);  // Si no encontramos ningún equipo, dejamos el estado en null
      }
    }
  }, [equipos, selectedChat]);
  

  // Filtrar los mensajes del chat seleccionado
  const mensajesFiltrados = selectedChat
    ? usuario.historialNotificaciones.filter((notif) => notif[0] === selectedChat.id)
    : [];

    const handleNuevaNotificacion = () => {
      // Muestra el modal cuando se hace clic en el botón
      setShowModal(true);
    };
  
    const handleSeleccionarNotificacion = async (tipo) => {
      // Manejar el tipo seleccionado
      if (tipo === "Invitación") {
        setIsInvitacionSelected(true); // Cuando selecciona invitación, cambia el estado para mostrar el correo
      } else if (tipo === "Nuevas estadísticas disponibles") {
        // Mostrar el alert cuando se selecciona "Nuevas estadísticas disponibles"
        //alert("¡Nuevas estadísticas disponibles!");
        enviarNotificacionATodosLosJugadores(); 
      } else {
        setIsInvitacionSelected(false); // Vuelve a las opciones normales si selecciona la otra opción
      }
    };

    const enviarNotificacionATodosLosJugadores = async () => {
      try {
        // Hacer un GET a la API para obtener todos los equipos
        const res = await fetch('/api/users/equipos'); 
        const equipos = await res.json();
    
        // Filtrar el equipo donde soy el entrenador
        const equipo = equipos.find(equipo => equipo.entrenador === userID);
    
        if (!equipo) {
          return alert('No se encontró un equipo con este entrenador.');
        }
    
        // Obtener todos los jugadores del equipo
        const jugadores = [
          ...equipo.porteros,
          ...equipo.jugadores,
          ...equipo.banquillo
        ].filter(jugador => !jugador.includes('Portero') && !jugador.includes('Jugador') && !jugador.includes('Banquillo'));
    
        if (jugadores.length === 0) {
          return alert('No hay jugadores para notificar.');
        }
        try {
          // Enviar una notificación a cada jugador
          for (const jugadorId of jugadores) {
            const response = await fetch("/api/users/usuarios", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: jugadorId,
                statsUser: userID, 
                mensajeNotificacion: "Nuevas estadisticas disponibles", // Aquí estamos enviando el mensaje
              }),
            });

            if (response.ok) {
              console.log(`Notificación enviada a: ${jugadorId}`);
            } else {
              console.error(`Error al enviar notificación a ${jugadorId}`);
            }
          }
      
          alert('Notificaciones enviadas a todos los jugadores');
        } catch (error) {
          console.error('Error al obtener los jugadores:', error);
        }
      } catch (error) {
        console.error('Error al obtener equipos o enviar notificaciones:', error);
        alert('Error al enviar las notificaciones');
      }
    };

    const handleInvitacionSubmit = async () => {
      // Aquí se maneja la lógica para enviar la invitación (actualmente solo se simula con un alert)
      if (invitacionEmail) {
        alert(`Invitación enviada a: ${invitacionEmail}`);
        try {
          // Llamada a la función PUT del backend 
          const response = await fetch("/api/users/usuarios", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correoElectronico: invitacionEmail,
              userID: userID,
              mensajeNotificacion: "Invitacion",
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log("Notifiacion actualizada:", data);
          } else {
            console.error("Error al actualizar notifiacion:", data.error);
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
        setShowModal(false); // Cierra el modal después de enviar la invitación
        setInvitacionEmail(''); // Limpiar el campo de correo
      } else {
        alert("Por favor ingresa un correo válido.");
      }
    };
  
    const handleCloseModal = () => {
      // Función para cerrar el modal
      setShowModal(false);
      setIsInvitacionSelected(false); // Resetea la selección a las opciones iniciales
      setInvitacionEmail(''); // Limpiar el correo al cerrar el modal
    };
    
    const handleAceptarInvitacion = async () => {
      alert(`Invitación aceptada para el usuario con ID: ${userID}`);
      try {
          const response = await fetch('/api/users/usuarios', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userID: userID,
                  chatNoti: selectedChat.id,
                  mensajeNotificacion: "Invitacion", // El mensaje original de la invitación
                  mensajeEditado: "Invitación - Aceptada", // El nuevo mensaje para indicar que fue aceptada
                  club: equipoSeleccionado.nombre,
              }),
          });

          const data = await response.json();

          if (response.ok) {
              console.log('Notificación actualizada a: Invitación - Aceptada', data);
          } else {
              console.error('Error al actualizar la notificación:', data.error);
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }

      try {
        const response = await fetch('/api/users/equipos', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            entrenadorId: selectedChat.id,
            userID: userID, 
            posicion: usuario.posicion, 
          }), // Pasamos el ID del entrenador, el UserID y la posición
        });
      
        if (!response.ok) {
          const error = await response.text();
          console.error('Error al actualizar el equipo:', error);
        } else {
          const equipo = await response.json();
          console.log('Equipo actualizado:', equipo);
        }
      } catch (error) {
        console.error('Error al actualizar el equipo:', error);
      }
    };
    
    const handleRechazarInvitacion = async () => {
      alert(`Invitación rechazada para el usuario con ID: ${userID}`);
      try {
        const response = await fetch('/api/users/usuarios', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: userID,
                chatNoti: selectedChat.id,
                mensajeNotificacion: "Invitacion", // El mensaje original de la invitación
                mensajeEditado: "Invitación - Rechazada", // El nuevo mensaje para indicar que fue rechazada
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Notificación actualizada a: Invitación - Rechazada', data);
        } else {
            console.error('Error al actualizar la notificación:', data.error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
    };

    
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-500">
        <Sidebar userID={userID} />
        {!selectedChat ? (
          <>
            <h1 className="text-5xl font-bold text-white mb-6">Lista de Chats</h1>
            <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            {
            // Filtrar notificaciones para eliminar duplicados por el primer valor (ID del chat)
            usuario.historialNotificaciones
              .filter((value, index, self) => 
                index === self.findIndex((t) => (
                  t[0] === value[0] // Asegura que solo se muestre un chat con el mismo ID
                ))
              )
              .map((notif, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedChat({ id: notif[0], name: `Chat ${notif[0]}` })}
                  className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 mb-4"
                >
                  <Image src="/default-chat-icon.png" alt={`Chat ${notif[0]}`} width={50} height={50} className="rounded-full" />
                  <div className="ml-4">
                    <h2 className="text-xl text-gray-800 font-bold">Chat {notif[0]}</h2>
                  </div>
                </div>
              ))
          }
            </div>
  
            {/* Mostrar el botón para entrenadores */}
            {usuario.tipoUsuario === "entrenador" && (
              <div className="mt-6">
                <button
                  onClick={handleNuevaNotificacion}
                  className="bg-blue-500 text-white p-3 rounded-lg font-bold"
                >
                  Mandar nueva notificación
                </button>
              </div>
            )}
  
            {/* Modal con las opciones */}
            {showModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-xl text-gray-800 font-bold text-center mb-6">Selecciona una opción</h2>
                  <div className="space-y-4">
                    <button
                      onClick={() => handleSeleccionarNotificacion("Invitación")}
                      className="bg-green-500 text-white p-3 rounded-lg font-bold w-full"
                    >
                      Invitación
                    </button>
                    <button
                      onClick={() => handleSeleccionarNotificacion("Nuevas estadísticas disponibles")}
                      className="bg-yellow-500 text-white p-3 rounded-lg font-bold w-full"
                    >
                      Nuevas estadísticas disponibles
                    </button>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="mt-4 text-center text-blue-500 underline"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
  
            {/* Si se selecciona "Invitación", mostrar el input para el correo */}
            {showModal && isInvitacionSelected && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-xl text-gray-800 font-bold mb-4">Invitación</h2>
                  <label htmlFor="correo" className="block text-gray-700">Correo del usuario:</label>
                  <input
                    type="email"
                    id="correo"
                    value={invitacionEmail}
                    onChange={(e) => setInvitacionEmail(e.target.value)}
                    className="w-full p-2 border text-gray-800 rounded-md mt-2 mb-4"
                    placeholder="Correo electrónico"
                  />
                  <button
                    onClick={handleInvitacionSubmit}
                    className="bg-blue-500 text-white p-3 rounded-lg font-bold w-full"
                  >
                    Enviar invitación
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="mt-4 text-center text-blue-500 underline"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
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
              {mensajesFiltrados.reverse().map((msg, index) => (
                <div
                  key={index}
                  className="w-full max-w-4xl px-4 py-2 rounded-lg bg-blue-500 text-white font-bold flex justify-between items-center mx-auto"
                >
                  <span>{msg[1]}</span> {/* Mensaje del historialNotificaciones */}
                  {msg[1] === "Invitacion" && ( // Mostrar botones solo si el mensaje es una invitación */}
                    <div className="space-x-2">
                      <button
                        onClick={() => handleAceptarInvitacion()}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => handleRechazarInvitacion()}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    );
}
