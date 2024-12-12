// components/jugadores.js
import { Tabs } from "@radix-ui/react-tabs";
import { useState , useEffect} from "react";
import {obtenerResultadoIntervaloJugador, obtenerAccionIntervaloJugador, obtenerSuspensionIntervaloJugador, 
  obtenerResultado7MIntervaloJugador, obtenerAsistenciaIntervaloJugador, obtenerResultadoTotalJugador, obtenerSuspensionJugador,
    obtenerAsistenciaTotalJugador, obtenerJugadoresEquipo, obtenerPorterosEquipo, obtenerResultadoIntervaloPortero, obtenerResultadoTotalPortero}  from '../utils/calculosEstadistica'; 

// Componente funcional Jugadores que presenta información sobre un equipo de balonmano.
// Muestra un encabezado con el nombre del equipo y una leyenda que describe diferentes estadísticas del juego,
// cada una representada con un círculo de color y su respectiva descripción.
// A continuación, se presenta una tabla que muestra las estadísticas de los jugadores y porteros,
// organizando los datos en columnas que representan el rendimiento a lo largo del tiempo y diversas métricas.
// Este componente es útil para visualizar el desempeño de los jugadores en un formato claro y accesible.

//Intervalos de tiempo 
/*
[
  { inicio: 0, fin: 600 },
  { inicio: 600, fin: 1200 },
  { inicio: 1200, fin: 1800 },
  { inicio: 1800, fin: 2400 },
  { inicio: 2400, fin: 3000 }, 
  { inicio: 3000, fin: 3600 }
]
*/

// Función para obtener los datos de usuario desde el backend
const obtenerUsuario = async (userID) => {
  try {
      const res = await fetch(`/api/users/usuarios?userID=${userID}`);
      const data = await res.json();
      return data; // Devuelve los datos del usuario
  } catch (error) {
      console.error('Error al obtener el usuario', error);
      return null; // En caso de error, devuelve null
  }
};

