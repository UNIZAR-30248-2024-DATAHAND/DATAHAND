"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react"; // Importa useState

export default function Home() {

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup

    const handleGolClick = () => {
        setShowPopup(true); // Muestra el popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Oculta el popup
    };

    return (
        <div className="relative h-screen flex flex-col items-center justify-start bg-orange-500 overflow-hidden p-4">
            <h1 className="text-5xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Partido
            </h1>
            
            {/* Rectángulo alargado para el marcador y cronómetro */}
            <div className="w-full h-32 bg-white rounded-lg flex items-center justify-between p-4 mb-8 shadow-md">
                {/* Escudos y Nombres de Equipos */}
                <div className="flex items-center">
                    {/* Equipo 1 */}
                    <div className="flex items-center mr-8">
                        <Image 
                            src="/path/to/escudo1.png" // Cambiar este path 
                            alt="Escudo Equipo 1"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        <span className="text-xl font-semibold text-black">Equipo 1</span>
                    </div>

                    {/* Equipo 2 */}
                    <div className="flex items-center">
                        <Image 
                            src="/path/to/escudo2.png" // Cambiar este path 
                            alt="Escudo Equipo 2"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        <span className="text-xl font-semibold text-black">Equipo 2</span>
                    </div>
                </div>

                {/* Marcador y Cronómetro */}
                <div className="flex flex-col">
                    <span className="text-xl font-semibold text-black">Marcador: 0 - 0</span>
                </div>
                
                <div className="flex items-center">
                    <div className="flex flex-col mr-4">
                        <span className="text-lg font-semibold text-black">Cronómetro: 00:00</span>
                        <span className="text-md font-semibold text-black">Primer Tiempo</span>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Fin del 1er Tiempo</button>
                    <div className="flex gap-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">Iniciar</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded">Detener</button>
                    </div>
                </div>

                <button className="bg-gray-300 text-black px-4 py-2 rounded">UNDO</button>
                <Link href="/">
                    <button
                        className="bg-red-600 text-white border-2 border-white p-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center w-full">
                        Salir
                    </button>
                </Link>
            </div>

            {/* Fila de tres rectángulos */}
            <div className="flex justify-between w-full mb-12 flex-grow">
                {/* Rectángulo 1 */}
                <div className="flex-1 h-[calc(100vh-256px)] bg-white rounded-lg shadow-md mx-2 p-4 flex flex-col">
                    <p className="text-xl font-semibold text-black text-center">Rectángulo 1</p>

                    {/* Sección Tiempo Muerto dentro del Rectángulo 1 */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tiempo Muerto</h2>
                        <div className="flex justify-between mb-2">
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Primero</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Segundo</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Tercero</button>
                        </div>
                    </div>

                    {/* Sección Portero */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Portero</h2>
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-lg">Seleccionar Portero</button> {/* 888:esto sera variable */}
                    </div>

                    {/* Sección Jugadores */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Jugadores</h2> {/* 888:esto sera variable */}
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((jugador) => ( 
                                <button key={jugador} className="bg-green-500 text-white px-3 py-3 rounded-lg">Jugador {jugador}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Banquillo */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Banquillo</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((banquillo) => (
                                <button key={banquillo} className="bg-yellow-500 text-white px-3 py-3 rounded-lg">Banquillo {banquillo}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Sistema Defensivo */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-black mb-2">Sistema Defensivo</h2>
                        <div className="flex gap-2 flex-wrap">
                            {["6:0", "5:1", "3:2:1", "4:2", "Otros"].map((opcion, index) => (
                                <div key={index} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="sistemaDefensivo" // El mismo nombre para agrupar los radios
                                        className="mr-2" 
                                        id={`radio-${index}`} 
                                    />
                                    <label htmlFor={`radio-${index}`} className="text-black text-lg">{opcion}</label>
                                </div>
                            ))}
                        </div>
                    </div>               
                </div>
                
                {/* Rectángulo 2 (más grande) */}
                <div className="flex-[1.5] h-[calc(100vh-256px)] bg-white rounded-lg shadow-md mx-2 p-4 flex flex-col">
                    <p className="text-xl font-semibold text-black text-center">Rectángulo 2 (Más Grande)</p>

                    {/* Sección Fases de Juego */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Fases de Juego</h2>
                        <div className="flex justify-between mb-2">
                            <button className="bg-blue-500 text-white px-4 py-3 rounded-lg">Ataque Posicional</button>
                            <button className="bg-green-500 text-white px-4 py-3 rounded-lg">Contragol</button>
                            <button className="bg-red-500 text-white px-4 py-3 rounded-lg">Contrataque</button>
                        </div>
                    </div>

                    {/* Sección Resultado */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Resultado</h2>
                        <div className="flex justify-between mb-2">
                            {["Gol", "Parada", "Palo/Fuera", "Perdida de balon"].map((resultado) => (
                                <button 
                                    key={resultado} 
                                    className="bg-yellow-500 text-white px-4 py-3 rounded-lg"
                                    onClick={resultado === "Gol" ? handleGolClick : null} // Llama a handleGolClick si es "Gol"
                                >
                                    {resultado}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Acciones */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Acciones</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {["Falta", "Lanzamiento bloqueado", "2 Min provocado", "7m provocado", "1c1 ganado", "7m + 2min"].map((accion) => (
                                <button key={accion} className="bg-green-500 text-white px-4 py-3 rounded-lg"> {accion}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Suspensiones */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Suspensiones</h2>
                        <div className="flex justify-between mb-2">
                            {["2 Minutos", "Tarjeta amarilla", "Tarjeta roja", "Tarjeta azul"].map((suspension) => (
                                <button key={suspension} className="bg-blue-500 text-white px-4 py-3 rounded-lg"> {suspension}</button>
                            ))}
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tabla</h2>
                        <table className="w-full text-left border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Jugador</th>
                                    <th className="border border-gray-300 px-4 py-2">Acción</th>
                                    <th className="border border-gray-300 px-4 py-2">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map((fila) => (
                                    <tr key={fila}>
                                        <td className="border border-gray-300 px-4 py-2">Jugador {fila}</td>
                                        <td className="border border-gray-300 px-4 py-2">Acción {fila}</td>
                                        <td className="border border-gray-300 px-4 py-2">Resultado {fila}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Rectángulo 3 */}
                <div className="flex-1 h-[calc(100vh-256px)] bg-white rounded-lg shadow-md mx-2 p-4 flex flex-col">
                    <p className="text-xl font-semibold text-black text-center">Rectángulo 1</p>

                    {/* Sección Tiempo Muerto dentro del Rectángulo 1 */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tiempo Muerto</h2>
                        <div className="flex justify-between mb-2">
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Primero</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Segundo</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Tercero</button>
                        </div>
                    </div>

                    {/* Sección Portero */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Portero</h2>
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-lg">Seleccionar Portero</button>
                    </div>

                    {/* Sección Jugadores */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Jugadores</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((jugador) => (
                                <button key={jugador} className="bg-green-500 text-white px-3 py-3 rounded-lg">Jugador {jugador}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Banquillo */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Banquillo</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((banquillo) => (
                                <button key={banquillo} className="bg-yellow-500 text-white px-3 py-3 rounded-lg">Banquillo {banquillo}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Sistema Defensivo */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-black mb-2">Sistema Defensivo</h2>
                        <div className="flex gap-2 flex-wrap">
                            {["6:0", "5:1", "3:2:1", "4:2", "Otros"].map((opcion, index) => (
                                <div key={index} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="sistemaDefensivo" // El mismo nombre para agrupar los radios
                                        className="mr-2" 
                                        id={`radio-${index}`} 
                                    />
                                    <label htmlFor={`radio-${index}`} className="text-black text-lg">{opcion}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
        
            </div>

            {/* Popup para Gol */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Popup ocupa una gran parte de la pantalla y es naranja */}
                    <div className="bg-orange-500 rounded-lg p-6 w-[80vw] h-[80vh] overflow-auto flex items-center justify-center">
                        {/* Rectángulo blanco dentro del popup */}
                        <div className="bg-white rounded-lg p-6 w-[90%] h-[90%] flex flex-row shadow-lg">
                            {/* Columna izquierda */}
                            <div className="flex flex-col flex-1 justify-between">
                                {/* Sección de Posición Gol */}
                                <div className="bg-gray-200 rounded-lg p-4 mb-4 flex-grow text-center">
                                    <h3 className="text-lg font-semibold text-black">Posición Gol</h3>
                                    <p className="text-black">Detalles sobre la posición del gol.</p>
                                </div>

                                {/* Sección de Posición Lanzador */}
                                <div className="bg-gray-200 rounded-lg p-4 flex-grow text-center">
                                    <h3 className="text-lg font-semibold text-black">Posición Lanzador</h3>
                                    <p className="text-black">Detalles sobre la posición del lanzador.</p>
                                </div>
                            </div>
                            
                            {/* Línea separadora */}
                            <div className="w-1 bg-orange-500 mx-4" />

                            {/* Columna derecha */}
                            <div className="flex flex-col flex-1">
                                {/* Sección de Asistencias */}
                                <div className="mb-4 flex flex-col">
                                    <h3 className="text-lg font-semibold text-black mb-2">Asistencias</h3>
                                    <div className="flex justify-between mb-2">
                                        {Array.from({ length: 6 }, (_, index) => (
                                            <button key={index} className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
                                                Asistencia {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sección de Sistema de Juego */}
                                <div className="flex flex-col mb-4">
                                    <h3 className="text-lg font-semibold text-black mb-2">Sistema de Juego</h3>
                                    <div className="flex flex-col mb-4">
                                        <h4 className="text-md font-semibold text-black mb-2">Ataque</h4>
                                        <div className="grid grid-cols-5 gap-2">
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <button key={index} className="bg-gray-200 text-black px-3 py-2 rounded text-sm">
                                                    Ataque {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-md font-semibold text-black mb-2">Defensa</h4>
                                        <div className="grid grid-cols-5 gap-2">
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <button key={index + 10} className="bg-gray-200 text-black px-3 py-2 rounded text-sm">
                                                    Defensa {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de Cerrar */}
                                <div className="flex justify-center">
                                    <button 
                                        className="bg-red-500 text-white px-6 py-2 rounded" 
                                        onClick={handleClosePopup} // Cierra el popup
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
