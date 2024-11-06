'use client';

import Sidebar from '../components/Sidebar';
import EspecificoJugadores from '../components/especifico-jugadores';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const irAPaginaAnterior = () => {
        router.back(); // Esto regresará a la página anterior en el historial
    };
    
    return (
      <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
        <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Estadísticas Jugador
        </h1>
        
        <button 
          onClick={irAPaginaAnterior} 
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Volver Atrás
        </button>
        
        <EspecificoJugadores />
     

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
