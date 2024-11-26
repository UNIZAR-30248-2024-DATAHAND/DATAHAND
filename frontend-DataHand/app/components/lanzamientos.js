// lanzamientos.js

// Componente "Lanzamientos" que presenta dos canchas de balonmano (Zaragoza y Soria).
// Cada cancha incluye una sección superior con un sistema de cuadrícula para visualizar datos
// de rendimiento (goles/intentados) y una sección inferior que representa la cancha.
// Se utilizan etiquetas para mostrar posiciones específicas de los jugadores y sus estadísticas.
// El diseño es responsivo, con una cuadrícula que se ajusta a pantallas más grandes. 

import { filtrarResultadoPorLocalizacion, filtrarResultadoPorPosicion}  from '../utils/calculosEstadistica'; 

export default function Lanzamientos({dataEventos, dataEquipos}) {

    //Variables del equipo local por POSICION
    const lanzamientosExtremoDerechoLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Ext Der\"", "local");
    const totalLanzamientosExtremoDerechoLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Ext Der\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Ext Der\"", "local") + lanzamientosExtremoDerechoLocal;
    const lanzamientosExtremoIzquierdoLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Ext Izq\"", "local");
    const totalLanzamientosExtremoIzquierdoLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Ext Izq\"", "local") + 
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Ext Izq\"", "local") + lanzamientosExtremoIzquierdoLocal;
    const lanzamientosLateralDerechoLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Der 9M\"", "local");
    const totalLanzamientosLateralDerechoLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Der 9M\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Der 9M\"", "local") + lanzamientosLateralDerechoLocal;
    const lanzamientosLateralIzquierdoLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Izq 9M\"", "local");
    const totalLanzamientosLateralIzquierdoLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Izq 9M\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Izq 9M\"", "local") + lanzamientosLateralIzquierdoLocal;
    const lanzamientosPivoteLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Piv\"", "local");
    const totalLanzamientosPivoteLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Piv\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Piv\"", "local") + lanzamientosPivoteLocal;
    const lanzamientosCentralLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Cen\"", "local");
    const totalLanzamientosCentralLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Cen\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Cen\"", "local") + lanzamientosCentralLocal;
    const lanzamientosCampoContrarioLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Campo Contrario\"", "local");
    const totalLanzamientosCampoContrarioLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Campo Contrario\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Campo Contrario\"", "local") + lanzamientosCampoContrarioLocal;
    const lanzamientos7MLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"7M\"", "local");
    const totalLanzamientos7MLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"7M\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"7M\"", "local") + lanzamientos7MLocal;
    const lanzamientosLateralDerecho6MLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Der 6M\"", "local");
    const totalLanzamientosLateralDerecho6MLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Der 6M\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Der 6M\"", "local") + lanzamientosLateralDerecho6MLocal;
    const lanzamientosLateralIzquierdo6MLocal = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Izq 6M\"", "local");
    const totalLanzamientosLateralIzquierdo6MLocal = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Izq 6M\"", "local") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Izq 6M\"", "local") + lanzamientosLateralIzquierdo6MLocal;

    //Variables del equipo visitante por POSICION
    const lanzamientosExtremoDerechoVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Ext Der\"", "visitante");
    const totalLanzamientosExtremoDerechoVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Ext Der\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Ext Der\"", "visitante") + lanzamientosExtremoDerechoVisitante;
    const lanzamientosExtremoIzquierdoVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Ext Izq\"", "visitante");
    const totalLanzamientosExtremoIzquierdoVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Ext Izq\"", "visitante") + 
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Ext Izq\"", "visitante") + lanzamientosExtremoIzquierdoVisitante;
    const lanzamientosLateralDerechoVisitante= filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Der 9M\"", "visitante");
    const totalLanzamientosLateralDerechoVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Der 9M\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Der 9M\"", "visitante") + lanzamientosLateralDerechoVisitante;
    const lanzamientosLateralIzquierdoVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Izq 9M\"", "visitante");
    const totalLanzamientosLateralIzquierdoVisitante= filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Izq 9M\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Izq 9M\"", "visitante") + lanzamientosLateralIzquierdoVisitante;
    const lanzamientosPivoteVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Piv\"", "visitante");
    const totalLanzamientosPivoteVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Piv\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Piv\"", "visitante") + lanzamientosPivoteVisitante;
    const lanzamientosCentralVisitante= filtrarResultadoPorPosicion(dataEventos,"Gol","\"Cen\"", "visitante");
    const totalLanzamientosCentralVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Cen\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Cen\"", "visitante") + lanzamientosCentralVisitante;
    const lanzamientosCampoContrarioVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Campo Contrario\"", "visitante");
    const totalLanzamientosCampoContrarioVisitante= filtrarResultadoPorPosicion(dataEventos,"Parada","\"Campo Contrario\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Campo Contrario\"", "visitante") + lanzamientosCampoContrarioVisitante;
    const lanzamientos7MVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"7M\"", "visitante");
    const totalLanzamientos7MVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"7M\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"7M\"", "visitante") + lanzamientos7MVisitante;
    const lanzamientosLateralDerecho6MVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Der 6M\"", "visitante");
    const totalLanzamientosLateralDerecho6MVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Der 6M\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Der 6M\"", "visitante") + lanzamientosLateralDerecho6MVisitante;
    const lanzamientosLateralIzquierdo6MVisitante = filtrarResultadoPorPosicion(dataEventos,"Gol","\"Lat Izq 6M\"", "visitante");
    const totalLanzamientosLateralIzquierdo6MVisitante = filtrarResultadoPorPosicion(dataEventos,"Parada","\"Lat Izq 6M\"", "visitante") +
        filtrarResultadoPorPosicion(dataEventos,"Palo/Fuera","\"Lat Izq 6M\"", "visitante") + lanzamientosLateralIzquierdo6MVisitante;

    //Variables del equipo local por Localizacion
    const totalLocalizacion1Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","1","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","1","local");
    const localizacion2Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","2","local");
    const totalLocalizacion2Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","2","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","2","local") + localizacion2Local;
    const localizacion3Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","3","local");
    const totalLocalizacion3Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","3","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","3","local") + localizacion3Local;
    const localizacion4Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","4","local");
    const totalLocalizacion4Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","4","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","4","local") + localizacion4Local;
    const totalLocalizacion5Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","5","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","5","local");
    const localizacion6Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","6","local");
    const totalLocalizacion6Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","6","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","6","local") + localizacion6Local;
    const localizacion7Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","7","local");
    const totalLocalizacion7Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","7","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","7","local") + localizacion7Local;
    const localizacion8Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","8","local");
    const totalLocalizacion8Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","8","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","8","local") + localizacion8Local;
    const totalLocalizacion9Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","9","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","9","local");
    const localizacion10Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","10","local");
    const totalLocalizacion10Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","10","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","10","local") + localizacion10Local;
    const localizacion11Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","11","local");
    const totalLocalizacion11Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","11","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","11","local") + localizacion11Local;
    const localizacion12Local = filtrarResultadoPorLocalizacion(dataEventos,"Gol","12","local");
    const totalLocalizacion12Local = filtrarResultadoPorLocalizacion(dataEventos,"Parada","12","local") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","12","local") + localizacion12Local;

    //Variables del equipo visitante por Localizacion    
    const totalLocalizacion1Visitante = filtrarResultadoPorLocalizacion(dataEventos,"Parada","1","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","1","visitante");
    const localizacion2Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","2","visitante");
    const totalLocalizacion2Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","2","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","2","visitante") + localizacion2Visitante;
    const localizacion3Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","3","visitante");
    const totalLocalizacion3Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","3","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","3","visitante") + localizacion3Visitante;
    const localizacion4Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","4","visitante");
    const totalLocalizacion4Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","4","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","4","visitante") + localizacion4Visitante;
    const totalLocalizacion5Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","5","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","5","visitante");
    const localizacion6Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","6","visitante");
    const totalLocalizacion6Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","6","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","6","visitante") + localizacion6Visitante;
    const localizacion7Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","7","visitante");
    const totalLocalizacion7Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","7","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","7","visitante") + localizacion7Visitante;
    const localizacion8Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","8","visitante");
    const totalLocalizacion8Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","8","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","8","visitante") + localizacion8Visitante;
    const totalLocalizacion9Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","9","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","9","visitante");
    const localizacion10Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","10","visitante");
    const totalLocalizacion10Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","10","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","10","visitante") + localizacion10Visitante;
    const localizacion11Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","11","visitante");
    const totalLocalizacion11Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","11","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","11","visitante") + localizacion11Visitante;
    const localizacion12Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Gol","12","visitante");
    const totalLocalizacion12Visitante  = filtrarResultadoPorLocalizacion(dataEventos,"Parada","12","visitante") +
        filtrarResultadoPorLocalizacion(dataEventos,"Palo/Fuera","12","visitante") + localizacion12Visitante;

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
        
    return (
      <div className="w-full bg-white">
        {/* Courts Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          
          {/* Zaragoza Court */}
          <div className="space-y-4">
            <h2 className="text-center font-bold text-[#0f2d50]">{dataEquipos.EquipoLocal}</h2>
            <div className="relative aspect-[4/3] bg-[#0f2d50] rounded-lg overflow-hidden">
              
              {/* Top Section with Grid */}
              <div className="relative h-[45%] border-b-4 border-white">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 grid grid-cols-3 gap-3">
                    {/* Aumentar la altura de los cuadrados */}
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion2Local, totalLocalizacion2Local)}`}>
                        {localizacion2Local}/{totalLocalizacion2Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion3Local, totalLocalizacion3Local)}`}>
                        {localizacion3Local}/{totalLocalizacion3Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion4Local, totalLocalizacion4Local)}`}>
                        {localizacion4Local}/{totalLocalizacion4Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion6Local, totalLocalizacion6Local)}`}>
                        {localizacion6Local}/{totalLocalizacion6Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion7Local, totalLocalizacion7Local)}`}>
                        {localizacion7Local}/{totalLocalizacion7Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion8Local, totalLocalizacion8Local)}`}>
                        {localizacion8Local}/{totalLocalizacion8Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion10Local, totalLocalizacion10Local)}`}>
                        {localizacion10Local}/{totalLocalizacion10Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion11Local, totalLocalizacion11Local)}`}>
                        {localizacion11Local}/{totalLocalizacion11Local}
                    </div>
                    <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion12Local, totalLocalizacion12Local)}`}>
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
                <div className={`absolute left-[10%] top-[10%] ${cambiarColor(lanzamientosExtremoIzquierdoLocal, totalLanzamientosExtremoIzquierdoLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Extremo Izquierdo</div>
                    <div>{lanzamientosExtremoIzquierdoLocal}/{totalLanzamientosExtremoIzquierdoLocal}</div>
                </div>

                <div className={`absolute right-[10%] top-[10%] ${cambiarColor(lanzamientosExtremoDerechoLocal, totalLanzamientosExtremoDerechoLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Extremo derecho</div>
                    <div>{lanzamientosExtremoDerechoLocal}/{totalLanzamientosExtremoDerechoLocal}</div>
                </div>

                <div className={`absolute left-[20%] top-[35%] ${cambiarColor(lanzamientosLateralIzquierdo6MLocal, totalLanzamientosLateralIzquierdo6MLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Izquierda 6M</div>
                    <div>{lanzamientosLateralIzquierdo6MLocal}/{totalLanzamientosLateralIzquierdo6MLocal}</div>
                </div>

                <div className={`absolute left-1/2 top-[35%] -translate-x-1/2 ${cambiarColor(lanzamientosPivoteLocal, totalLanzamientosPivoteLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Centro 6M</div>
                    <div>{lanzamientosPivoteLocal}/{totalLanzamientosPivoteLocal}</div>
                </div>

                <div className={`absolute right-[20%] top-[35%] ${cambiarColor(lanzamientosLateralDerecho6MLocal, totalLanzamientosLateralDerecho6MLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Derecha 6M</div>
                    <div>{lanzamientosLateralDerecho6MLocal}/{totalLanzamientosLateralDerecho6MLocal}</div>
                </div>

                <div className={`absolute left-[20%] top-[60%] ${cambiarColor(lanzamientosLateralIzquierdoLocal, totalLanzamientosLateralIzquierdoLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Izquierda 9M</div>
                    <div>{lanzamientosLateralIzquierdoLocal}/{totalLanzamientosLateralIzquierdoLocal}</div>
                </div>

                <div className={`absolute left-1/2 top-[60%] -translate-x-1/2 ${cambiarColor(lanzamientosCentralLocal, totalLanzamientosCentralLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Centro 9M</div>
                    <div>{lanzamientosCentralLocal}/{totalLanzamientosCentralLocal}</div>
                </div>

                <div className={`absolute right-[20%] top-[60%] ${cambiarColor(lanzamientosLateralDerechoLocal, totalLanzamientosLateralDerechoLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Derecha 9M</div>
                    <div>{lanzamientosLateralDerechoLocal}/{totalLanzamientosLateralDerechoLocal}</div>
                </div>

                <div className={`absolute left-[34%] top-[80%] ${cambiarColor(lanzamientos7MLocal, totalLanzamientos7MLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">7 Metros</div>
                    <div>{lanzamientos7MLocal}/{totalLanzamientos7MLocal}</div>
                </div>

                <div className={`absolute left-[63%] top-[80%] -translate-x-1/2 ${cambiarColor(lanzamientosCampoContrarioLocal, totalLanzamientosCampoContrarioLocal)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                    <div className="text-xs">Campo Contrario</div>
                    <div>{lanzamientosCampoContrarioLocal}/{totalLanzamientosCampoContrarioLocal}</div>
                </div>

                {/* Etiqueta de fondo */}
                <div className="absolute left-1/2 top-[55%] -translate-x-1/2 bg-gray-500 text-white rounded-full px-3 py-1 z-[-1]">
                    Fondo
                </div>
              </div>
            </div>
          </div>
  
          {/* Soria Court */}
          <div className="space-y-4">
            <h2 className="text-center font-bold text-[#45e5d6]">{dataEquipos.EquipoVisitante}</h2>
              <div className="relative aspect-[4/3] bg-[#0f2d50] rounded-lg overflow-hidden">
                {/* Top Section with Grid */}
                <div className="relative h-[45%] border-b-4 border-white">
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 grid grid-cols-3 gap-3">
                        {/* Aumentar la altura de los cuadrados */}
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion2Visitante, totalLocalizacion2Visitante)}`}>
                            {localizacion2Visitante}/{totalLocalizacion2Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion3Visitante, totalLocalizacion3Visitante)}`}>
                            {localizacion3Visitante}/{totalLocalizacion3Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion4Visitante, totalLocalizacion4Visitante)}`}>
                            {localizacion4Visitante}/{totalLocalizacion4Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion6Visitante, totalLocalizacion6Visitante)}`}>
                            {localizacion6Visitante}/{totalLocalizacion6Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion7Visitante, totalLocalizacion7Visitante)}`}>
                            {localizacion7Visitante}/{totalLocalizacion7Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion8Visitante, totalLocalizacion8Visitante)}`}>
                            {localizacion8Visitante}/{totalLocalizacion8Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion10Visitante, totalLocalizacion10Visitante)}`}>
                            {localizacion10Visitante}/{totalLocalizacion10Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion11Visitante, totalLocalizacion11Visitante)}`}>
                            {localizacion11Visitante}/{totalLocalizacion11Visitante}
                        </div>
                        <div className={`text-white text-center p-5 border border-white ${cambiarColor(localizacion12Visitante, totalLocalizacion12Visitante)}`}>
                            {localizacion12Visitante}/{totalLocalizacion12Visitante}
                        </div>
                    </div>
                    
                    {/* Side Numbers - Bajar un poco los números de los lados */}
                    <div className="absolute left-8 top-[50%] -translate-y-1/2 text-white">{totalLocalizacion5Visitante}</div>
                    <div className="absolute right-8 top-[50%] -translate-y-1/2 text-white">{totalLocalizacion9Visitante}</div>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white">{totalLocalizacion1Visitante}</div>
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
                    <div className={`absolute left-[10%] top-[10%] ${cambiarColor(lanzamientosExtremoIzquierdoVisitante, totalLanzamientosExtremoIzquierdoVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Extremo Izquierdo</div>
                        <div>{lanzamientosExtremoIzquierdoVisitante}/{totalLanzamientosExtremoIzquierdoVisitante}</div>
                    </div>

                    <div className={`absolute right-[10%] top-[10%] ${cambiarColor(lanzamientosExtremoDerechoVisitante, totalLanzamientosExtremoDerechoVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Extremo derecho</div>
                        <div>{lanzamientosExtremoDerechoVisitante}/{totalLanzamientosExtremoDerechoVisitante}</div>
                    </div>

                    <div className={`absolute left-[20%] top-[35%] ${cambiarColor(lanzamientosLateralIzquierdo6MVisitante, totalLanzamientosLateralIzquierdo6MVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Izquierda 6M</div>
                        <div>{lanzamientosLateralIzquierdo6MVisitante}/{totalLanzamientosLateralIzquierdo6MVisitante}</div>
                    </div>

                    <div className={`absolute left-1/2 top-[35%] -translate-x-1/2 ${cambiarColor(lanzamientosPivoteVisitante, totalLanzamientosPivoteVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Centro 6M</div>
                        <div>{lanzamientosPivoteVisitante}/{totalLanzamientosPivoteVisitante}</div>
                    </div>

                    <div className={`absolute right-[20%] top-[35%] ${cambiarColor(lanzamientosLateralDerecho6MVisitante, totalLanzamientosLateralDerecho6MVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Derecha 6M</div>
                        <div>{lanzamientosLateralDerecho6MVisitante}/{totalLanzamientosLateralDerecho6MVisitante}</div>
                    </div>

                    <div className={`absolute left-[20%] top-[60%] ${cambiarColor(lanzamientosLateralIzquierdoVisitante, totalLanzamientosLateralIzquierdoVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Izquierda 9M</div>
                        <div>{lanzamientosLateralIzquierdoVisitante}/{totalLanzamientosLateralIzquierdoVisitante}</div>
                    </div>

                    <div className={`absolute left-1/2 top-[60%] -translate-x-1/2 ${cambiarColor(lanzamientosCentralVisitante, totalLanzamientosCentralVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Centro 9M</div>
                        <div>{lanzamientosCentralVisitante}/{totalLanzamientosCentralVisitante}</div>
                    </div>

                    <div className={`absolute right-[20%] top-[60%] ${cambiarColor(lanzamientosLateralDerechoVisitante, totalLanzamientosLateralDerechoVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Derecha 9M</div>
                        <div>{lanzamientosLateralDerechoVisitante}/{totalLanzamientosLateralDerechoVisitante}</div>
                    </div>

                    <div className={`absolute left-[34%] top-[80%] ${cambiarColor(lanzamientos7MVisitante, totalLanzamientos7MVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">7 Metros</div>
                        <div>{lanzamientos7MVisitante}/{totalLanzamientos7MVisitante}</div>
                    </div>

                    <div className={`absolute left-[63%] top-[80%] -translate-x-1/2 ${cambiarColor(lanzamientosCampoContrarioVisitante, totalLanzamientosCampoContrarioVisitante)} text-white rounded-full px-3 py-1 flex flex-col items-center`}>
                        <div className="text-xs">Campo Contrario</div>
                        <div>{lanzamientosCampoContrarioVisitante}/{totalLanzamientosCampoContrarioVisitante}</div>
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
    );
  }
  