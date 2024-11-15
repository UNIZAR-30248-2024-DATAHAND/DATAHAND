'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export const obtenerEventos = async (idPartido) => {
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
    const [eventos, setEventos] = useState([]);
    const [cantidadMostrar, setCantidadMostrar] = useState(5); // Estado para controlar cuántos eventos mostrar
    const {idPartido} = useParams(); // Obtener el idPartido de los parámetros
    
  
    // Función para manejar la obtención de eventos
    const manejarObtenerEventos = async () => {
      const eventosObtenidos = await obtenerEventos(idPartido);
      setEventos(eventosObtenidos);
      setCantidadMostrar(5); // Reiniciar a 5 eventos cuando se obtienen nuevos
    };
  
    // Función para cargar más eventos
    const manejarCargarMas = () => {
      setCantidadMostrar(cantidadMostrar + 5);
    };
  
    return (
      <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
        <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Estadísticas Generales
        </h1>
  
        <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-lg">
          <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={manejarObtenerEventos}>
            Eventos
          </button>
  
          {/* Mostrar los eventos */}
          <div className="mt-4 max-h-60 overflow-y-scroll"> {/* Contenedor desplazable */}
            {eventos.length > 0 ? (
                <ul>
                {eventos.slice(0, cantidadMostrar).map((evento, index) => (
                    <li key={index} className="border-b py-2">
                    <p className="font-bold text-black">ID Evento: {evento.IdEvento}</p>
                    <p className="font-bold text-black">ID Partido: {evento.IdPartido}</p>
                    <p className="font-bold text-black">ID Jugador: {evento.IdJugador}</p>
                    <p className="font-bold text-black">Minuto: {evento.MinSeg}</p>
                    <p className="font-bold text-black">Fase de Juego: {evento.FaseDeJuego || 'No especificado'}</p>
                    <p className="font-bold text-black">Resultado: {evento.Resultado || 'No especificado'}</p>
                    <p className="font-bold text-black">Localización Lanzamiento: {evento.LocalizacionLanzamiento || 'No especificado'}</p>
                    <p className="font-bold text-black">Posición Lanzador: {evento.PosicionLanzador || 'No especificado'}</p>
                    <p className="font-bold text-black">Asistencia: {evento.Asistencia || 'No especificado'}</p>
                    <p className="font-bold text-black">Sistema de Ataque: {evento.SistemaDeAtaque || 'No especificado'}</p>
                    <p className="font-bold text-black">Sistema de Defensa: {evento.SistemaDeDefensa || 'No especificado'}</p>
                    <p className="font-bold text-black">Acción: {evento.Accion || 'No especificado'}</p>
                    <p className="font-bold text-black">Suspensión: {evento.Suspension || 'No especificado'}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-black">No hay eventos para mostrar.</p>
            )}
        </div>
  
          {/* Botón para cargar más eventos */}
          {eventos.length > cantidadMostrar && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={manejarCargarMas}
            >
              Cargar más eventos
            </button>
          )}
        </div>
  
     

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background: linear-gradient(270deg, #ffb835, #8a2be2);
          background-size: 400% 400%;
          animation: gradient 20s ease infinite;
        }
      `}</style>
    </div>
  );
}
