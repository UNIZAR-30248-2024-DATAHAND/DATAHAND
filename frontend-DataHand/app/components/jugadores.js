// components/jugadores.js
import { Tabs } from "@radix-ui/react-tabs";
import { obtenerJugadores, obtenerResultadoIntervaloJugador, obtenerAccionIntervaloJugador, obtenerSuspensionIntervaloJugador, 
  obtenerResultado7MIntervaloJugador, obtenerAsistenciaIntervaloJugador, obtenerResultadoTotalJugador, obtenerSuspensionJugador,
    obtenerAsistenciaTotalJugador}  from '../utils/calculosEstadistica'; 

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

export default function Jugadores({dataEventos, dataEquipos}) {

  const jugadoresTotales= obtenerJugadores(dataEventos);

  const calcularEstadisticasJugador = () => {

  }; 

  return (
    <div className="w-full bg-white">
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
                    <span>{idJugador}</span>
                  </div>
                </td>
                {/* Celdas vacías o con contenido dinámico según los datos */}
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
                <td className="px-2 py-2 border border-gray-300">{calcularEstadisticasJugador()}</td>
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
            <tr className="border-b">
              <td className="px-2 py-2 border border-gray-300">
                <div className="flex gap-2">
                  <span>1</span>
                  <span>JORGE</span>
                  <span className="text-gray-500">GK</span>
                </div>
              </td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300"></td>
              <td className="px-2 py-2 border border-gray-300">75 %</td>
              <td className="px-2 py-2 border border-gray-300">60 %</td>
              <td className="px-2 py-2 border border-gray-300">50 %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
