'use client';

import { useState } from 'react';
import Component from '../../../components/component'; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const [mostrarComponent, setMostrarComponent] = useState(false); // Estado para mostrar/ocultar el componente

  const manejarMostrarComponent = () => {
    setMostrarComponent(true); // Muestra el componente al hacer clic
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
      <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        Componente de Estadísticas
      </h1>

      {/* Botón para mostrar el componente */}
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={manejarMostrarComponent}
      >
        Mostrar Componente de Estadísticas
      </button>

      {/* Renderiza el componente solo si se ha hecho clic en el botón */}
      {mostrarComponent && <Component />}

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
