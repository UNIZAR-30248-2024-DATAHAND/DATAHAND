'use client';

import { useEffect, useState } from 'react';

export default function EditarEquipo() {
  const [equipo, setEquipo] = useState();
  const [seleccionado, setSeleccionado] = useState(null);

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
    <div className="p-5">

        {/* Sección Porteros */}
        <div className="mt-4">
        <h2 className="text-md sm:text-lg font-semibold text-black mb-2">Porteros</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {equipo.porteros && equipo.porteros.length > 0 ? (
            <button
                onClick={() => seleccionarJugador("local", index, "portero")}
                className={`${
                seleccionado?.equipo === "local" && seleccionado?.index === 0 && seleccionado?.tipo === "portero"
                    ? "bg-red-500"
                    : "bg-blue-500"
                } text-white px-3 py-2 rounded-lg`}
            >
                Portero {equipo.porteros[0]} {/* Muestra solo el primer portero */}
            </button>
            ) : (
            <p>No hay porteros disponibles</p>
            )}
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
        <h2 className="text-md sm:text-lg font-semibold text-black mt-4 mb-2">Banquillo Local</h2>
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
