"use client";

import Link from "next/link";
import Image from "next/image";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from "../components/Sidebar"
import { crearPartidoNuevo } from "../profile-entrenador/profile-entrenadorController";

ChartJS.register(...registerables);

export default function Home() {
    const data = {
        labels: ['Fuerza', 'Resistencia', 'Velocidad', 'Habilidad Técnica', 'Estrategia'],
        datasets: [
            {
                label: 'Atleta A',
                data: [7, 8, 6, 9, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Atleta B',
                data: [6, 7, 8, 5, 9],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    crearPartidoNuevo();

    return (
        <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden animate-gradient">
            <Sidebar />
            <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Perfil Entrenador
            </h1>

            {/* Contenedor para los cuadrados grandes con borde redondeado */}
            <div className="flex justify-center gap-8 mb-12 flex-wrap">
                {/* Primer cuadrado con contenido */}
                <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex flex-col justify-between p-4">
                    {/* Parte superior: Nombre y Nacionalidad */}
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold text-orange-500">Alejandro Sanz</p> {/* 888:esto sera variable */}
                        <p className="text-xl font-semibold text-orange-500">ESP</p> {/* 888:esto sera variable */}
                    </div>

                    {/* Imagen centrada */}
                    <div className="flex justify-center items-center h-full">
                        <Image
                            src="/image/logo.png" // Cambiar este path 
                            alt="Imagen predefinida"
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                    </div>

                    {/* Parte inferior: Nombre del equipo */}
                    <div className="flex justify-center">
                        <p className="text-2xl font-bold text-orange-500">Balonmano Zaragoza</p> {/* 888:esto sera variable */}
                    </div>
                </div>
                <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex items-center justify-center">
                    <Radar data={data} />
                </div>
            </div>

            {/* Rectángulo debajo de los cuadrados */}
            <div className="w-[85vw] max-w-[1048px] bg-gray-200 rounded-lg flex flex-col justify-center mb-12 p-4">
                {/* Fila de partidos */}
                {['Partido 1', 'Partido 2', 'Partido 3'].map((partido, index) => (
                    <div key={index}
                         className="flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded">
                        <p className="text-2xl text-orange-500 font-semibold">{partido}</p>
                        <div className="flex gap-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Ver</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
                        </div>
                    </div>
                ))}
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
                    background: linear-gradient(270deg, #ffb835, #8A2BE2);
                    background-size: 400% 400%;
                    animation: gradient 20s ease infinite;
                }
            `}</style>
        </div>
    );
}
