"use client";

import Link from "next/link";
import Image from "next/image";

// import { useState } from "react"; // Importa useState
import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect y useState

export default function Home() {

    /*
    Cosas TO DO:
    - Cambiar los paths de las imágenes de los escudos
    - Marcar jugador, fase de juego y resultado para que salga PopUp
    - Marcar jugador, fase de juego y accion/suspension para guardar dato

    */

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup

    // Estado inicial para ambos equipos, con 2 porteros
    const [equipos, setEquipos] = useState({
            IdPartido: '1',                  // Identificador del partido
            Fecha: new Date(),               // Fecha del partido
            EquipoLocal: 'Equipo A',         // Nombre del equipo local
            EquipoVisitante: 'Equipo B',     // Nombre del equipo visitante
            MarcadorLocal: 2,                // Marcador del equipo local
            MarcadorVisitante: 1,            // Marcador del equipo visitante
            TiempoDeJuego: 0,                // Tiempo de juego transcurrido en minutos
            Parte: 'Segunda parte',                // Parte actual del juego (Parte 1, Parte 2, Prórroga)
            local: {
                jugadores: [1, 2, 3, 4, 5, 6],
                banquillo: [7, 8, 9, 10, 11, 12, 13, 14],
                porteros: [15, 16], // Dos porteros
            },
            visitante: {
                jugadores: [17, 18, 19, 20, 21, 22],
                banquillo: [23, 24, 25, 26, 27, 28, 29, 30],
                porteros: [31, 32], // Dos porteros
            },
            sistemaDefensivoLocal: "6:0", // Sistema defensivo del equipo local
            sistemaDefensivoVisitante: "5:1", // Sistema defensivo del equipo visitante
        });

    const [seleccionado, setSeleccionado] = useState({ equipo: null, index: null, tipo: null }); // Para manejar el jugador seleccionado
    const [faseDeJuego, setFaseDeJuego] = useState(null);
    const [resultado, setResultado] = useState(null);

    // Estado para el cronómetro
    const [tiempo, setTiempo] = useState(0); // Tiempo en segundos
    const [cronometroActivo, setCronometroActivo] = useState(false); // Estado para controlar si el cronómetro está activo
    const [textoBoton, setTextoBoton] = useState("Fin del Primer Tiempo"); // Texto del botón
    const [primerTiempoFinalizado, setPrimerTiempoFinalizado] = useState(false); // Estado para saber si el primer tiempo ha terminado

    const [sistemaDefensivo, setSistemaDefensivo] = useState(null);
    const [sistemaDefensivoLocal, setSistemaDefensivoLocal] = useState(null);
    const [sistemaDefensivoVisitante, setSistemaDefensivoVisitante] = useState(null);

    const [partidoData, setPartidoData] = useState({
        fecha: new Date(),
        equipoLocal: "Club A",
        equipoVisitante: "Club B",
        resultado: "0-0",
        jugadores: [],
        eventos: [],
        sistemaDefensivoLocal: null,
        sistemaDefensivoVisitante: null,
        golesLocal: 0,
        golesVisitante: 0,
        horarios: ["00:00", "00:00", "00:00"], // Reemplaza con los horarios reales
        imagenes: {
            local: "/ruta/a/imagen/local.png",
            visitante: "/ruta/a/imagen/visitante.png",
        },
    });


    // Efecto para manejar el cronómetro
    useEffect(() => {
        let intervalo;

        if (cronometroActivo) {
            intervalo = setInterval(() => {
                // Usa setEquipos para actualizar el tiempo de juego
                setEquipos((prevState) => ({
                    ...prevState,
                    TiempoDeJuego: prevState.TiempoDeJuego + 1, // Incrementa el tiempo en 1 segundo
                }));
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

    //const showPopup = seleccionado.index !== null && faseDeJuego !== null && resultado !== null;

    // Función para seleccionar un jugador o banquillo
    const seleccionarJugador = (equipo, index, tipo) => {
        if (seleccionado.index !== null) {
            intercambiarPosiciones(equipo, index, tipo); // Intercambiar si ya hay un jugador seleccionado
        } else {
            setSeleccionado({ equipo, index, tipo }); // Seleccionar el jugador o banquillo
        }
    };

    // Función para intercambiar posiciones entre jugadores y banquillo
    const intercambiarPosiciones = (equipo, index, tipo) => {
        const equipoSeleccionado = equipos[equipo];
        const jugadorSeleccionado = seleccionado.tipo === "jugador" ? 
            equipoSeleccionado.jugadores[seleccionado.index] : 
            seleccionado.tipo === "portero" ? 
            equipoSeleccionado.porteros[seleccionado.index] : 
            equipoSeleccionado.banquillo[seleccionado.index];

        const jugadorActual = tipo === "jugador" ? equipoSeleccionado.jugadores[index] :
            tipo === "portero" ?
            equipoSeleccionado.porteros[index] :
            equipoSeleccionado.banquillo[index];

        // No permitir el intercambio entre portero y jugador
        if (esPortero(jugadorSeleccionado) && (tipo === "jugador" || tipo === "banquillo")) {
            alert("No se puede intercambiar un portero con un jugador.");
            return;
        }
        if (esPortero(jugadorActual) && (seleccionado.tipo === "jugador" || seleccionado.tipo === "banquillo")) {
            alert("No se puede intercambiar un jugador con un portero.");
            return;
        }

        // Verificar que los jugadores pertenecen al mismo equipo
        if (seleccionado.equipo !== equipo) {
            alert("No se puede intercambiar jugadores entre equipos diferentes.");
            return;
        }

        // Intercambio
        if (seleccionado.tipo === tipo) {
            if (tipo === "jugador") {
                const nuevosJugadores = [...equipoSeleccionado.jugadores];
                [nuevosJugadores[seleccionado.index], nuevosJugadores[index]] = [nuevosJugadores[index], nuevosJugadores[seleccionado.index]];
                setEquipos({
                    ...equipos,
                    [equipo]: { ...equipoSeleccionado, jugadores: nuevosJugadores },
                });
            } else if (tipo === "portero") {
                const nuevosPorteros = [...equipoSeleccionado.porteros];
                [nuevosPorteros[seleccionado.index], nuevosPorteros[index]] = [nuevosPorteros[index], nuevosPorteros[seleccionado.index]];
                setEquipos({
                    ...equipos,
                    [equipo]: { ...equipoSeleccionado, porteros: nuevosPorteros },
                });
            } else {
                const nuevoBanquillo = [...equipoSeleccionado.banquillo];
                [nuevoBanquillo[seleccionado.index], nuevoBanquillo[index]] = [nuevoBanquillo[index], nuevoBanquillo[seleccionado.index]];
                setEquipos({
                    ...equipos,
                    [equipo]: { ...equipoSeleccionado, banquillo: nuevoBanquillo },
                });
            }
        } else {
            // Intercambio entre jugador y banquillo
            if (tipo === "jugador") {
                const nuevosJugadores = [...equipoSeleccionado.jugadores];
                const nuevoBanquillo = [...equipoSeleccionado.banquillo];
                [nuevoBanquillo[seleccionado.index], nuevosJugadores[index]] = [nuevosJugadores[index], nuevoBanquillo[seleccionado.index]];
                setEquipos({
                    ...equipos,
                    [equipo]: { ...equipoSeleccionado, jugadores: nuevosJugadores, banquillo: nuevoBanquillo },
                });
            } else if (tipo === "banquillo") {
                const nuevosJugadores = [...equipoSeleccionado.jugadores];
                const nuevoBanquillo = [...equipoSeleccionado.banquillo];
                [nuevosJugadores[seleccionado.index], nuevoBanquillo[index]] = [nuevoBanquillo[index], nuevosJugadores[seleccionado.index]];
                setEquipos({
                    ...equipos,
                    [equipo]: { ...equipoSeleccionado, jugadores: nuevosJugadores, banquillo: nuevoBanquillo },
                });
            }
        }

        // Reiniciar selección después de intercambiar
        setSeleccionado({ equipo: null, index: null, tipo: null });
    };

    // Función para determinar si un jugador es portero (números fijos para porteros)
    const esPortero = (jugador) => {
        return equipos.local.porteros.includes(jugador) || equipos.visitante.porteros.includes(jugador);
    };


    const handleAccionClick = () => {
        // Verificar las condiciones antes de mostrar el popup
        console.log("Intentando registrar una accion...");
        console.log(faseDeJuego);
        console.log(resultado);
        if (seleccionado.tipo == "jugador" && faseDeJuego !== null && resultado !== null) {
            console.log("Muestro PopUp");
            setShowPopup(true); // Muestra el popup
        } else if(resultado === "Gol") {
            marcarGol(); // Llamar a la función de marcar gol si el resultado es "Gol"
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Oculta el popup
        // Opcional: Resetear estados si es necesario
        setFaseDeJuego(null);
        setResultado(null);
        setSeleccionado({ equipo: null, index: null, tipo: null });
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
    };

    const manejarClickFinPartido = async () => {
        if (!primerTiempoFinalizado) {
            finalizarPrimerTiempo(); // Si el primer tiempo no ha finalizado, lo finaliza
        } else {
            await finalizarPartido(); // Si el primer tiempo ya ha finalizado, finaliza el partido
            await enviarDatosAPartido(); // Enviar los datos a la API
        }
    };

    const enviarDatosAPartido = async () => {
        try {
            const response = await fetch('/api/users/datosPartidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partidoData),
            });
    
            const data = await response.json();
            console.log('Datos del partido guardados:', data);
        } catch (error) {
            console.error('Error al guardar el partido:', error);
        }
    };
    

    const seleccionarSistemaDefensivoLocal = (opcion) => {
        setEquipos(prevEquipos => ({
            ...prevEquipos,
            sistemaDefensivoLocal: opcion, // Actualiza el sistema defensivo local en el estado
        }));
    };
    
    const seleccionarSistemaDefensivoVisitante = (opcion) => {
        setEquipos(prevEquipos => ({
            ...prevEquipos,
            sistemaDefensivoVisitante: opcion, // Actualiza el sistema defensivo visitante en el estado
        }));
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
                    <p className="text-xl font-semibold text-black text-center">Equipo Local</p>

                    {/* Sección Tiempo Muerto dentro del Rectángulo 1 */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tiempo Muerto</h2>
                        <div className="flex justify-between mb-2">
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Primero</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Segundo</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Tercero</button>
                        </div>
                    </div>
                    
                    {/* Sección Porteros */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Porteros</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {/* Solo se muestra un portero aquí */}
                            <button
                                onClick={() => seleccionarJugador("local", 0, "portero")}
                                className={`${
                                    seleccionado?.equipo === "local" && seleccionado?.index === 0 && seleccionado?.tipo === "portero"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                } text-white px-3 py-3 rounded-lg`}
                            >
                                Portero {equipos.local.porteros[0]} {/* Primer portero visible */}
                            </button>
                        </div>
                    </div>

                     {/* Sección Jugadores Locales */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Jugadores Locales</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {equipos.local.jugadores.map((jugador, index) => (
                                <button
                                    key={index}
                                    onClick={() => seleccionarJugador("local", index, "jugador")}
                                    className={`${
                                        seleccionado?.equipo === "local" && seleccionado?.index === index && seleccionado?.tipo === "jugador"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                    } text-white px-3 py-3 rounded-lg`}
                                >
                                    Jugador {jugador}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-lg font-semibold text-black mt-4 mb-2">Banquillo Local</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {equipos.local.banquillo.map((jugador, index) => (
                                <button
                                    key={index}
                                    onClick={() => seleccionarJugador("local", index, "banquillo")}
                                    className={`${
                                        seleccionado?.equipo === "local" && seleccionado?.index === index && seleccionado?.tipo === "banquillo"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    } text-white px-3 py-3 rounded-lg`}
                                >
                                    Jugador {jugador}
                                </button>
                            ))}

                            {/* Agregar el segundo portero al banquillo */}
                            <button
                                onClick={() => seleccionarJugador("local", 1, "portero")}
                                className={`${
                                    seleccionado?.equipo === "local" &&  seleccionado?.index === 1 && seleccionado?.tipo === "portero"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                } text-white px-3 py-3 rounded-lg`}
                            >
                                Portero {equipos.local.porteros[1]} {/* Segundo portero en el banquillo */}
                            </button>
                        </div>
                    </div>

                    {/* Sección Sistema Defensivo del equipo local */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-black mb-2">Sistema Defensivo Local</h2>
                        <div className="flex gap-2 flex-wrap">
                            {["6:0", "5:1", "3:2:1", "4:2", "Otros"].map((opcion, index) => (
                                <div key={index} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="sistemaDefensivoLocal"
                                        className="mr-2" 
                                        id={`radio-local-${index}`} 
                                        onChange={() => seleccionarSistemaDefensivoLocal(opcion)} // Actualiza el estado al seleccionar
                                        checked={equipos.sistemaDefensivoLocal === opcion} // Verificar cuál está seleccionado
                                    />
                                    <label htmlFor={`radio-local-${index}`} className="text-black text-lg">{opcion}</label>
                                </div>
                            ))}
                        </div>
                    </div>     
                </div>
                
                {/* Rectángulo 2 (más grande) */}
                <div className="flex-[1.5] h-[calc(100vh-256px)] bg-white rounded-lg shadow-md mx-2 p-4 flex flex-col">
                    <p className="text-xl font-semibold text-black text-center">Acciones del juego</p>

                    {/* Sección Fases de Juego */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Fases de Juego</h2>
                        <div className="flex justify-between mb-2">
                            <button 
                                className={`bg-blue-500 text-white px-4 py-3 rounded-lg ${faseDeJuego === 'ataquePosicional' ? 'opacity-80' : ''}`}
                                onClick={() => setFaseDeJuego('ataquePosicional')} // Actualiza el estado
                            >
                                Ataque Posicional
                            </button>
                            <button 
                                className={`bg-green-500 text-white px-4 py-3 rounded-lg ${faseDeJuego === 'contragol' ? 'opacity-80' : ''}`}
                                onClick={() => setFaseDeJuego('contragol')} // Actualiza el estado
                            >
                                Contragol
                            </button>
                            <button 
                                className={`bg-red-500 text-white px-4 py-3 rounded-lg ${faseDeJuego === 'contrataque' ? 'opacity-80' : ''}`}
                                onClick={() => setFaseDeJuego('contrataque')} // Actualiza el estado
                            >
                                Contrataque
                            </button>
                        </div>
                    </div>

                    {/* Sección Resultado */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Resultado</h2>
                        <div className="flex justify-between mb-2">
                            {["Gol", "Parada", "Palo/Fuera", "Perdida de balon"].map((opcionResultado) => (
                                <button 
                                    key={opcionResultado} 
                                    className={`bg-yellow-500 text-white px-4 py-3 rounded-lg ${resultado === opcionResultado ? 'opacity-80' : ''}`}
                                    onClick={() => {
                                        console.log("Seccion resultado");
                                        console.log(opcionResultado);
                                        setResultado(opcionResultado); // Actualiza el estado
                                        //Aqui hay un problema, no se actualiza el estado de resultado
                                        handleAccionClick();
                                    }}
                                >
                                    {opcionResultado}
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
                    <p className="text-xl font-semibold text-black text-center">Equipo visitante</p>

                    {/* Sección Tiempo Muerto dentro del Rectángulo 1 */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tiempo Muerto</h2>
                        <div className="flex justify-between mb-2">
                            <button className="bg-blue-500 text-white px-3 py-3 rounded-lg">Primero</button>
                            <button className="bg-green-500 text-white px-3 py-3 rounded-lg">Segundo</button>
                            <button className="bg-red-500 text-white px-3 py-3 rounded-lg">Tercero</button>
                        </div>
                    </div>

                    {/* Sección Porteros */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Porteros</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {/* Solo se muestra un portero aquí */}
                            <button
                                onClick={() => seleccionarJugador("visitante", 0, "portero")}
                                className={`${
                                    seleccionado?.equipo === "visitante" && seleccionado?.index === 0 && seleccionado?.tipo === "portero"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                } text-white px-3 py-3 rounded-lg`}
                            >
                                Portero {equipos.visitante.porteros[0]} {/* Primer portero visible */}
                            </button>
                        </div>
                    </div>

                    {/* Sección Jugadores Visitantes */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Jugadores Visitantes</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {equipos.visitante.jugadores.map((jugador, index) => (
                                <button
                                    key={index}
                                    onClick={() => seleccionarJugador("visitante", index, "jugador")}
                                    className={`${
                                        seleccionado?.equipo === "visitante" && seleccionado?.index === index && seleccionado?.tipo === "jugador"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                    } text-white px-3 py-3 rounded-lg`}
                                >
                                    Jugador {jugador}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-lg font-semibold text-black mt-4 mb-2">Banquillo Visitante</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {equipos.visitante.banquillo.map((jugador, index) => (
                                <button
                                    key={index}
                                    onClick={() => seleccionarJugador("visitante", index, "banquillo")}
                                    className={`${
                                        seleccionado?.equipo === "visitante" && seleccionado?.index === index && seleccionado?.tipo === "banquillo"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    } text-white px-3 py-3 rounded-lg`}
                                >
                                    Jugador {jugador}
                                </button>
                            ))}

                            {/* Agregar el segundo portero al banquillo */}
                            <button
                                onClick={() => seleccionarJugador("visitante", 1, "portero")}
                                className={`${
                                    seleccionado?.equipo === "visitante" &&  seleccionado?.index === 1 && seleccionado?.tipo === "portero"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                } text-white px-3 py-3 rounded-lg`}
                            >
                                Portero {equipos.visitante.porteros[1]} {/* Segundo portero en el banquillo */}
                            </button>
                        </div>
                    </div>

                    {/* Sección Sistema Defensivo del equipo visitante */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-black mb-2">Sistema Defensivo Visitante</h2>
                        <div className="flex gap-2 flex-wrap">
                            {["6:0", "5:1", "3:2:1", "4:2", "Otros"].map((opcion, index) => (
                                <div key={index} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="sistemaDefensivoVisitante"
                                        className="mr-2" 
                                        id={`radio-visitante-${index}`} 
                                        onChange={() => seleccionarSistemaDefensivoVisitante(opcion)} // Actualiza el estado al seleccionar
                                        checked={equipos.sistemaDefensivoVisitante === opcion} // Verificar cuál está seleccionado
                                    />
                                    <label htmlFor={`radio-visitante-${index}`} className="text-black text-lg">{opcion}</label>
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