'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css';
import LoadingPage from '../components/LoadingPage';


export default function EditarEquipo() {
  const [equipo, setEquipo] = useState();
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState(""); // Estado para manejar el error
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('No se encontró userID en localStorage.');
          return;
        }

        const response = await fetch(`/api/users/equipos?entrenador=${userID}`);
        if (!response.ok) {
          console.error('Error al cargar el equipo:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Equipos encontrados:', data);

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

  const seleccionarJugador = (equipoSeleccionado, index, tipo) => {
    // Si ya se ha seleccionado un jugador, hacer el intercambio
    if (seleccionado) {
      const equipoSeleccionadoNuevo = { ...equipo };
      let nuevoEstado = {};

      // Validación: No se puede intercambiar un portero por un jugador
      if (
        (seleccionado.tipo === "portero" && tipo === "jugador") || 
        (seleccionado.tipo === "jugador" && tipo === "portero")
      ) {
        setError("No puedes intercambiar un portero por un jugador.");
        return; // Evita hacer el intercambio si los tipos no son compatibles
      } else {
        setError(""); // Resetea el error si el tipo es válido
      }

      // Intercambio de jugadores
      if (tipo === "jugador" && seleccionado.tipo === "jugador") {
        const nuevosJugadores = [...equipoSeleccionadoNuevo.jugadores];
        [nuevosJugadores[seleccionado.index], nuevosJugadores[index]] = [nuevosJugadores[index], nuevosJugadores[seleccionado.index]];
        nuevoEstado = { ...equipoSeleccionadoNuevo, jugadores: nuevosJugadores };
      }
      // Intercambio de porteros
      else if (tipo === "portero" && seleccionado.tipo === "portero") {
        const nuevosPorteros = [...equipoSeleccionadoNuevo.porteros];
        [nuevosPorteros[seleccionado.index], nuevosPorteros[index]] = [nuevosPorteros[index], nuevosPorteros[seleccionado.index]];
        nuevoEstado = { ...equipoSeleccionadoNuevo, porteros: nuevosPorteros };
      }
      // Intercambio de banquillo
      else if (tipo === "banquillo" && seleccionado.tipo === "banquillo") {
        const nuevoBanquillo = [...equipoSeleccionadoNuevo.banquillo];
        [nuevoBanquillo[seleccionado.index], nuevoBanquillo[index]] = [nuevoBanquillo[index], nuevoBanquillo[seleccionado.index]];
        nuevoEstado = { ...equipoSeleccionadoNuevo, banquillo: nuevoBanquillo };
      }
      // Intercambio entre tipos diferentes (jugador <-> banquillo o portero)
      else if ((tipo === "jugador" && seleccionado.tipo === "banquillo") || (tipo === "banquillo" && seleccionado.tipo === "jugador")) {
        const nuevosJugadores = [...equipoSeleccionadoNuevo.jugadores];
        const nuevoBanquillo = [...equipoSeleccionadoNuevo.banquillo];
        [nuevoBanquillo[seleccionado.index], nuevosJugadores[index]] = [nuevosJugadores[index], nuevoBanquillo[seleccionado.index]];
        nuevoEstado = { ...equipoSeleccionadoNuevo, jugadores: nuevosJugadores, banquillo: nuevoBanquillo };
      }
      else if ((tipo === "portero" && seleccionado.tipo === "banquillo") || (tipo === "banquillo" && seleccionado.tipo === "portero")) {
        const nuevosPorteros = [...equipoSeleccionadoNuevo.porteros];
        const nuevoBanquillo = [...equipoSeleccionadoNuevo.banquillo];
        [nuevoBanquillo[seleccionado.index], nuevosPorteros[index]] = [nuevosPorteros[index], nuevoBanquillo[seleccionado.index]];
        nuevoEstado = { ...equipoSeleccionadoNuevo, porteros: nuevosPorteros, banquillo: nuevoBanquillo };
      }

      // Actualiza el estado del equipo
      setEquipo(nuevoEstado);
      // Resetea la selección
      setSeleccionado(null);

      // Guardar los cambios en la base de datos
      guardarCambiosEnBaseDeDatos(nuevoEstado);
    } else {
      // Si no hay selección previa, selecciona el nuevo jugador
      setSeleccionado({ equipo: equipoSeleccionado, index, tipo });
    }
  };

  const guardarCambiosEnBaseDeDatos = async (equipoActualizado) => {
    try {
      const response = await fetch(`/api/users/equipos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipoActualizado), // Enviar el estado actualizado del equipo
      });

      if (!response.ok) {
        console.error('Error al guardar los cambios:', response.statusText);
      } else {
        console.log('Cambios guardados exitosamente.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud PUT:', error);
    }
  };

  if (!equipo) {
    return (
      <div className="main">
        <div className="up">
          <div className="loaders">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </div>
          <div className="loadersB">
            <div className="loaderA">
              <div className="ball0"></div>
            </div>
            <div className="loaderA">
              <div className="ball1"></div>
            </div>
            <div className="loaderA">
              <div className="ball2"></div>
            </div>
            <div className="loaderA">
              <div className="ball3"></div>
            </div>
            <div className="loaderA">
              <div className="ball4"></div>
            </div>
            <div className="loaderA">
              <div className="ball5"></div>
            </div>
            <div className="loaderA">
              <div className="ball6"></div>
            </div>
            <div className="loaderA">
              <div className="ball7"></div>
            </div>
            <div className="loaderA">
              <div className="ball8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }  

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden animate-gradient p-4 background-imageEE">
      {/* Sidebar */}
      <Sidebar userID={userID} />
      
      <div className="w-full max-w-4xl flex flex-col items-center mt-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center titulo-personalizado">
          EDITAR EQUIPO
        </h1>
        
        {/* Nombre y Foto del Equipo */}
        <div className="flex flex-col items-center mt-6 mb-4 mt-6">
          {equipo.imagen ? (
            <img src={equipo.imagen} alt={`Logo de ${equipo.nombre}`} className="w-32 h-32 object-cover rounded-full mb-2" />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-2 flex items-center justify-center">
              <span className="text-white">Sin Imagen</span>
            </div>
          )}
          <h1 className="text-2xl font-semibold text-white">{equipo.nombre}</h1>
        </div>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-lg mt-4">{error}</div>} Mostrar error si hay uno

      {/* Sección Porteros */}
      <div className="mt-10 mr-10">
        <h2 className="text-md sm:text-lg font-semibold text-white mb-2">Porteros</h2>        
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={() => seleccionarJugador("local", 0, "portero")}
            className={`${
              seleccionado?.equipo === "local" && seleccionado?.index === 0 && seleccionado?.tipo === "portero"
                ? "bg-red-500"
                : "bg-blue-500"
            } text-white px-3 py-2 rounded-lg`}
          >
            {equipo.porteros[0]}
          </button>
        </div>
      </div>

      {/* Sección Jugadores */}
      <div className="mt-4">
        <h2 className="text-md sm:text-lg font-semibold text-white mb-2">Jugadores</h2>
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
                {jugador}
              </button>
            ))
          ) : (
            <p>No hay jugadores disponibles</p>
          )}
        </div>

        {/* Sección Banquillo */}
        <h2 className="text-md sm:text-lg font-semibold text-white mt-4 mb-2 text-left">Banquillo Local</h2>
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
                {jugador}
              </button>
            ))
          ) : (
            <p>No hay jugadores disponibles</p>
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
            {equipo.porteros[1]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
