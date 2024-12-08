import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/PopupTeams.module.css';
import { useParams } from 'next/navigation';

// <BarraHorizontal equipos={equipos} setEquipos={setEquipos} tiempoJugado={tiempoJugado} setTiempoJugado={setTiempoJugado}/>
const BarraHorizontal = ({equipos, setEquipos, tiempoJugado, setTiempoJugado, handleNavigateStats, setEventosUndo}) => {

    // Estado para el cronómetro
    const [cronometroActivo, setCronometroActivo] = useState(false); // Estado para controlar si el cronómetro está activo
    const [textoBoton, setTextoBoton] = useState("Fin del Primer Tiempo"); // Texto del botón
    const [primerTiempoFinalizado, setPrimerTiempoFinalizado] = useState(false); // Estado para saber si el primer tiempo ha terminado
    const [tiempo, setTiempo] = useState(false);

    // Lógica equipos
    const [showEquipoSelector, setShowEquipoSelector] = useState(false); // Controla la visibilidad del popup de selección
    const [equiposList, setEquiposList] = useState([]); // Lista de equipos para seleccionar
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null); // Estado para saber si es equipo local o visitante

    // Función para seleccionar el equipo (local o visitante)
    const seleccionarEquipo = (equipo) => {
        // Determina si es local o visitante basándose en el estado equipoSeleccionado
        if (equipoSeleccionado === 'local') {
            setEquipos((prevEquipos) => ({
                ...prevEquipos,
                EquipoLocal: equipo.nombre,
                local: {
                    ...prevEquipos.local,
                    jugadores: equipo.jugadores,
                    banquillo: equipo.banquillo,
                    porteros: equipo.porteros,
                },
                sistemaDefensivoLocal: equipo.sistemaDefensivo,
            }));
        } else if (equipoSeleccionado === 'visitante') {
            setEquipos((prevEquipos) => ({
                ...prevEquipos,
                EquipoVisitante: equipo.nombre,
                visitante: {
                    ...prevEquipos.visitante,
                    jugadores: equipo.jugadores,
                    banquillo: equipo.banquillo,
                    porteros: equipo.porteros,
                },
                sistemaDefensivoVisitante: equipo.sistemaDefensivo,
            }));
        }
        setShowEquipoSelector(false); // Cierra el popup
    };

    // Maneja el click en los equipos (local o visitante)
    const manejarClickEquipo = async (tipoEquipo) => {
        setEquipoSeleccionado(tipoEquipo); // Establece si es equipo local o visitante

        try {
            // Realiza la llamada a la API para obtener los equipos
            const response = await fetch('/api/users/equipos'); // Cambia la URL si es necesario
            if (!response.ok) {
                throw new Error('Error al obtener los equipos');
            }
            const data = await response.json(); // Convierte la respuesta a JSON
            setEquiposList(data); // Guarda los equipos en el estado
            setShowEquipoSelector(true); // Muestra el popup para seleccionar el equipo después de obtener los datos
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    // Efecto para manejar las partes
    useEffect(() => {
        if (equipos.Parte === "Primera parte") {
            finalizarPrimerTiempo();
        } else if (equipos.Parte === "Segunda parte") {
            finalizarPartido();
        }
    }, [tiempo]);

    // Efecto para manejar el cronómetro
    useEffect(() => {
        let intervalo;
        if (cronometroActivo) {
            intervalo = setInterval(() => {
                // Usa setEquipos para actualizar el tiempo de juego
                setEquipos((prevState) => {
                    const nuevoTiempo = prevState.TiempoDeJuego + 1;
                    if (nuevoTiempo === 1800 || nuevoTiempo === 3600) {
                        setTiempo(true);
                    }
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
        if (equipos.Parte === "Fin del primer tiempo") {
            setEquipos((prevState) => ({
                ...prevState,
                Parte: 'Segunda parte', // Cambia el estado de la parte
            }));
        }
        // Lógica para iniciar el partido si ambos sistemas defensivos están seleccionados
        console.log("Se inicia el cronometro");
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
        setTiempo(false);
    };

    // Maneja el fin del partido
    const finalizarPartido = () => {
        setEquipos((prevState) => ({
            ...prevState,
            TiempoDeJuego: 0, // Establece el tiempo a 00:00
            Parte: 'Fin del partido', // Cambia el estado a 'Fin del partido'
        }));
        detenerCronometro(); // Detiene el cronómetro si estaba activo
        setTextoBoton("Partido acabado"); // Cambia el texto del botón
        setTiempo(false);
    };

    const manejarClickFinPartido = async () => {
        if (!primerTiempoFinalizado) {
            finalizarPrimerTiempo(); // Si el primer tiempo no ha finalizado, lo finaliza
        } else {
            await finalizarPartido(); // Si el primer tiempo ya ha finalizado, finaliza el partido
        }
    };

    const {idPartido} = useParams();

    const obtenerUltimoEvento = async (idPartido) => {
        try {
            const url = idPartido
                ? `../api/users/eventos?idPartido=${idPartido}`
                : `../api/users/eventos`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            if (res.ok) {
                const data = await res.json();

                if (data.eventos && data.eventos.length > 0) {
                    const ultimoEvento = data.eventos[data.eventos.length - 1]; // Obtiene el último evento
                    return ultimoEvento; // Retorna el último evento
                } else {
                    console.log('No hay eventos disponibles.');
                    return null; // Devuelve null si no hay eventos
                }
            } else {
                console.error('Error al obtener los eventos');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
      };

      const eliminarEvento = async (idEvento) => {
        try {
            const res = await fetch(`../api/users/eventos?IdEvento=${idEvento}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.ok) {
                console.log('Evento eliminado correctamente');
                const data = await res.json(); // Si deseas obtener datos del evento eliminado
            } else {
                const errorData = await res.json(); // Captura el mensaje de error del servidor
                console.error('Error al eliminar el evento:', errorData.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    };
    
      const handleUndo = async () => {
        try {
            const ultimoEvento = await obtenerUltimoEvento(equipos.idPartido); // Asegúrate de que `equipos` contiene `idPartido`
            
            if (ultimoEvento) {
                console.log('Último evento a deshacer:', ultimoEvento);
                // Aquí puedes realizar la lógica de eliminación o reversión del evento
                // Ejemplo: Mostrar una alerta para confirmar la acción
                const confirmar = window.confirm(`¿Deseas deshacer el ultimo evento del jugador `+ ultimoEvento.IdJugador +`?`);
                
                if (confirmar) {
                    // Lógica para deshacer el evento en el backend o frontend
                    // Por ejemplo, hacer un DELETE en tu API
                    eliminarEvento(ultimoEvento.IdEvento);
                    alert('El evento se ha deshecho correctamente.');
                }
                setEventosUndo(true);
            } else {
                alert('No hay eventos para deshacer.');
            }
        } catch (error) {
            console.error('Error al deshacer el último evento:', error);
            alert('Hubo un error al intentar deshacer el último evento.');
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto h-auto bg-white rounded-lg flex flex-col md:flex-row items-center justify-between p-4 mb-8 shadow-md">
            {/* Escudos y Nombres de Equipos */}
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                {/* Equipo Local */}
                <div 
                    className="flex items-center mb-4 md:mb-0 mr-0 md:mr-8 cursor-pointer" 
                    onClick={() => manejarClickEquipo('local')}
                >
                    <Image 
                        src="/path/to/escudo1.png" 
                        alt="Escudo Equipo 1"
                        width={50}
                        height={50}
                        className="mr-2"
                    />
                    <span className="text-lg md:text-xl font-semibold text-black">{equipos.EquipoLocal}</span>
                </div>
    
                {/* Equipo Visitante */}
                <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => manejarClickEquipo('visitante')}
                >
                    <Image 
                        src="/path/to/escudo2.png" 
                        alt="Escudo Equipo 2"
                        width={50}
                        height={50}
                        className="mr-2"
                    />
                    <span className="text-lg md:text-xl font-semibold text-black">{equipos.EquipoVisitante}</span>
                </div>
            </div>
    
            {/* Marcador y Cronómetro */}
            <div className="flex flex-col items-center mb-4 md:mb-0">
                <span className="text-lg md:text-xl font-semibold text-black">Marcador: {equipos.MarcadorLocal} - {equipos.MarcadorVisitante}</span>
            </div>
    
            {/* Cronómetro y Botones */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex flex-col items-center text-center">
                    <span className="text-base md:text-lg font-semibold text-black">
                        Cronómetro: {formatearTiempo(equipos.Parte === "Segunda parte" ? equipos.TiempoDeJuego - 1800 : equipos.TiempoDeJuego)}
                    </span>
                    <span className="text-sm md:text-md font-semibold text-black">{equipos.Parte}</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    <button 
                        className={`px-4 py-2 rounded bg-blue-500 text-white ${
                            (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={manejarClickFinPartido}
                        disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante}
                    >
                        {textoBoton}
                    </button>
                    {equipos.Parte !== 'Fin del partido' && (
                        <>
                            <button 
                                className={`px-4 py-2 rounded bg-blue-500 text-white ${
                                    (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={iniciarCronometro}
                                disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante}
                            >
                                Iniciar
                            </button>
                            <button 
                                className={`px-4 py-2 rounded bg-red-500 text-white ${
                                    (!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={detenerCronometro}
                                disabled={!equipos.sistemaDefensivoLocal || !equipos.sistemaDefensivoVisitante}
                            >
                                Detener
                            </button>
                        </>
                    )}
                </div>
            </div>
    
            {/* Otros botones */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button 
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                    onClick={handleUndo}
                >
                    UNDO
                </button>
                <button
                    onClick={handleNavigateStats}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                    Estadísticas
                </button>
            </div>
            
            {/* Popup de Selección de Equipos */}
            {showEquipoSelector && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2 className={styles.popupTitle}>Selecciona un Equipo</h2>
                        {equiposList.length > 0 ? (
                            equiposList.map((equipo) => (
                                <div key={equipo.id} className={styles.equipoItem}>
                                    <button
                                        className={styles.equipoButton}
                                        onClick={() => seleccionarEquipo(equipo)}
                                    >
                                        {equipo.nombre}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Cargando equipos...</p>
                        )}
                        <button className={styles.closeButton} onClick={() => setShowEquipoSelector(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );    
};

export { BarraHorizontal };