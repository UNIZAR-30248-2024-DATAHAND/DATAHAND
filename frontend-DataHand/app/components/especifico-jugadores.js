// especifico-jugadores.js

// Este componente representa una página que muestra estadísticas específicas de un jugador en un partido de balonmano. 
// La interfaz se divide en dos columnas: la columna izquierda contiene varias tablas que presentan datos sobre las 
// estadísticas de ataque, estadísticas generales, tarjetas y eventos. La columna derecha muestra una representación 
// visual del campo de balonmano, con posiciones de jugadores y estadísticas relacionadas, así como una tabla de 
// eventos en una línea de tiempo. El encabezado de la página incluye el nombre del equipo y el jugador, 
// mientras que el diseño está optimizado para ser responsivo y se puede desplazar verticalmente.

import { obtenerResultadoJugador, obtenerSuspensionJugador, obtenerAccionJugador, filtrarResultadoPorLocalizacionJugador, filtrarResultadoPorPosicionJugador}  from '../utils/calculosEstadistica'; 
import { useState , useEffect} from "react";
import { Card } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { X } from "lucide-react";

export default function EspecificoJugadores({dataEventos, dataEquipos}) {
    //Aqui de alguna manera habra que ver si es entrenador o jugador para mostrarle el nombre del jugador o una pestaña con todos sus jugadores
    // Simulamos la condición de si el usuario es entrenador
    const isEntrenador = true; // Cambia a false para probar la otra condición
    const jugadorFalso = "2";
    const jugadores = [
        { id: 1, nombre: "Jugador 1" },
        { id: 2, nombre: "Jugador 2" },
        { id: 3, nombre: "Jugador 3" },
        { id: 4, nombre: "Jugador 4" },
        { id: 5, nombre: "Jugador 5" },
        { id: 6, nombre: "Jugador 6" },
        { id: 7, nombre: "Jugador 7" },
        { id: 8, nombre: "Jugador 8" },
        { id: 9, nombre: "Jugador 9" },
    ];

    const cambiarColor = (lanzamientos, total) => {
        // Si el total es 0, asignamos el color azul
        if (total === 0) {
            return "bg-[#0f2d50]"; // Azul si no ha habido lanzamientos
        }
        
        // Si el total no es 0, calculamos el porcentaje
        const porcentaje = (lanzamientos / total) * 100;
    
        if (porcentaje === 100) {
            return "bg-green-800"; // Verde oscuro si es 100%
        } else if (porcentaje >= 80) {
            return "bg-green-500"; // Verde claro si es superior o igual a 80%
        } else if (porcentaje >= 60) {
            return "bg-yellow-500"; // Amarillo si es entre 60% y 79.99%
        } else if (porcentaje >= 40) {
            return "bg-orange-500"; // Naranja si es entre 40% y 59.99%
        } else if (porcentaje >= 20) {
            return "bg-red-300"; // Rojo claro si es entre 20% y 39.99%
        } else {
            return "bg-red-500"; // Rojo oscuro si es menor al 20%
        }
    };

    const golesAtaquePosicional = obtenerResultadoJugador(dataEventos, "Gol", "Ataque posicional", jugadorFalso);
    const golesContraataque = obtenerResultadoJugador(dataEventos, "Gol", "Contraataque", jugadorFalso);
    const golesContragol = obtenerResultadoJugador(dataEventos, "Gol", "Contragol", jugadorFalso);
    const golesTotal = golesAtaquePosicional + golesContraataque + golesContragol;
    const paradasAtaquePosicional = obtenerResultadoJugador(dataEventos, "Parada", "Ataque posicional", jugadorFalso); 
    const paradasContraataque = obtenerResultadoJugador(dataEventos, "Parada", "Contraataque", jugadorFalso);
    const paradasContragol = obtenerResultadoJugador(dataEventos, "Parada", "Contragol", jugadorFalso);
    const paradasTotal = paradasAtaquePosicional + paradasContraataque + paradasContragol;
    const fallosAtaquePosicional = obtenerResultadoJugador(dataEventos, "Palo/Fuera", "Ataque posicional", jugadorFalso);
    const fallosContraataque = obtenerResultadoJugador(dataEventos, "Palo/Fuera", "Contraataque", jugadorFalso);
    const fallosContragol = obtenerResultadoJugador(dataEventos, "Palo/Fuera", "Contragol", jugadorFalso);
    const fallosTotal = fallosAtaquePosicional + fallosContraataque + fallosContragol;

    const suspension2M = obtenerSuspensionJugador(dataEventos, "2 Minutos", jugadorFalso);
    const tarjetaAmarilla = obtenerSuspensionJugador(dataEventos, "Tarjeta Amarilla", jugadorFalso);
    const tarjetaRoja = obtenerSuspensionJugador(dataEventos, "Tarjeta Roja", jugadorFalso);
    const tarjetaAzul = obtenerSuspensionJugador(dataEventos, "Tarjeta Azul", jugadorFalso);

    const perdidaDeBalonAtaquePosicional = obtenerResultadoJugador(dataEventos, "Perdida de balon", "Ataque posicional", jugadorFalso);
    const perdidaDeBalonContraataque = obtenerResultadoJugador(dataEventos, "Perdida de balon", "Contraataque", jugadorFalso);
    const perdidaDeBalonContragol = obtenerResultadoJugador(dataEventos, "Perdida de balon", "Contragol", jugadorFalso);
    const perdidaDeBalonTotal = perdidaDeBalonAtaquePosicional + perdidaDeBalonContraataque + perdidaDeBalonContragol;
    const faltasRecibidas = obtenerAccionJugador(dataEventos, "Falta", jugadorFalso);
    const dosMinProvocados = obtenerAccionJugador(dataEventos, "2 Min provocado", jugadorFalso);
    const sieteMProvocados = obtenerAccionJugador(dataEventos, "7m provocado", jugadorFalso);
    const sieteMSuspensionProvocado = obtenerAccionJugador(dataEventos, "7m + 2m", jugadorFalso);
    const unoUnoGanado = obtenerAccionJugador(dataEventos, "1c1 ganado", jugadorFalso);
    const lanzamientosBloqueados = obtenerAccionJugador(dataEventos, "Lanzamiento bloqueado", jugadorFalso);

    //Lanzamientos del jugador
    const golesExtDer = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Ext Der\"", "local", jugadorFalso);
    const totalExtDer = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Ext Der\"", "local", jugadorFalso) + 
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Ext Der\"", "local", jugadorFalso) + golesExtDer;
    const golesExtIzq = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Ext Izq\"", "local", jugadorFalso);
    const totalExtIzq = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Ext Izq\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Ext Izq\"", "local", jugadorFalso) + golesExtIzq;
    const golesLatDer9M = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Lat Der 9M\"", "local", jugadorFalso);
    const totalLatDer9M = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Lat Der 9M\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Lat Der 9M\"", "local", jugadorFalso) + golesLatDer9M;
    const golesLatIzq9M = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Lat Izq 9M\"", "local", jugadorFalso);
    const totalLatIzq9M = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Lat Izq 9M\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Lat Izq 9M\"", "local", jugadorFalso) + golesLatIzq9M;
    const golesPivote = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Piv\"", "local", jugadorFalso);
    const totalPivote = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Piv\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Piv\"", "local", jugadorFalso) + golesPivote;
    const golesCentral = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Cen\"", "local", jugadorFalso);
    const totalCentral = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Cen\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Cen\"", "local", jugadorFalso) + golesCentral;
    const golesCampoContrario = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Campo contrario\"", "local", jugadorFalso);
    const totalCampoContrario = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Campo contrario\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Campo contrario\"", "local", jugadorFalso) + golesCampoContrario;
    const goles7M = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"7M\"", "local", jugadorFalso);
    const total7M = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"7M\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"7M\"", "local", jugadorFalso) + goles7M;
    const golesLatDer6M = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Lat Der 6M\"", "local", jugadorFalso);
    const totalLatDer6M = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Lat Der 6M\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Lat Der 6M\"", "local", jugadorFalso) + golesLatDer6M;
    const golesLatIzq6M = filtrarResultadoPorPosicionJugador(dataEventos,"Gol","\"Lat Izq 6M\"", "local", jugadorFalso);
    const totalLatIzq6M = filtrarResultadoPorPosicionJugador(dataEventos, "Parada", "\"Lat Izq 6M\"", "local", jugadorFalso) +
        filtrarResultadoPorPosicionJugador(dataEventos, "Palo/Fuera", "\"Lat Izq 6M\"", "local", jugadorFalso) + golesLatIzq6M;

    //Variables del equipo local por Localizacion
    const totalLocalizacion1Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","1","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","1","local", jugadorFalso);
    const localizacion2Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","2","local", jugadorFalso);
    const totalLocalizacion2Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","2","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","2","local", jugadorFalso) + localizacion2Local;
    const localizacion3Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","3","local", jugadorFalso);
    const totalLocalizacion3Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","3","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","3","local", jugadorFalso) + localizacion3Local;
    const localizacion4Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","4","local", jugadorFalso);
    const totalLocalizacion4Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","4","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","4","local", jugadorFalso) + localizacion4Local;
    const totalLocalizacion5Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","5","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","5","local", jugadorFalso);
    const localizacion6Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","6","local", jugadorFalso);
    const totalLocalizacion6Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","6","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","6","local", jugadorFalso) + localizacion6Local;
    const localizacion7Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","7","local", jugadorFalso);
    const totalLocalizacion7Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","7","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","7","local", jugadorFalso) + localizacion7Local;
    const localizacion8Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","8","local", jugadorFalso);
    const totalLocalizacion8Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","8","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","8","local", jugadorFalso) + localizacion8Local;
    const totalLocalizacion9Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","9","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","9","local", jugadorFalso);
    const localizacion10Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","10","local", jugadorFalso);
    const totalLocalizacion10Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","10","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","10","local", jugadorFalso) + localizacion10Local;
    const localizacion11Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","11","local", jugadorFalso);
    const totalLocalizacion11Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","11","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","11","local", jugadorFalso) + localizacion11Local;
    const localizacion12Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Gol","12","local", jugadorFalso);
    const totalLocalizacion12Local = filtrarResultadoPorLocalizacionJugador(dataEventos,"Parada","12","local", jugadorFalso) +
        filtrarResultadoPorLocalizacionJugador(dataEventos,"Palo/Fuera","12","local", jugadorFalso) + localizacion12Local;

    // Estado para rastrear si la pestaña está visible
    const [mostrarPestana, setMostrarPestana] = useState(false);

    // Estado para el jugador seleccionado
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(jugadores[0]);

    // Función para manejar la selección de un jugador
    const handleJugadorClick = (jugador) => {
        setJugadorSeleccionado(jugador);
    };
    
    return (
        <div className="w-full max-w-full mx-auto p-0 overflow-y-auto h-screen">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <h1 className="text-lg font-medium text-center flex-1">
                    {dataEquipos.EquipoLocal} -  {isEntrenador ? `Seleccionado: ${jugadorSeleccionado.nombre}` : "Mario Hernández"}
                </h1>
            </div>

            {/* Pestaña de jugadores (solo para entrenador) */}
            {isEntrenador && (
                <div className="bg-gray-50 shadow p-2 rounded-lg mb-4">
                    <button
                        className="w-full text-left text-base font-bold text-blue-600"
                        onClick={() => setMostrarPestana(!mostrarPestana)}
                    >
                        {mostrarPestana ? "Ocultar Jugadores" : "Mostrar Jugadores"}
                    </button>
                    {mostrarPestana && (
                        <div
                            className="mt-2 max-h-40 overflow-y-auto space-y-1 border-t border-gray-300 pt-2"
                        >
                            {jugadores.map((jugador) => (
                                <div
                                    key={jugador.id}
                                    className={`cursor-pointer p-2 rounded-md text-center text-sm font-medium ${
                                        jugadorSeleccionado.id === jugador.id
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleJugadorClick(jugador)}
                                >
                                    {jugador.nombre}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}


            {/* Main content */}
            <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Attack Stats Table */}
                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Stats</TableHead>
                                    <TableHead>G/0</TableHead>
                                    <TableHead>F/0</TableHead>
                                    <TableHead>P/0</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Ataque posicional", g: golesAtaquePosicional, f: fallosAtaquePosicional, p: paradasAtaquePosicional },
                                    { name: "Contraataque", g: golesContraataque, f: fallosContraataque, p: paradasContraataque },
                                    { name: "Contragol", g: golesContragol, f: fallosContragol, p: paradasContragol },
                                    { name: "Total", g: golesTotal, f: fallosTotal, p: paradasTotal },
                                ].map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.g}</TableCell>
                                        <TableCell>{row.f}</TableCell>
                                        <TableCell>{row.p}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>


                    {/* Card Stats */}
                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>2min</TableHead>
                                    <TableHead>Tarjeta amarilla</TableHead>
                                    <TableHead>Tarjeta roja</TableHead>
                                    <TableHead>Tarjeta azul</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{suspension2M}</TableCell>
                                    <TableCell>{tarjetaAmarilla}</TableCell>
                                    <TableCell>{tarjetaRoja}</TableCell>
                                    <TableCell>{tarjetaAzul}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>

                    {/* Events Table */}
                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ATAQUE</TableHead>
                                    <TableHead>EVENTOS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[  
                                    { event: "Pérdida de balón", attack: perdidaDeBalonTotal, },
                                    { event: "Faltas recibidas", attack: faltasRecibidas },   
                                    { event: "2 min provocados",  attack: dosMinProvocados, },
                                    { event: "7m provocados", attack: sieteMProvocados,},
                                    { event: "7m + suspensión provocado",  attack: sieteMSuspensionProvocado},
                                    { event: "1&1 ganado", attack: unoUnoGanado },
                                    { event: "Lanzamientos bloqueados",attack: lanzamientosBloqueados},
                                ].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.event}</TableCell>
                                        <TableCell>{row.attack}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Zaragoza Court */}
                    <div className="space-y-4">
                        <h2 className="text-center font-bold text-[#0f2d50]">ZARAGOZA BALONMANO</h2>
                        <div className="relative aspect-[4/3] bg-[#0f2d50] rounded-lg overflow-hidden">
                        
                        {/* Top Section with Grid */}
                        <div className="relative h-[45%] border-b-4 border-white">
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 grid grid-cols-3 gap-3">
                                {/* Aumentar la altura de los cuadrados */}
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion2Local, totalLocalizacion2Local)}`}>
                                    {localizacion2Local}/{totalLocalizacion2Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion3Local, totalLocalizacion3Local)}`}>
                                    {localizacion3Local}/{totalLocalizacion3Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion4Local, totalLocalizacion4Local)}`}>
                                    {localizacion4Local}/{totalLocalizacion4Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion6Local, totalLocalizacion6Local)}`}>
                                    {localizacion6Local}/{totalLocalizacion6Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion7Local, totalLocalizacion7Local)}`}>
                                    {localizacion7Local}/{totalLocalizacion7Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion8Local, totalLocalizacion8Local)}`}>
                                    {localizacion8Local}/{totalLocalizacion8Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion10Local, totalLocalizacion10Local)}`}>
                                    {localizacion10Local}/{totalLocalizacion10Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion11Local, totalLocalizacion11Local)}`}>
                                    {localizacion11Local}/{totalLocalizacion11Local}
                                </div>
                                <div className={`bg-[#0f2d50] text-white text-center p-5 border border-white ${cambiarColor(localizacion12Local, totalLocalizacion12Local)}`}>
                                    {localizacion12Local}/{totalLocalizacion12Local}
                                </div>
                            </div>
                            
                            {/* Side Numbers - Bajar un poco los números de los lados */}
                            <div className="absolute left-8 top-[50%] -translate-y-1/2 text-white">{totalLocalizacion5Local}</div>
                            <div className="absolute right-8 top-[50%] -translate-y-1/2 text-white">{totalLocalizacion9Local}</div>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white">{totalLocalizacion1Local}</div>
                        </div>


                        {/* Sección inferior con la cancha orientada verticalmente */}
                        <div className="relative h-[55%] bg-blue-500">
                            <div className="absolute inset-0 border-2 border-white">
                                {/* Área de gol, ahora ubicada en la parte superior como un semicírculo azul */}
                                <div className="absolute top-0 inset-x-40 h-[30%] bg-blue-800 rounded-b-full" />          
                                
                                {/* Línea central vertical */}
                                <div className="absolute top-1/4 left-1/2 w-1/6 h-0.5 bg-white transform -translate-x-1/2" />
                                
                                {/* Línea curva para el área, orientada hacia arriba */}
                                <div className="absolute top-0 left-0 w-full h-2/4 border-b-4 border-dashed border-white rounded-b-full" />
                            </div>

                            {/* Etiquetas de posición, ajustadas para la orientación vertical */}
                            <div className={`absolute left-[10%] top-[10%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesExtIzq, totalExtIzq)}`}>
                                <div className="text-xs">Extremo Izquierdo</div>
                                <div>{golesExtIzq}/{totalExtIzq}</div>
                            </div>
                            <div className={`absolute right-[10%] top-[10%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesExtDer, totalExtDer)}`}>
                                <div className="text-xs">Extremo derecho</div>
                                <div>{golesExtDer}/{totalExtDer}</div>
                            </div>
                            <div className={`absolute left-[20%] top-[35%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesLatIzq6M, totalLatIzq6M)}`}>
                                <div className="text-xs">Izquierda 6M</div>
                                <div>{golesLatIzq6M}/{totalLatIzq6M}</div>
                            </div>
                            <div className={`absolute left-1/2 top-[35%] -translate-x-1/2 text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesPivote, totalPivote)}`}>
                                <div className="text-xs">Centro 6M</div>
                                <div>{golesPivote}/{totalPivote}</div>
                            </div>
                            <div className={`absolute right-[20%] top-[35%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesLatDer6M, totalLatDer6M)}`}>
                                <div className="text-xs">Derecha 6M</div>
                                <div>{golesLatDer6M}/{totalLatDer6M}</div>
                            </div>
                            <div className={`absolute left-[20%] top-[60%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesLatIzq9M, totalLatIzq9M)}`}>
                                <div className="text-xs">Izquierda 9M</div>
                                <div>{golesLatIzq9M}/{totalLatIzq9M}</div>
                            </div>
                            <div className={`absolute left-1/2 top-[60%] -translate-x-1/2 text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesCentral, totalCentral)}`}>
                                <div className="text-xs">Centro 9M</div>
                                <div>{golesCentral}/{totalCentral}</div>
                            </div>
                            <div className={`absolute right-[20%] top-[60%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesLatDer9M, totalLatDer9M)}`}>
                                <div className="text-xs">Derecha 9M</div>
                                <div>{golesLatDer9M}/{totalLatDer9M}</div>
                            </div>
                            <div className={`absolute left-[34%] top-[80%] text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(goles7M, total7M)}`}>
                                <div className="text-xs">7 Metros</div>
                                <div>{goles7M}/{total7M}</div>
                            </div>
                            <div className={`absolute left-[63%] top-[80%] -translate-x-1/2 text-white rounded-full px-3 py-1 flex flex-col items-center ${cambiarColor(golesCampoContrario, totalCampoContrario)}`}>
                                <div className="text-xs">Campo Contrario</div>
                                <div>{golesCampoContrario}/{totalCampoContrario}</div>
                            </div>


                            {/* Etiqueta de fondo */}
                            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 bg-gray-500 text-white rounded-full px-3 py-1 z-[-1]">
                                Fondo
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
