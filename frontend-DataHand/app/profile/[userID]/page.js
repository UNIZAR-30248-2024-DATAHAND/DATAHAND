'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from '../../components/Sidebar';
import React, { useState, useEffect } from "react"; 
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


ChartJS.register(...registerables);

const obtenerUsuario = async (userID, setUsuario) => {
  try {
    console.log(`Solicitando usuario con userID: ${userID}`);
    const res = await fetch(`/api/users/usuarios?userID=${userID}`);  // `userID` como parámetro en la URL
    const data = await res.json();
    setUsuario(data);  // Suponiendo que setUsuario es una función para actualizar el estado
  } catch (error) {
    console.error('Error al obtener el usuario', error);
  }
};

const borrarPartido = async (userID, partidoID, setUsuario) => {
    try {
      // Hacer la solicitud DELETE al backend para eliminar el partido
      const res = await fetch(`/api/users/usuarios?userID=${userID}&partidoID=${partidoID}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        console.log(`Partido ${partidoID} eliminado exitosamente`);
        // Actualizar el historialPartidos en el estado del usuario después de la eliminación
        setUsuario((prevUsuario) => {
          const updatedUsuario = { ...prevUsuario };
          updatedUsuario.historialPartidos = updatedUsuario.historialPartidos.filter(partido => partido !== partidoID);
          return updatedUsuario; // Actualizar el estado con el nuevo historial
        });
      } else {
        console.error('Error al borrar el partido');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud DELETE', error);
    }
};

export default function Home() {
  const { userID } = useParams();
  const router = useRouter(); // Inicializamos useRouter

  const [usuario, setUsuario] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    contrasena: '',
    fechaNacimiento: '',
    tipoUsuario: '',  // 'entrenador' o 'jugador'
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

  const data = {
    labels: ['Goles', 'Asistencias', 'Efectividad', 'Blocajes', 'Recuperaciones'],
    datasets: [
      {
        data: usuario 
          ? [
              usuario.atributos.goles,
              usuario.atributos.asistencias,
              usuario.atributos.efectividad,
              usuario.atributos.blocajes,
              usuario.atributos.recuperaciones,
            ]
          : [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3, 
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', 
        pointBorderColor: '#fff', 
        pointBorderWidth: 2, 
        pointRadius: 6, 
        pointHoverRadius: 8, 
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: true,
          stepSize: 2,
        },
        angleLines: {
          display: true,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
          lineWidth: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        titleColor: 'white', 
        bodyColor: 'white', 
      },
      pointLabels: {
        font: {
          size: 40, 
          weight: 'bold',
          family: 'Arial', 
        },
        color: 'black', 
      },
    },
  };

  useEffect(() => {
    obtenerUsuario(userID, setUsuario);
  }, [userID]); // Asegúrate de que se recarguen los datos si el userID cambia

  const handleEditClick = (idPartido) => {
    // Redirige a la página de registro del partido correspondiente
    router.push(`/register-match/${idPartido}`);
  };

  const handleDeleteClick = (idPartido) => {
    // Mostrar la alerta de confirmación
    const confirmarEliminacion = window.confirm("¿Está seguro de querer eliminar este partido?");
    
    if (confirmarEliminacion) {
      // Si el usuario confirma, llamar a la función para borrar el partido
      borrarPartido(userID, idPartido, setUsuario);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden animate-gradient">
      <Sidebar />
      <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        {usuario.tipoUsuario === 'entrenador' ? 'Perfil Entrenador' : 'Perfil Jugador'}
      </h1>

      <div className="flex justify-center gap-8 mb-12 flex-wrap">
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <p className="text-3xl font-semibold text-orange-500">{usuario.nombreCompleto}</p>
            <p className="text-3xl font-semibold text-orange-500">{usuario.pais}</p>
          </div>

          <div className="flex justify-center items-center h-full">
            <Image
              src={usuario && usuario.fotoPerfil 
                ? usuario.fotoPerfil 
                : "https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-user-icon-isolated-on-abstract-background-png-image_1824979.jpg"}
              alt="Imagen del jugador"
              width={400}
              height={400}
              className="rounded-full"
            />
          </div>

          <div className="flex justify-center">
            <p className="text-3xl font-bold text-orange-500">{usuario.club}</p>
          </div>
        </div>

        <div className="w-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl p-4">
          <div className="flex justify-center">
            <h2 className="text-3xl font-semibold text-orange-500">Estadísticas</h2>
          </div>
          <div className="flex justify-center items-center">
            <Radar data={data} options={options} />
          </div>
        </div>
      </div>

      <div className="w-[85vw] max-w-[1048px] bg-gray-200 rounded-lg flex flex-col justify-center mb-12 p-4">
        {usuario.historialPartidos.map((idPartido, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded"
          >
            <p className="text-2xl text-orange-500 font-semibold">{idPartido}</p>
            <div className="flex gap-2">
              {usuario.tipoUsuario === 'entrenador' && (
                <>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditClick(idPartido)}
                    >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteClick(idPartido)}

                  >
                    Borrar
                  </button>
                </>
              )}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => actualizarEquipoVisitante(idPartido, 'MaulasFC')}
              >
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
