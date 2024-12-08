'use client'; // Marca el componente como un Client Component

import { useState, useEffect } from 'react';
import React from 'react'; // Este import será global en tus pruebas
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Formulario from './profileform'; // Asegúrate de que la ruta sea correcta

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

const Sidebar = ({ userID }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
  }, []);

  function tieneIndicador(mensajes) {
    if (!mensajes || mensajes.length === 0) return false;
  
    const ultimoMensaje = mensajes[mensajes.length - 1];
    console.log('Último mensaje:', ultimoMensaje);
    return (
      ultimoMensaje &&
      (ultimoMensaje[1] === "Nuevas estadisticas disponibles" || 
       ultimoMensaje[1] === "Invitación")
    );
  }
  

  // Función para registrar un partido
  const registrarPartido = async () => {
    let data2 = null;
    try {
      const res = await fetch('../api/users/crearPartido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        data2 = data;
        router.push(`/register-match/${data.partido.IdPartido}`);
      } else {
        setError('Error al registrar el partido');
      }
    } catch (error) {
      setError('Error en la solicitud');
      console.error('Error en la solicitud:', error);
    }
    //Vamos a añadir el partido al historial
    try {
      // Llamada a la función PUT del backend 
      console.log("Añadiendo partido al historial del usuario:", userID);
      console.log("Partido:", data2.partido.IdPartido);
      const response = await fetch("/api/users/usuarios", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          partidoID: data2.partido.IdPartido,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Partido añadido correctamente:", data);
      } else {
        console.error("Error al crear partido:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div
    className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-purple-600 to-purple-400 shadow-lg flex flex-col items-center py-6 rounded-r-3xl border-r-8 border-black transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    role="complementary" // Añadido para mejorar la accesibilidad y facilitar las pruebas
    >
      {/* Logo y título */}
      <div className="flex items-center mb-10 mr-2">
        <Image
          src="/images/logo.png"
          alt="DataHand Logo"
          width={80}
          height={80}
        />
        <h1 className="text-4xl font-bold text-white ml-5">DataHand </h1>
      </div>

      {/* Botones */}
      <div className="mt-6 w-full px-4">
      <Link href={`/profile/${userID}`}>
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3 mb-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Image
              src="/images/icon_profile.svg"
              alt="Perfil"
              width={30}
              height={30}
            />
            Perfil
          </button>
        </Link>

        <Link href={`/editProfile/${userID}`}>
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3 mb-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Image
              src="/images/icon_edit.svg"
              alt="Editar perfil"
              width={30}
              height={30}
            />
            Editar perfil
          </button>
        </Link>

        <Link href={`/chat/${userID}`}>
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-between gap-3 mb-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/icon_chat.svg"
                alt="Chat"
                width={30}
                height={30}
              />
              Chat
            </div>

            {/* Puntito verde condicional */}
            {tieneIndicador(usuario.historialNotificaciones) && (
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            )}
          </button>
        </Link>


        <>
    {/* Condicional para mostrar los botones solo si tipoUsuario es 'entrenador' */}
    {usuario.tipoUsuario === 'entrenador' && (
      <>
        <button
          onClick={registrarPartido}
          aria-label="Registrar partido"
          className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3 mb-4"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          <Image
            src="/images/icon_plus.svg"
            alt="Registrar partido"
            width={30}
            height={30}
          />
          Registrar partido
        </button>

        {error && <div className="text-red-500">{error}</div>} {/* Mensaje de error */}

        <Link href="/editTeam">
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3 mb-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Image
              src="/images/icon_shield.svg"
              alt="Equipo"
              width={30}
              height={30}
            />
            Organizar equipo
          </button>
        </Link>
      </>
          )}
  </>

        <button
          onClick={() => {
            // Eliminar el userID de localStorage
            localStorage.removeItem('userID');
            // Opcional: redirigir al usuario a la página de inicio si no usas <Link>
            window.location.href = "/";
          }}
          className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          <Image
            src="/images/icon_logout.svg"
            alt="Cerrar sesión"
            width={30}
            height={30}
          />
          Cerrar sesión
        </button>
      </div>

      {/* Botón de abrir/cerrar (icono flecha derecha) */}
      <div
        className="absolute top-1/2 -right-12 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <Image
          src="/images/icon_right_arrow.svg"
          alt="Toggle Sidebar"
          width={40}
          height={40}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} // Rotación para indicar abrir/cerrar
        />
      </div>
    </div>
  );
};

export default Sidebar;
