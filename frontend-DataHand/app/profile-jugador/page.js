"use client";

import Link from "next/link";
import Image from "next/image";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

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

    return (
        <div className="relative h-screen flex flex-col items-center justify-start bg-orange-500 overflow-auto">
            <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Perfil Jugador
            </h1>

            {/* Contenedor para los cuadrados grandes con borde redondeado */}
            <div className="flex justify-center gap-8 mb-12 flex-wrap">
                {/* Primer cuadrado con contenido */}
                <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white rounded-2xl flex flex-col justify-between p-4">
                    {/* Parte superior: Nombre y Nacionalidad */}
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold text-orange-500">Alejandro Sanz</p>
                        <p className="text-xl font-semibold text-orange-500">ESP</p>
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
                        <p className="text-2xl font-bold text-orange-500">Balonmano Zaragoza</p>
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
                    <div key={index} className="flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded">
                        <p className="text-2xl text-orange-500 font-semibold">{partido}</p>
                        <div className="flex gap-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Ver</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <Link href="/">
                    <button
                        className="bg-transparent text-white border-2 border-white p-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center w-full">
                        Salir
                    </button>
                </Link>
            </div>
        </div>
    );
}
