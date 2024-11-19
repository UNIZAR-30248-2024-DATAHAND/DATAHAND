"use client";

import Link from "next/link";
import Image from "next/image";

// import { useState } from "react"; // Importa useState
import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect y useState
import { PopUpAccion } from "../register-match-PopUp"; // Importa el componente PopUp
import { BarraHorizontal } from "../register-match-Horizontal"; // Importa el componente PopUp
import Sidebar from '../../components/Sidebar';
import { set } from "mongoose";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Home() {

    // VARIABLE PREDETERMINADA PARA USERID PENDIENTE DE LOGIN   
    const userID = 1;
    const router = useRouter();
    const [contador, setContador] = useState(0);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Efecto para incrementar el contador cada 30 segundos
    useEffect(() => {
        // Crear el intervalo para incrementar el contador cada 30 segundos
        const intervalId = setInterval(() => {
            setContador(prevContador => prevContador + 1); // Incrementar el contador
        }, 30000); // 30 segundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []); // El intervalo solo se establece una vez cuando el componente se monta

    // Efecto para guardar el partido cuando el contador cambia
    useEffect(() => {
        if (contador > 0) {
            console.log("Guardando el estado del partido, contador:", contador);
            actualizarPartido(); // Llamar a la función para guardar el partido
        }
    }, [contador]); // Se ejecuta cada vez que cambia el contador


    const handleNavigateStats = () => {
        // Navegar a la URL con idPartido
        router.push(`/statsGen/${idPartido}`);
      };

    const {idPartido} = useParams(); // Obtener el idPartido de los parámetros

    //Para tiempo de juego al calcularlo en register-match-Horizontal.js habra que ver como lo pasamos al PopUp
    const [tiempoJugado, setTiempoJugado] = useState(null);

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup

    // Estamos usando esto para intercambiar jugadores y porteros, habra que hacerlo desde el crear partido
    const [equipos, setEquipos] = useState({
        IdPartido: '1',                  // Identificador del partido
        Fecha: new Date(),               // Fecha del partido
        EquipoLocal: 'Local',         // Nombre del equipo local
        EquipoVisitante: 'Visitante',     // Nombre del equipo visitante
        MarcadorLocal: 0,                // Marcador del equipo local
        MarcadorVisitante: 0,            // Marcador del equipo visitante
        TiempoDeJuego: 0,                // Tiempo de juego transcurrido en minutos
        Parte: 'Primera parte',                // Parte actual del juego (Parte 1, Parte 2, Prórroga)
        local: {
            jugadores: [],
            banquillo: [],
            porteros: [], // Dos porteros
        },
        visitante: {
            jugadores: [],
            banquillo: [],
            porteros: [], // Dos porteros
        },
        sistemaDefensivoLocal: "", // Sistema defensivo del equipo local
        sistemaDefensivoVisitante: "", // Sistema defensivo del equipo visitante
    });

    const [datosEvento, setDatosEvento] = useState({
        IdPartido: null,
        IdJugador: null,
        EquipoJugador: null,
        faseDeJuego:null,
        MinSeg: null,
        Accion: null,
        Suspension: null,
      });
    

    const registrarEvento = async () => {
        try {
          const res = await fetch('../../api/users/eventos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosEvento), // Convertir el objeto a una cadena JSON
          });
    
          if (res.ok) {
            const data = await res.json();
            console.log('Evento registrado:', data);
    
          } else {
            console.error('Error al registrar el evento');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

    const obtenerPartido = async () => {
        try {
            console.log(`Solicitando partido con IdPartido: ${idPartido}`);
            const res = await fetch(`../api/users/crearPartido?IdPartido=${idPartido}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.ok) {
                const data = await res.json();
                console.log('Datos recibidos:', data); // Mostrar los datos recibidos del backend
    
                // Mapear los datos recibidos directamente al estado de `equipos`
                setEquipos({
                    IdPartido: data.IdPartido || '',
                    Fecha: new Date(data.Fecha) || new Date(),
                    EquipoLocal: data.EquipoLocal || '',
                    EquipoVisitante: data.EquipoVisitante || '',
                    MarcadorLocal: data.MarcadorLocal || 0,
                    MarcadorVisitante: data.MarcadorVisitante || 0,
                    TiempoDeJuego: data.TiempoDeJuego || 0,
                    Parte: data.Parte || '',
                    local: {
                        jugadores: data.local?.jugadores || [],
                        banquillo: data.local?.banquillo || [],
                        porteros: data.local?.porteros || []
                    },
                    visitante: {
                        jugadores: data.visitante?.jugadores || [],
                        banquillo: data.visitante?.banquillo || [],
                        porteros: data.visitante?.porteros || []
                    },
                    sistemaDefensivoLocal: data.sistemaDefensivoLocal || '',
                    sistemaDefensivoVisitante: data.sistemaDefensivoVisitante || ''
                });
            } else {
                const errorText = await res.text();
                console.error('Error al obtener los datos del partido:', errorText); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error('Error en la solicitud GET:', error);
        }
    };

    // Función para actualizar el partido
    const actualizarPartido = async () => {
        try {
            const response = await fetch(`/api/users/crearPartido`, {
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

    const obtenerEventos = async (idPartido) => {
        try {
            const url = idPartido
                ? `../../api/users/eventos?idPartido=${idPartido}`
                : `../../api/users/eventos`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            if (res.ok) {
                const data = await res.json();
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
    
    useEffect(() => {
        const cargarDatos = async () => {
            if (idPartido) {
                try {
                    const [partido, eventosObtenidos] = await Promise.all([
                        obtenerPartido(), // Obtener datos del partido
                        obtenerEventos(idPartido), // Obtener eventos del partido
                    ]);
                    console.log('Eventos obtenidos:', eventosObtenidos); // Verificar datos
                    setEventos(eventosObtenidos); // Actualizar el estado
                } catch (error) {
                    console.error('Error al cargar datos:', error);
                }
            }
        };
    
        cargarDatos();
    }, [idPartido]);

    // useEffect para actualizar partidos cuando ocurren cambios en equipos (sin `TiempoDeJuego`)
    useEffect(() => {
        const actualizarPartidoAsync = async () => {
            // Llamar a actualizarPartido y esperar su resolución
            await actualizarPartido();

            // Solo después de que la actualización se complete, monitoreamos los cambios
            console.log('Estado de equipos actualizado:', equipos);
        };

        // Ejecutar la función asíncrona
        actualizarPartidoAsync();
    }, [
        equipos.EquipoLocal, 
        equipos.EquipoVisitante, 
        equipos.MarcadorLocal,
        equipos.MarcadorVisitante, 
        equipos.Parte, 
        equipos.local,
        equipos.visitante,
        equipos.sistemaDefensivoLocal,
        equipos.sistemaDefensivoVisitante
    ]); // Aquí solo se depende de las propiedades que queremos monitorear, excluyendo `TiempoDeJuego`

    const [seleccionado, setSeleccionado] = useState({ equipo: null, index: null, tipo: null }); // Para manejar el jugador seleccionado
    const [faseDeJuego, setFaseDeJuego] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [accion, setAccion] = useState(null);
    const [suspension, setSuspension] = useState(null);


    //Para pasarle los jugadores que hay en el campo al PopUp
    //Lo que vamos a hacer es pasarle un array con los jugadores tanto locales como vistantes 
    const [asistencias, setAsistencias] = useState([]);

    //Variables para mostrar los eventos en la tabla
    const [eventos, setEventos] = useState([]);
    
    useEffect(() => {
        // Crear un nuevo array con los jugadores y el primer portero
        const nuevasAsistencias = [
            ...equipos.local.jugadores,
            equipos.local.porteros[0],
            ...equipos.visitante.jugadores,
            equipos.visitante.porteros[0],
        ];

        setAsistencias(nuevasAsistencias);
    }, [equipos]); // Ejecutar el efecto cada vez que 'equipos' cambie

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

    // REGISTRAR EVENTOS
    useEffect(() => {
        // Verifica si hay eventos incompatibles activos
        if (
            (accion && (resultado || suspension)) ||
            (resultado && (accion || suspension)) ||
            (suspension && (accion || resultado))
        ) {
            console.log("Error: No se puede tener acción, resultado o suspensión al mismo tiempo.");
            
            // Reset
            setFaseDeJuego(null);
            setAccion(null);
            setSuspension(null);
    
            return; // Salimos de la función si hay un conflicto
        }
    
        // Registrar evento con Resultado
        if (seleccionado.tipo === "jugador" && faseDeJuego !== null && resultado !== null && accion === null && suspension === null) {
            console.log("Muestro PopUp para registrar resultado");
            setShowPopup(true); // Mostrar el popup para resultado
        // Registrar evento con Acción
        } else if (seleccionado.tipo === "jugador" && faseDeJuego !== null && resultado === null && accion !== null && suspension === null) {
            console.log("Quiero guardar una accion: ", accion);

            // Asegurarse de que todos los valores estén presentes
            if (!idPartido || seleccionado.index === null || !equipos.TiempoDeJuego) {
                console.log(idPartido, seleccionado.index, equipos.TiempoDeJuego)
                console.error("Error: Faltan datos necesarios para registrar el evento.");
                return; // Salir si faltan datos
            }
            
            // Actualizar el estado con los datos del evento
            setDatosEvento({
                IdPartido: idPartido,
                IdJugador: equipos[seleccionado.equipo].jugadores[seleccionado.index],
                EquipoJugador: seleccionado.equipo,
                faseDeJuego: faseDeJuego,
                MinSeg: equipos.TiempoDeJuego,  // Suponiendo que 'faseDeJuego' es el tiempo
                Accion: accion,       // La acción seleccionada
                Suspension: null,     // No hay suspensión en este caso
            });

        // Registrar evento con Suspensión
        } else if (seleccionado.tipo === "jugador" && faseDeJuego !== null && resultado === null && accion === null && suspension !== null) {
            console.log("Quiero guardar una suspension: ", suspension);

            // Asegurarse de que todos los valores estén presentes
            if (!idPartido || seleccionado.index === null || !equipos.TiempoDeJuego) {
                console.error("Error: Faltan datos necesarios para registrar el evento.");
                return; // Salir si faltan datos
            }
            
            // Actualizar el estado con los datos del evento
            setDatosEvento({
                IdPartido: idPartido,
                IdJugador: equipos[seleccionado.equipo].jugadores[seleccionado.index],
                EquipoJugador: seleccionado.equipo,
                faseDeJuego: faseDeJuego,
                MinSeg: equipos.TiempoDeJuego,  // Suponiendo que 'faseDeJuego' es el tiempo
                Accion: null,       // La acción seleccionada
                Suspension: suspension,     // No hay suspensión en este caso
            });
        } else {
            console.log("Condiciones no cumplidas, no se muestra el popup.");
        }
    }, [resultado, faseDeJuego, accion, suspension, seleccionado]); // Se ejecuta cada vez que alguno de estos estados cambia

    const resetearDatosEvento = () => {
        setFaseDeJuego(null);
        setAccion(null);
        setSuspension(null);
        setSeleccionado({ equipo: null, index: null, tipo: null });
        setDatosEvento({ IdPartido: null, IdJugador: null, MinSeg: null, Accion: null, Suspension: null });
    };

    useEffect(() => {
        const handleEvento = async () => {
            if (datosEvento.IdPartido && datosEvento.IdJugador !== null) {
                try {
                    await registrarEvento(); // Esperar a que se complete el registro del evento
                    // Una vez que el evento se ha registrado correctamente, actualizamos el estado
                    const eventosObtenidos = await obtenerEventos(idPartido);
                    setEventos(eventosObtenidos);
                    // Resetear variables solo después de registrar el evento
                    resetearDatosEvento();
                } catch (error) {
                    console.error("Error al registrar el evento:", error);
                }
            }
        };
    
        handleEvento();
    }, [datosEvento]); // Solo se ejecuta cuando 'datosEvento' cambia

    const handleClosePopup = async () => {
        setShowPopup(false); // Oculta el popup
        // Actualizar eventos
        const eventosObtenidos = await obtenerEventos(idPartido);
        setEventos(eventosObtenidos);
        // Resetear estados
        setFaseDeJuego(null);
        setResultado(null);
        setSeleccionado({ equipo: null, index: null, tipo: null });
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
        <div className="relative h-screen flex flex-col items-center justify-start bg-orange-500 overflow-y-auto p-4">
            <Sidebar userID={userID}/>
            <h1 className="text-5xl font-bold mb-4 text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Partido
            </h1>
            
            <BarraHorizontal equipos={equipos} setEquipos={setEquipos} tiempoJugado={tiempoJugado} setTiempoJugado={setTiempoJugado} handleNavigateStats={handleNavigateStats}/>

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
                            {["Ataque Posicional", "Contragol", "Contrataque"].map((nombre) => (
                                <button 
                                    key={nombre}
                                    className={`bg-red-500 text-white px-4 py-3 rounded-lg ${faseDeJuego === nombre ? 'opacity-80' : ''}`}
                                    onClick={() => setFaseDeJuego(nombre)} // Actualiza el estado
                                >
                                    {nombre}
                                </button>
                            ))}
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
                            {["Falta", "Lanzamiento bloqueado", "2 Min provocado", "7m provocado", "1c1 ganado", "7m + 2min"].map((accionItem) => (
                                <button 
                                key={accionItem} 
                                className={`bg-green-500 text-white px-4 py-3 rounded-lg ${accion === accionItem ? 'opacity-80' : ''}`}
                                onClick={() => {
                                    console.log("Sección acciones");
                                    console.log(accionItem);
                                    setAccion(accionItem); // Actualiza el estado
                                }}
                            >
                                {accionItem}
                            </button>
                            ))}
                        </div>
                    </div>

                    {/* Sección Suspensiones */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Suspensiones</h2>
                        <div className="flex justify-between mb-2">
                            {["2 Minutos", "Tarjeta amarilla", "Tarjeta roja", "Tarjeta azul"].map((suspensionItem) => (
                                <button 
                                key={suspensionItem} 
                                className={`bg-blue-500 text-white px-4 py-3 rounded-lg ${suspension === suspensionItem ? 'opacity-80' : ''}`}
                                onClick={() => {
                                    console.log("Sección suspensiones");
                                    console.log(suspensionItem);
                                    setSuspension(suspensionItem); // Actualiza el estado
                                }}
                            >
                                {suspensionItem}
                            </button>
                            ))}
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Tabla de Últimos Eventos</h2>
                        <table className="w-full text-left border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-black">ID Jugador</th>
                                    <th className="border border-gray-300 px-4 py-2 text-black">Accion del juego</th>
                                    <th className="border border-gray-300 px-4 py-2 text-black">Tiempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos.length > 0 ? (
                                    eventos.slice(-4).reverse().map((evento, index) => ( // Solo los últimos 4 eventos
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2 text-black">{evento.IdJugador}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-black">
                                                {evento.Resultado 
                                                    ? `${evento.Resultado}${evento.Asistencia ? ` (Asistencia: ${evento.Asistencia})` : ''}` 
                                                    : evento.Accion || evento.Suspension || 'No especificado'}
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2 text-black">{evento.MinSeg ? formatTime(evento.MinSeg) : 'No especificado'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="border border-gray-300 px-4 py-2 text-black text-center">
                                            No hay eventos para mostrar.
                                        </td>
                                    </tr>
                                )}
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
            <PopUpAccion showPopup={showPopup} onClose={handleClosePopup} asistencias={asistencias}
             seleccionado={seleccionado} faseDeJuego={faseDeJuego} resultado={resultado} tiempoJugado={tiempoJugado} idPartido={idPartido} equipos={equipos} setEquipos={setEquipos} />   {/*Me falta pasarle el IdPartido*/}
        </div>
    );
}