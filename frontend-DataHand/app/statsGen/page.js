'use client';

import Link from 'next/link';
import Image from 'next/image';

export const obtenerEventos = async () => {
    try {
      const res = await fetch('../api/users/eventos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const data = await res.json();
        // Aquí puedes trabajar con los datos de partidos recibidos
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
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
      <h1
        className="text-5xl font-bold mb-4 text-white"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        Estadisticas Generales
      </h1>
      
        <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-lg">
            <button className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => obtenerEventos()}
            >Eventos</button>
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
