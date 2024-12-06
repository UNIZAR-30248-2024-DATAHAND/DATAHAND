'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function EditarEquipo() {
  const [equipo, setEquipo] = useState();
  const [seleccionado, setSeleccionado] = useState(null);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        // Recupera el userID almacenado en localStorage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('No se encontró userID en localStorage.');
          return;
        }
  
        // Realiza la consulta a la API con el userID
        const response = await fetch(`/api/users/equipos?entrenador=${userID}`);
        if (!response.ok) {
          console.error('Error al cargar el equipo:', response.statusText);
          return;
        }
  
        const data = await response.json();
        console.log('Equipos encontrados:', data);
  
        // Filtra el equipo correspondiente al userID
        const equipoDelEntrenador = data.find((equipo) => equipo.entrenador === userID);
        if (equipoDelEntrenador) {
          setEquipo(equipoDelEntrenador);
        } else {
          console.error('No se encontró un equipo para el entrenador especificado.');
        }
      } catch (error) {
        console.error('Error al obtener el equipo:', error);
      }
    };
  
    fetchEquipo();
  }, []);
  

  if (!equipo) {
    return <p>Cargando equipo...</p>;
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden animate-gradient p-4">
      {/* Sidebar */}
      <Sidebar userID={userID} />
      
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Editar Equipo
        </h1>
        
        {/* Nombre y Foto del Equipo */}
        <div className="flex flex-col items-center mt-6 mb-4">
          {/* Aquí se muestra la foto del equipo si existe */}
          {equipo.imagen ? (
            <img src={equipo.imagen} alt={`Logo de ${equipo.nombre}`} className="w-32 h-32 object-cover rounded-full mb-2" />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-2 flex items-center justify-center">
              <span className="text-white">Sin Imagen</span>
            </div>
          )}
          {/* Nombre del Equipo */}
          <h1 className="text-2xl font-semibold text-white">{equipo.nombre}</h1>
        </div>
      </div>

      {/* Sección Porteros */}
      <div className="mt-4">
        <h2 className="text-md sm:text-lg font-semibold text-black mb-2">Porteros</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={() => seleccionarJugador("local", 0, "portero")}
            className={`${
              seleccionado?.equipo === "local" && seleccionado?.index === 0 && seleccionado?.tipo === "portero"
                ? "bg-red-500"
                : "bg-blue-500"
            } text-white px-3 py-2 rounded-lg`}
          >
            Portero {equipo.porteros[0]}
          </button>
        </div>
      </div>

      {/* Sección Jugadores */}
      <div className="mt-4">
        <h2 className="text-md sm:text-lg font-semibold text-black mb-2">Jugadores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {equipo.jugadores && equipo.jugadores.length > 0 ? (
            equipo.jugadores.map((jugador, index) => (
              <button
                key={index}
                onClick={() => seleccionarJugador("local", index, "jugador")}
                className={`${
                  seleccionado?.equipo === "local" && seleccionado?.index === index && seleccionado?.tipo === "jugador"
                    ? "bg-red-500"
                    : "bg-green-500"
                } text-white px-3 py-2 rounded-lg`}
              >
                Jugador {jugador}
              </button>
            ))
          ) : (
            <p>No hay jugadores disponibles</p>
          )}
        </div>

        {/* Sección Banquillo */}
        <h2 className="text-md sm:text-lg font-semibold text-black mt-4 mb-2 text-left">Banquillo Local</h2> {/* Alineado a la izquierda */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {equipo.banquillo && equipo.banquillo.length > 0 ? (
            equipo.banquillo.map((jugador, index) => (
              <button
                key={index}
                onClick={() => seleccionarJugador("local", index, "banquillo")}
                className={`${
                  seleccionado?.equipo === "local" && seleccionado?.index === index && seleccionado?.tipo === "banquillo"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                } text-white px-3 py-2 rounded-lg`}
              >
                Jugador {jugador}
              </button>
            ))
          ) : (
            <p>No hay jugadores en el banquillo</p>
          )}

          {/* Segundo portero */}
          {equipo.porteros && equipo.porteros.length > 1 && (
            <button
              onClick={() => seleccionarJugador("local", 1, "portero")}
              className={`${
                seleccionado?.equipo === "local" && seleccionado?.index === 1 && seleccionado?.tipo === "portero"
                  ? "bg-red-500"
                  : "bg-blue-500"
              } text-white px-3 py-2 rounded-lg`}
            >
              Portero {equipo.porteros[1]} {/* Muestra el segundo portero */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
