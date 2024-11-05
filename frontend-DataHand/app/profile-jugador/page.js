'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from '../components/Sidebar';
import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect y useState
import { useRouter } from 'next/navigation';

ChartJS.register(...registerables);

export default function Home() {

  const [switchOn, setSwitchOn] = useState(true); // Estado para el switch
  const router = useRouter();
  const showSwitch = true;
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar el usuario seleccionado

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);

    if (switchOn) {
      router.push('/profile-entrenador');
    }
  };

  const fetchUsuarios = async () => {
    try {
        const response = await fetch('../api/users/usuarios');
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        const usuariosData = await response.json();
        setUsuarios(usuariosData);

      //HABRA QUE CAMBIARLO PARA QUE SAQUE EL DE ID
      if (usuariosData.length > 0) {
        setUsuarioSeleccionado(usuariosData[0]); // Asigna el primer usuario 
      }        
    } catch (error) {
        console.error('Error:', error);
    }
};

  useEffect(() => {
    fetchUsuarios(); // Llama a la función al montar el componente
  }, []); 
  console.log(usuarioSeleccionado);

  const data = {
    labels: [
      'Goles',
      'Asistencias',
      'Efectividad',
      'Blocajes',
      'Recuperaciones',
    ],
    datasets: [
      {
        label: usuarioSeleccionado ? usuarioSeleccionado.nombreCompleto : 'Atleta A', // Cambia el label si hay un usuario seleccionado
        data: usuarioSeleccionado 
          ? [
              usuarioSeleccionado.atributos.goles,
              usuarioSeleccionado.atributos.asistencias,
              usuarioSeleccionado.atributos.efectividad,
              usuarioSeleccionado.atributos.blocajes,
              usuarioSeleccionado.atributos.recuperaciones,
            ]
          : [0, 0, 0, 0, 0], // Valores por defecto si no hay usuario seleccionado
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico de radar
  const options = {
    scales: {
      r: {
        min: 0, // Establece el valor mínimo en 0
        ticks: {
          stepSize: 2, // Espaciado entre ticks
        },
      },
    },
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-start bg-orange-500 overflow-auto">
      <Sidebar />
      <h1
        className="text-5xl font-bold mb-4 text-white"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        Perfil Jugador
      </h1>

       {/* Switch Button */}
       {showSwitch && (
        <button 
          onClick={toggleSwitch} 
          className={`mb-8 w-16 h-8 rounded-full ${switchOn ? 'bg-green-500' : 'bg-blue-500'} flex items-center p-1`}
        >
          <div
            className={`w-8 h-8 bg-white rounded-full transform transition-transform ${switchOn ? 'translate-x-8' : 'translate-x-0'} flex items-center justify-center`}
          >
            <span className="text-sm font-bold text-black">{switchOn ? 'J' : 'E'}</span>
          </div>
        </button>
      )}


      {/* Contenedor para los cuadrados grandes con borde redondeado */}
      <div className="flex justify-center gap-8 mb-12 flex-wrap">
        {/* Primer cuadrado con contenido */}
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex flex-col justify-between p-4">
          {/* Parte superior: Nombre y Nacionalidad */}
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-orange-500">{usuarioSeleccionado ? usuarioSeleccionado.nombreCompleto || '' : ''}</p>
            <p className="text-xl font-semibold text-orange-500">{usuarioSeleccionado ? usuarioSeleccionado.pais || '' : ''}</p>
          </div>

          {/* Imagen centrada */}
          <div className="flex justify-center items-center h-full">
            <Image
              src="/image/logo.png" // Cambiar este path
              alt="Imagen predefinida"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* Parte inferior: Nombre del equipo */}
          <div className="flex justify-center">
            <p className="text-2xl font-bold text-orange-500">{usuarioSeleccionado ? usuarioSeleccionado.club || '' : ''}</p>
          </div>
        </div>
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex items-center justify-center">
          <Radar data={data} options={options}/>
        </div>
      </div>

      {/* Rectángulo debajo de los cuadrados */}
      <div className="w-[85vw] max-w-[1048px] bg-gray-200 rounded-lg flex flex-col justify-center mb-12 p-4">
        {/* Fila de partidos */}
        {['Partido 1', 'Partido 2', 'Partido 3'].map((partido, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded"
          >
            <p className="text-2xl text-orange-500 font-semibold">{partido}</p>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
