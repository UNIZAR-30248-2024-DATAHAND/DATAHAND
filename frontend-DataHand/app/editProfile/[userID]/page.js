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
  const userID = localStorage.getItem('userID');
  const router = useRouter();

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
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden animate-gradient p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1
          className="text-3xl md:text-5xl font-bold mb-4 text-white text-center"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {usuario.tipoUsuario === 'entrenador'
            ? 'Editar Perfil Entrenador'
            : 'Editar Perfil Jugador'}
        </h1>
  
        {/* Formulario de edición de perfil */}
        <div className="w-full px-4 md:px-8">
          <ProfileForm userData={usuario} setUserData={setUsuario} />
        </div>
      </div>
      <Sidebar userID={userID} />
    </div>
  );  
}
