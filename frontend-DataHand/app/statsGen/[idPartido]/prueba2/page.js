'use client';

import { useState } from 'react';
import Formulario from '../../../components/profileform'; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario

  const manejarMostrarFormulario = () => {
    setMostrarFormulario(true); // Muestra el formulario al hacer clic
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
      <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        Componente de Formulario
      </h1>

      {/* Botón para mostrar el formulario */}
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={manejarMostrarFormulario}
      >
        Mostrar Formulario
      </button>

      {/* Renderiza el formulario solo si se ha hecho clic en el botón */}
      {mostrarFormulario && <Formulario />}

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