"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
                            src="/path/to/escudo1.png" // Cambia este path por el de tu escudo
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
                            src="/path/to/escudo2.png" // Cambia este path por el de tu escudo
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
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Botón 1</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Botón 2</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Botón 3</button>
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
                        <h2 className="text-lg font-semibold text-black mb-2">Sistema Defensivo</h2>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((check) => (
                                <div key={check} className="flex items-center">
                                    <input type="checkbox" className="mr-2" id={`check-${check}`} />
                                    <label htmlFor={`check-${check}`} className="text-black">Opción {check}</label>
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
                            <button className="bg-blue-500 text-white px-4 py-3 rounded-lg">Fase 1</button>
                            <button className="bg-green-500 text-white px-4 py-3 rounded-lg">Fase 2</button>
                            <button className="bg-red-500 text-white px-4 py-3 rounded-lg">Fase 3</button>
                        </div>
                    </div>

                    {/* Sección Resultado */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Resultado</h2>
                        <div className="flex justify-between mb-2">
                            {[1, 2, 3, 4].map((resultado) => (
                                <button key={resultado} className="bg-yellow-500 text-white px-4 py-3 rounded-lg">Resultado {resultado}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Acciones */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Acciones</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((accion) => (
                                <button key={accion} className="bg-green-500 text-white px-4 py-3 rounded-lg">Acción {accion}</button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Suspensiones */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Suspensiones</h2>
                        <div className="flex justify-between mb-2">
                            {[1, 2, 3, 4].map((suspension) => (
                                <button key={suspension} className="bg-blue-500 text-white px-4 py-3 rounded-lg">Suspensión {suspension}</button>
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
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Botón 1</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Botón 2</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Botón 3</button>
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
                        <h2 className="text-lg font-semibold text-black mb-2">Sistema Defensivo</h2>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((check) => (
                                <div key={check} className="flex items-center">
                                    <input type="checkbox" className="mr-2" id={`check-${check}`} />
                                    <label htmlFor={`check-${check}`} className="text-black">Opción {check}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <Link href="/">
                    <button
                        className="bg-transparent text-black border-2 border-black p-3 rounded-full w-full font-semibold hover:bg-black hover:text-white transition duration-300 ease-in-out text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Salir
                    </button>
                </Link>
            </div>
        </div>
    );
}