export default function Jugadores({dataEventos, dataEquipos}) {

  const jugadoresTotales= obtenerJugadoresEquipo(dataEventos,"local");
  const porterosTotales = obtenerPorterosEquipo(dataEventos, "visitante").filter(portero => portero !== undefined);

  const [nombresJugadores, setNombresJugadores] = useState([]);
  const [nombresPorteros, setNombresPorteros] = useState([]);

  useEffect(() => {
    // Función para obtener y actualizar nombres de jugadores
    const actualizarNombres = async (ids, setNombres) => {
        try {
            const nombresActualizados = await Promise.all(
                ids.map(async (id) => {
                    console.log('ID:', id);
                    const usuario = await obtenerUsuario(id);
                    return {
                        id,
                        nombre: usuario?.nombreCompleto || `Jugador ${id}`, // Nombre real o temporal
                    };
                })
            );
            console.log('Nombres actualizados:', nombresActualizados);
            setNombres(nombresActualizados); // Actualiza el estado con los nombres
        } catch (error) {
            console.error('Error al actualizar los nombres:', error);
        }
    };

    // Actualizar nombres de jugadores y porteros
    if (jugadoresTotales) {
        actualizarNombres(jugadoresTotales, setNombresJugadores);
    }
    if (porterosTotales) {
        actualizarNombres(porterosTotales, setNombresPorteros);
    }
}, []);

  const calcularEstadisticasJugador = (inicio, fin, jugador) => {
    const susJug = obtenerSuspensionIntervaloJugador(dataEventos, "2 Minutos", inicio, fin, jugador, "local");
    const gol7M = obtenerResultado7MIntervaloJugador(dataEventos, "Gol", inicio, fin, jugador, "\"7M\"", "local");
    const fallo7M = obtenerResultado7MIntervaloJugador(dataEventos, "Palo/Fuera", inicio, fin, jugador, "\"7M\"", "local") + 
                    obtenerResultado7MIntervaloJugador(dataEventos, "Parada", inicio, fin, jugador, "\"7M\"", "local");
    const asisJug = obtenerAsistenciaIntervaloJugador(dataEventos, inicio, fin, jugador, "local");
    const golJug = obtenerResultadoIntervaloJugador(dataEventos, "Gol", inicio, fin, jugador, "local");
    const falloJug = obtenerResultadoIntervaloJugador(dataEventos, "Palo/Fuera", inicio, fin, jugador, "local") + 
                     obtenerResultadoIntervaloJugador(dataEventos, "Parada", inicio, fin, jugador, "local");
    const perJug = obtenerResultadoIntervaloJugador(dataEventos, "Perdida de balon", inicio, fin, jugador, "local");
    const bloqJug = obtenerAccionIntervaloJugador(dataEventos, "Lanzamiento bloqueado", inicio, fin, jugador, "local");

    const estadisticasJSX = (
        <div className="flex flex-wrap gap-1">
          {/* Suspensiones */}
          {Array.from({ length: susJug }).map((_, index) => (
            <div key={`suspension-${index}`} className="w-4 h-4 rounded-full border-2 border-red-500"></div>
          ))}
          {/* Goles 7m */}
          {Array.from({ length: gol7M }).map((_, index) => (
            <div key={`gol-7m-${index}`} className="w-4 h-4 rounded-full bg-green-300"></div>
          ))}
          {/* Asistencias */}
          {Array.from({ length: asisJug }).map((_, index) => (
            <div key={`asistencia-${index}`} className="w-4 h-4 rounded-full bg-green-500"></div>
          ))}
          {/* Goles */}
          {Array.from({ length: golJug }).map((_, index) => (
            <div key={`gol-${index}`} className="w-4 h-4 rounded-full bg-green-600"></div>
          ))}
          {/* Fallos */}  
          {Array.from({ length: falloJug }).map((_, index) => (
            <div key={`fallo-${index}`} className="w-4 h-4 rounded-full bg-purple-300"></div>
          ))}
          {/* Fallos 7M */}
          {Array.from({ length: fallo7M }).map((_, index) => (
            <div key={`fallo-7m-${index}`} className="w-4 h-4 rounded-full bg-purple-400"></div>
          ))}
          {/* Perdidas */}
          {Array.from({ length: perJug }).map((_, index) => (
            <div key={`perdida-${index}`} className="w-4 h-4 rounded-full bg-purple-500"></div>
          ))}
          {/* Bloqueos */}
          {Array.from({ length: bloqJug }).map((_, index) => (
            <div key={`bloqueo-${index}`} className="w-4 h-4 rounded-full border-2 border-black"></div>
          ))}
        </div>
    );
    return estadisticasJSX;
};

const calcularEstadisticasPortero = (inicio, fin, jugador) => {
  const susJug = obtenerSuspensionIntervaloJugador(dataEventos, "2 Minutos", inicio, fin, jugador, "local");
  const gol7M = obtenerResultado7MIntervaloJugador(dataEventos, "Gol", inicio, fin, jugador, "\"7M\"", "local");
  const fallo7M = obtenerResultado7MIntervaloJugador(dataEventos, "Palo/Fuera", inicio, fin, jugador, "\"7M\"", "local") + 
                  obtenerResultado7MIntervaloJugador(dataEventos, "Parada", inicio, fin, jugador, "\"7M\"", "local");
  const asisJug = obtenerAsistenciaIntervaloJugador(dataEventos, inicio, fin, jugador, "local");
  const golJug = obtenerResultadoIntervaloJugador(dataEventos, "Gol", inicio, fin, jugador, "local");
  const falloJug = obtenerResultadoIntervaloJugador(dataEventos, "Palo/Fuera", inicio, fin, jugador, "local") + 
                   obtenerResultadoIntervaloJugador(dataEventos, "Parada", inicio, fin, jugador, "local");
  const perJug = obtenerResultadoIntervaloJugador(dataEventos, "Perdida de balon", inicio, fin, jugador, "local");
  const bloqJug = obtenerAccionIntervaloJugador(dataEventos, "Lanzamiento bloqueado", inicio, fin, jugador, "local");
  const parPor = obtenerResultadoIntervaloPortero(dataEventos, "Parada", inicio, fin, jugador, "visitante");
  const fuePor = obtenerResultadoIntervaloPortero(dataEventos, "Palo/Fuera", inicio, fin, jugador, "visitante");
  const golPor = obtenerResultadoIntervaloPortero(dataEventos, "Gol", inicio, fin, jugador, "visitante");

  const estadisticasJSX = (
      <div className="flex flex-wrap gap-1">
        {/* Suspensiones */}
        {Array.from({ length: susJug }).map((_, index) => (
          <div key={`suspension-${index}`} className="w-4 h-4 rounded-full border-2 border-red-500"></div>
        ))}
        {/* Goles 7m */}
        {Array.from({ length: gol7M }).map((_, index) => (
          <div key={`gol-7m-${index}`} className="w-4 h-4 rounded-full bg-green-300"></div>
        ))}
        {/* Asistencias */}
        {Array.from({ length: asisJug }).map((_, index) => (
          <div key={`asistencia-${index}`} className="w-4 h-4 rounded-full bg-green-500"></div>
        ))}
        {/* Goles */}
        {Array.from({ length: golJug }).map((_, index) => (
          <div key={`gol-${index}`} className="w-4 h-4 rounded-full bg-green-600"></div>
        ))}
        {/* Fallos */}  
        {Array.from({ length: falloJug }).map((_, index) => (
          <div key={`fallo-${index}`} className="w-4 h-4 rounded-full bg-purple-300"></div>
        ))}
        {/* Fallos 7M */}
        {Array.from({ length: fallo7M }).map((_, index) => (
          <div key={`fallo-7m-${index}`} className="w-4 h-4 rounded-full bg-purple-400"></div>
        ))}
        {/* Perdidas */}
        {Array.from({ length: perJug }).map((_, index) => (
          <div key={`perdida-${index}`} className="w-4 h-4 rounded-full bg-purple-500"></div>
        ))}
        {/* Bloqueos */}
        {Array.from({ length: bloqJug }).map((_, index) => (
          <div key={`bloqueo-${index}`} className="w-4 h-4 rounded-full border-2 border-black"></div>
        ))}
        {/* Paradas */}
        {Array.from({ length: parPor }).map((_, index) => (
          <div key={`parada-${index}`} className="w-4 h-4 rounded-full bg-blue-800"></div>
        ))}
        {/* Goles Por */}
        {Array.from({ length: golPor }).map((_, index) => (
          <div key={`gol-por-${index}`} className="w-4 h-4 rounded-full bg-red-900"></div>
        ))}
        {/* Fallos Por */}
        {Array.from({ length: fuePor }).map((_, index) => (
          <div key={`fallo-por-${index}`} className="w-4 h-4 rounded-full bg-red-600"></div>
        ))}
      </div>
  );
  return estadisticasJSX;
};


  return (
    <div className="w-full bg-white" style={{ height: 'calc(70vh - 50px)' }}>
      {/* Team Header */}
      <div className="bg-[#45b6e5] text-white text-center py-2 font-bold">
        {dataEquipos.EquipoLocal}
      </div>

      {/* Legend */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-6 justify-center text-xs">
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 border-red-500"></div>
            <span>2 Minutes Suspension</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-300"></div>
            <span>7m Goal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Assist</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span>Goal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-red-900"></div>
            <span>Goalkeeper Goal Received</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span>Goalkeeper No Goal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-blue-800"></div>
            <span>Goalkeeper Parade</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span>LostBall + Technical Mistake</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-purple-400"></div>
            <span>No Goal 7m Parade + Out</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-purple-300"></div>
            <span>No Goal Parade + Out</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full border-2 border-black"></div>
            <span>Shot Blocked</span>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0.5">
          <thead className="bg-[#e6f7ff]">
            <tr>
              <th className="px-2 py-2 border border-gray-300">Players</th>
              <th className="px-2 py-2 border border-gray-300">10 min</th>
              <th className="px-2 py-2 border border-gray-300">20 min</th>
              <th className="px-2 py-2 border border-gray-300">25 min</th>
              <th className="px-2 py-2 border border-gray-300">30 min</th>
              <th className="px-2 py-2 border border-gray-300">40 min</th>
              <th className="px-2 py-2 border border-gray-300">50 min</th>
              <th className="px-2 py-2 border border-gray-300">55 min</th>
              <th className="px-2 py-2 border border-gray-300">60 min</th>
              <th className="px-2 py-2 border border-gray-300">SHO %</th>
              <th className="px-2 py-2 border border-gray-300">2m</th>
              <th className="px-2 py-2 border border-gray-300">A</th>
            </tr>
          </thead>
          <tbody>
            {/* Field Players */}
            {jugadoresTotales.map((idJugador, index) => (
              <tr className="border-b" key={idJugador}>
                <td className="px-2 py-2 border border-gray-300">
                  <div className="flex gap-2">
                    <span>{nombresJugadores[index]?.nombre}</span>
                  </div>
                </td>
                {/* Celdas vacías o con contenido dinámico según los datos */}
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(0,600,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(600,1200,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(1200,1500,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(1500,1800,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(1800,2400,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(2400,3000,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(3000,3300,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador(3300,3600,idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerResultadoTotalJugador(dataEventos, "Gol", idJugador, "local")}/{obtenerResultadoTotalJugador(dataEventos, "Parada", idJugador, "local")+obtenerResultadoTotalJugador(dataEventos, "Palo/Fuera", idJugador, "local")+obtenerResultadoTotalJugador(dataEventos, "Gol", idJugador, "local")}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerSuspensionJugador(dataEventos, "2 Minutos", idJugador)}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerAsistenciaTotalJugador(dataEventos, idJugador, "local")}</td>
              </tr>
            ))}
          </tbody>
          {/* Goalkeepers Section */}
          <tbody className="bg-[#e6f7ff]">
            <tr>
              <td colSpan={16} className="px-2 py-2 font-bold border border-gray-300">Goalkeepers</td>
            </tr>
            {/* Add goalkeeper rows following the same pattern */}
            {porterosTotales.map((idPortero, index) => (
              <tr className="border-b" key={idPortero}>
                <td className="px-2 py-2 border border-gray-300">
                  <div className="flex gap-2">
                    <span>{nombresPorteros[index]?.nombre}</span>
                  </div>
                </td>
                {/* Celdas vacías o con contenido dinámico según los datos */}
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(0,600,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(600,1200,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(1200,1500,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(1500,1800,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(1800,2400,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(2400,3000,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(3000,3300,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasPortero(3300,3600,idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerResultadoTotalPortero(dataEventos,"Parada",idPortero,"visitante")}/{obtenerResultadoTotalPortero(dataEventos,"Parada",idPortero,"visitante")+obtenerResultadoTotalPortero(dataEventos,"Palo/Fuera",idPortero,"visitante")+obtenerResultadoTotalPortero(dataEventos,"Gol",idPortero,"visitante")}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerSuspensionJugador(dataEventos, "2 Minutos", idPortero)}</td>
                <td className="px-2 py-2 border border-gray-300">{obtenerAsistenciaTotalJugador(dataEventos, idPortero, "local")}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
