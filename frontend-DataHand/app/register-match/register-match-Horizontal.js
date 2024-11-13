import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

// <BarraHorizontal equipos={equipos} setEquipos={setEquipos} tiempoJugado={tiempoJugado} setTiempoJugado={setTiempoJugado}/>
const BarraHorizontal = ({equipos, setEquipos, tiempoJugado, setTiempoJugado, handleNavigateStats}) => {

    // Estado para el cronómetro
    const [cronometroActivo, setCronometroActivo] = useState(false); // Estado para controlar si el cronómetro está activo
    const [textoBoton, setTextoBoton] = useState("Fin del Primer Tiempo"); // Texto del botón
    const [primerTiempoFinalizado, setPrimerTiempoFinalizado] = useState(false); // Estado para saber si el primer tiempo ha terminado

    const actualizarPartido = async () => {
        try {
            const response = await fetch('/api/users/crearPartido', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(equipos), // Se envía todo el estado actual del partido
            });

            if (response.ok) {
                console.log("Partido actualizado exitosamente.");
            } else {
                console.error("Error al actualizar el partido.");
            }
        } catch (error) {
            console.error("Error en la llamada a la API:", error);
        }
    };

    // Efecto para manejar el cronómetro
    useEffect(() => {
        let intervalo;

        if (cronometroActivo) {
            intervalo = setInterval(() => {
                // Usa setEquipos para actualizar el tiempo de juego
                setEquipos((prevState) => {
                    const nuevoTiempo = prevState.TiempoDeJuego + 1;
                    // Actualiza el tiempo jugado
                    setTiempoJugado(nuevoTiempo);
                    // Retorna el nuevo estado con el tiempo actualizado
                    return {
                        ...prevState,
                        TiempoDeJuego: nuevoTiempo
                    };
                });
            }, 1000);
            
        }

        return () => clearInterval(intervalo); // Limpia el intervalo al desmontar
    }, [cronometroActivo]);

    // Función para formatear el tiempo en minutos y segundos (MM:SS)
    const formatearTiempo = (tiempo) => {
        const minutos = String(Math.floor(tiempo / 60)).padStart(2, "0");
        const segundos = String(tiempo % 60).padStart(2, "0");
        return `${minutos}:${segundos}`;
    };

    // Funciones para iniciar y detener el cronómetro
    const iniciarCronometro = () => {
        if (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) {
            alert("Debes seleccionar un sistema defensivo antes de comenzar el partido.");
            return;
        }
        // Lógica para iniciar el partido si ambos sistemas defensivos están seleccionados
        console.log("Partido iniciado con los sistemas defensivos:");
        console.log("Local:", equipos.sistemaDefensivoLocal);
        console.log("Visitante:", equipos.sistemaDefensivoVisitante);
        setCronometroActivo(true);
    };

    const detenerCronometro = () => {
        setCronometroActivo(false);
    };

    // Maneja el final del primer tiempo
    const finalizarPrimerTiempo = () => {
        setEquipos((prevState) => ({
            ...prevState,
            TiempoDeJuego: 30 * 60, // Establece el tiempo a 30 minutos
            Parte: 'Fin del primer tiempo', // Cambia el estado de la parte
        }));
        detenerCronometro(); // Detiene el cronómetro si estaba activo
        setTextoBoton("Fin del partido"); // Cambia el texto del botón
        setPrimerTiempoFinalizado(true); // Marca que el primer tiempo ha terminado
        actualizarPartido();
    };

    // Maneja el fin del partido
    const finalizarPartido = () => {
        setEquipos((prevState) => ({
            ...prevState,
            TiempoDeJuego: 0, // Establece el tiempo a 00:00
            Parte: 'Fin del partido', // Cambia el estado a 'Fin del partido'
        }));
        setTextoBoton("Partido acabado"); // Cambia el texto del botón
        detenerCronometro(); // Detiene el cronómetro
        actualizarPartido();
    };

    const manejarClickFinPartido = async () => {
        if (!primerTiempoFinalizado) {
            finalizarPrimerTiempo(); // Si el primer tiempo no ha finalizado, lo finaliza
        } else {
            await finalizarPartido(); // Si el primer tiempo ya ha finalizado, finaliza el partido
        }
    };

    return (
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
                    <span className="text-xl font-semibold text-black">{equipos.EquipoLocal}</span>
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
                    <span className="text-xl font-semibold text-black">{equipos.EquipoVisitante}</span>
                </div>
            </div>

            {/* Marcador y Cronómetro */}
            <div className="flex flex-col">
                <span className="text-xl font-semibold text-black">Marcador: {equipos.MarcadorLocal} - {equipos.MarcadorVisitante}</span>
                {/* <span className="text-xl font-semibold text-black">Marcador: 0 - 0</span> */}
            </div>
            
            {/* Cronómetro */}
            <div className="flex items-center">
                <div className="flex flex-col mr-4">
                    <span className="text-lg font-semibold text-black">Cronómetro: {formatearTiempo(equipos.TiempoDeJuego)}</span>
                    <span className="text-md font-semibold text-black">{equipos.Parte}</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white ${
                            (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={manejarClickFinPartido} // Cambia la funcionalidad del botón
                        disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante}
                    >
                        {textoBoton}
                    </button>
                
                    <button 
                        className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white ${
                            (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        // className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={iniciarCronometro} // Inicia el cronómetro
                        disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante} // Deshabilitar si alguno no está seleccionado
                    >
                        Iniciar
                    </button>
                    <button 
                        className={`mt-4 px-4 py-2 rounded bg-red-500 text-white ${
                            (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={detenerCronometro} // Detiene el cronómetro
                        disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante}
                    >
                        Detener
                    </button>
                </div>
            </div>

            <button className="bg-gray-300 text-black px-4 py-2 rounded">UNDO</button>
            <button
            onClick={handleNavigateStats}
            className="bg-gray-300 text-black px-4 py-2 rounded"
            >
            Eventos
            </button>
            <Link href="/">
                <button
                    className="bg-red-600 text-white border-2 border-white p-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center w-full">
                    Salir
                </button>
            </Link>
        </div>
        );
};

export { BarraHorizontal };