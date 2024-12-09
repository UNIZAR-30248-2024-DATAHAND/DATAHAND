'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from '../../components/Sidebar';
import React, { useState, useEffect } from "react"; 
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { contarGoles, contarLanzamientosTotal, contarPerdidasDeBalon, sacarAsistencias, sacarBlocajes}  from '../../utils/calculosEstadistica'; 
import '../../styles/styles.css';
import ConfirmModal from '../../components/ConfirmModal'; // Importa la modal
import styles3 from '../../styles/Button3.module.css';  // Ajusta la ruta según sea necesario
// import anime from 'animejs';

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

const obtenerEventos = async (idPartido) => {
  try {
      const url = idPartido
          ? `../../api/users/eventos?idPartido=${idPartido}`
          : `../../api/users/eventos`;
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (res.ok) {
          const data = await res.json();
          console.log('Total de eventos:', data.totalEventos);
          console.log('Datos eventos:', data.eventos);
          return data.eventos;
      } else {
          console.error('Error al obtener los eventos');
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }
};

export default function Home() {
  //const userID = localStorage.getItem('userID');
  const { userID } = useParams();
  const router = useRouter(); // Inicializamos useRouter
  const [partidosProcesados, setPartidosProcesados] = useState(false);

  const procesarPartidos = async (historialPartidos) => {
    try {
      let goles = 0;
      let asistencias = 0;
      let blocajes = 0;
      let efectividad = 0;
      let recuperaciones = 0;

      const totalPartidos = historialPartidos.length;
      //console.log('Procesando partidos:', historialPartidos);
      for (const idPartido of historialPartidos) {
        // Obtener eventos de cada partido
        const eventos = await obtenerEventos(idPartido);
  
        if (eventos) {
          goles = goles + contarGoles(eventos, "local");
          asistencias = asistencias + sacarAsistencias(eventos, "local");
          efectividad = efectividad +contarLanzamientosTotal(eventos, "local");
          blocajes = blocajes + sacarBlocajes(eventos, "local");
          recuperaciones = recuperaciones + contarPerdidasDeBalon(eventos, "local");
        };
      }
      const formatToTwoDecimals = (value) => parseFloat(value.toFixed(2)); // Formateador reutilizable
      efectividad = formatToTwoDecimals(100 *(goles/efectividad));
      // Guardar los resultados del partido actual
      goles = formatToTwoDecimals(goles/totalPartidos);
      asistencias = formatToTwoDecimals(asistencias/totalPartidos);
      blocajes = formatToTwoDecimals(blocajes/totalPartidos);
      recuperaciones = formatToTwoDecimals(recuperaciones/totalPartidos);
      efectividad = formatToTwoDecimals(efectividad/totalPartidos);

      try {
        // Enviar una notificación a cada jugador
          const response = await fetch("/api/users/usuarios", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userID,
              goles: goles,
              asistencias: asistencias,
              efectividad: efectividad,
              blocajes: blocajes,
              recuperaciones: recuperaciones,
            }),
          });
  
          if (response.ok) {
            console.log(`Atributos modificados de : ${userID}`);
          } else {
            console.error(`Error al modificar atributos de ${userID}`);
          }
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    } catch (error) {
      console.error("Error al procesar los partidos:", error);
      return [];
    }
  };


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
    historialNotifiaciones: [],
  });

  const [data, setData] = useState({
    labels: ['Goles', 'Asistencias', 'Efectividad', 'Blocajes', 'Recuperaciones'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0], // Valores iniciales
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
  });
  

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idPartidoAEliminar, setIdPartidoAEliminar] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      await obtenerUsuario(userID, setUsuario); // Espera a que termine
      setPartidosProcesados(true); // Luego actualiza el estado
    };
  
    if (userID) {
      cargarUsuario(); // Llamar a la función asíncrona
    }
  }, [userID]); // Se ejecuta cuando userID cambia

  useEffect(() => {
    console.log('Procesando partidos...');
    procesarPartidos(usuario.historialPartidos);
  }, [partidosProcesados]); // Asegúrate de que se recarguen los datos si el userID cambia

  useEffect(() => {
    if (partidosProcesados && usuario && usuario.atributos) {
      setData({
        labels: ['Goles', 'Asistencias', 'Efectividad', 'Blocajes', 'Recuperaciones'],
        datasets: [
          {
            data: [
              usuario.atributos.goles || 0,
              usuario.atributos.asistencias || 0,
              usuario.atributos.efectividad/10 || 0,
              usuario.atributos.blocajes || 0,
              usuario.atributos.recuperaciones || 0,
            ],
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
      });
    }
  }, [usuario, partidosProcesados]);
  

  const handleEditClick = (idPartido) => {
    // Redirige a la página de registro del partido correspondiente
    router.push(`/register-match/${idPartido}`);
  };

  const handleViewClick = (idPartido) => {
    // Redirige a la página de registro del partido correspondiente
    router.push(`/statsGen/${idPartido}`);
  };

  const handleDeleteClick = (idPartido) => {
    setIdPartidoAEliminar(idPartido);
    setIsModalOpen(true); // Abre la modal
  };

  const handleConfirmDelete = () => {
    if (idPartidoAEliminar) {
      borrarPartido(userID, idPartidoAEliminar, setUsuario);
      setIsModalOpen(false); // Cierra la modal después de la eliminación
    }
  };

  return (
    <div 
      className={`relative flex flex-col items-center justify-start min-h-screen overflow-hidden animate-gradient overflow-y-auto 
        ${usuario.tipoUsuario === 'entrenador' ? 'background-imageE' : 'background-imageJ'}`}
    >
      <Sidebar userID={userID} />

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Cierra la modal al cancelar
        onConfirm={handleConfirmDelete} // Llama a la función para eliminar el partido
      />

      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white mt-6 titulo-personalizado">
        <span className="text-wrapper">
          <span className="letters">
            {usuario.tipoUsuario === 'entrenador' ? 'PERFIL ENTRENADOR' : 'PERFIL JUGADOR'}
          </span>
        </span>
      </h1>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>

      <div className="flex flex-wrap justify-center gap-8 mb-12 mt-4">
        <div className="w-full sm:w-[40vw] sm:max-w-[500px] sm:h-[40vw] sm:max-h-[500px] bg-white rounded-2xl flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <p className="text-[4vw] sm:text-2xl font-semibold text-orange-500">{usuario.nombreCompleto}</p>
            <p className="text-[4vw] sm:text-2xl font-semibold text-orange-500">{usuario.pais}</p>
          </div>

          <div className="flex justify-center items-center h-full">
            <Image
              src={usuario && usuario.fotoPerfil 
                ? usuario.fotoPerfil 
                : "https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-user-icon-isolated-on-abstract-background-png-image_1824979.jpg"}
              alt="Imagen del jugador"
              width={200}  // Usamos un ancho máximo pero ajustable
              height={200} // Usamos un alto máximo pero ajustable
              className="rounded-full w-[40vw] sm:w-[200px] h-[40vw] sm:h-[200px]"  // La imagen se adapta al tamaño de la ventana
            />
          </div>

          <div className="flex justify-center">
            <p className="text-[4vw] sm:text-2xl font-bold text-orange-500">{usuario.club}</p>
          </div>
        </div>

        <div className="w-full sm:w-[40vw] sm:max-w-[500px] sm:max-h-[500px] bg-white rounded-2xl p-4">
          <div className="flex justify-center">
            <h2 className="text-[4vw] sm:text-2xl font-semibold text-orange-500">Media de estadísticas por partido</h2>
          </div>
          <div className="flex justify-center items-center">
            <Radar data={data} options={options} />
          </div>
        </div>
      </div>


  
      <div className="w-full sm:w-[85vw] sm:max-w-[1048px] bg-gray-200 rounded-lg flex flex-col justify-center mb-12 p-4">
        {usuario.historialPartidos.map((idPartido, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded"
          >
            <p className="text-xl sm:text-2xl text-orange-500 font-semibold">{idPartido}</p>
            <div className="flex gap-2">
              {usuario.tipoUsuario === 'entrenador' && (
                <>
                  <button
                    className={`${styles3.button3} px-4 py-2 rounded active:bg-blue-700`}
                    onClick={() => handleEditClick(idPartido)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles3.button2} px-4 py-2 rounded active:bg-red-700`}
                    onClick={() => handleDeleteClick(idPartido)}
                  >
                    Borrar
                  </button>

                </>
              )}
              <button
                className={`${styles3.button1} px-4 py-2 rounded active:bg-green-700`}
                onClick={() => handleViewClick(idPartido)}
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
