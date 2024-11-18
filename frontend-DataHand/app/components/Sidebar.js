'use client'; // Marca el componente como un Client Component

import { useState } from 'react';
import React from 'react'; // Este import será global en tus pruebas
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Formulario from './profileform'; // Asegúrate de que la ruta sea correcta


const Sidebar = ({ userID }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Función para registrar un partido
  const registrarPartido = async () => {
    try {
      const res = await fetch('../api/users/crearPartido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/register-match/${data.partido.IdPartido}`);
      } else {
        setError('Error al registrar el partido');
      }
    } catch (error) {
      setError('Error en la solicitud');
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-purple-600 to-purple-400 shadow-lg flex flex-col items-center py-6 rounded-r-3xl border-r-8 border-black transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
        <h1 className="text-3xl font-bold text-white ml-3">DataHand </h1>
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

        <button
          onClick={registrarPartido}
          aria-label="Registrar partido"  // Atributo de accesibilidad añadido
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

        <Link href="/stats">
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3 mb-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Image
              src="/images/icon_stats.svg"
              alt="Estadísticas"
              width={30}
              height={30}
            />
            Estadísticas
          </button>
        </Link>

        <Link href="/">
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-start gap-3"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Image
              src="/images/icon_logout.svg"
              alt="Salir"
              width={30}
              height={30}
            />
            Salir
          </button>
        </Link>
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
