// especifico-jugadores.js

// Este componente representa una página que muestra estadísticas específicas de un jugador en un partido de balonmano. 
// La interfaz se divide en dos columnas: la columna izquierda contiene varias tablas que presentan datos sobre las 
// estadísticas de ataque, estadísticas generales, tarjetas y eventos. La columna derecha muestra una representación 
// visual del campo de balonmano, con posiciones de jugadores y estadísticas relacionadas, así como una tabla de 
// eventos en una línea de tiempo. El encabezado de la página incluye el nombre del equipo y el jugador, 
// mientras que el diseño está optimizado para ser responsivo y se puede desplazar verticalmente.

import { Card } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { X } from "lucide-react";

export default function EspecificoJugadores() {
    
    return (
        <div className="w-full max-w-full mx-auto p-0 overflow-y-auto h-screen">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-lg font-medium text-center flex-1">ZARAGOZA BALONMANO - 19: MARIO H - cb</h1>
                <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
                    <X className="h-4 w-4" />
                </button>
            </div>
    
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
                                    <TableHead>FS/0</TableHead>
                                    <TableHead>S/0</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Ataque posicional", g: 0, fs: 0, s: 0 },
                                    { name: "Contraataque", g: 0, fs: 0, s: 0 },
                                    { name: "Contragol", g: 0, fs: 0, s: 0 },
                                    { name: "Total", g: 0, fs: 0, s: 0 },
                                ].map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.g}</TableCell>
                                        <TableCell>{row.fs}</TableCell>
                                        <TableCell>{row.s}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    {/* General Stats */}
                    <Card className="p-3">
                        <Table>
                            <TableBody>
                                {[
                                    { name: "Tiempo jugado", value: "-1:-8:-51" },
                                    { name: "Posesiones", value: "26" },
                                    { name: "Posesión eventos", value: "0" },
                                    { name: "Player Score", value: "2.4" },
                                ].map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell className="text-right">{row.value}</TableCell>
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
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>

                    {/* Events Table */}
                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>EVENTOS</TableHead>
                                    <TableHead>DEFENSA</TableHead>
                                    <TableHead>ATAQUE</TableHead>
                                    <TableHead>EVENTOS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { event: "Falta en ataque provocada", defense: 0, attack: 0, eventRight: "Falta en ataque cometida" },
                                    { event: "Error técnico provocado", defense: 0, attack: 0, eventRight: "Error técnico cometido" },
                                    { event: "Balón perdido provocado", defense: 0, attack: 0, eventRight: "Pérdida de balón" },
                                    { event: "2 min cometidos", defense: 0, attack: 0, eventRight: "2 min provocados" },
                                    { event: "7m cometidos", defense: 0, attack: 0, eventRight: "7m provocados" },
                                    { event: "7m + suspensión cometida", defense: 0, attack: 0, eventRight: "7 metros provocados + suspensión" },
                                    { event: "1&1 Perdido", defense: 0, attack: 0, eventRight: "1&1 ganado" },
                                    { event: "Falta cometida", defense: 0, attack: 0, eventRight: "Falta recibida" },
                                    { event: "Blocage", defense: 0, attack: 0, eventRight: "Lanzamiento bloqueado" },
                                ].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.event}</TableCell>
                                        <TableCell>{row.defense}</TableCell>
                                        <TableCell>{row.attack}</TableCell>
                                        <TableCell>{row.eventRight}</TableCell>
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
                                <div className="bg-red-500 text-white text-center p-5">3/3</div>
                                <div className="bg-red-500 text-white text-center p-5">3/3</div>
                                <div className="bg-yellow-500 text-white text-center p-5">2/3</div>
                                <div className="bg-[#0f2d50] text-white text-center p-5 border border-white">0/1</div>
                                <div className="bg-[#0f2d50] text-white text-center p-5 border border-white">0/0</div>
                                <div className="bg-yellow-500 text-white text-center p-5">2/3</div>
                                <div className="bg-red-500 text-white text-center p-5">12/12</div>
                                <div className="bg-orange-500 text-white text-center p-5">3/4</div>
                                <div className="bg-red-500 text-white text-center p-5">7/7</div>
                            </div>
                            
                            {/* Side Numbers - Bajar un poco los números de los lados */}
                            <div className="absolute left-8 top-[50%] -translate-y-1/2 text-white">4</div>
                            <div className="absolute right-8 top-[50%] -translate-y-1/2 text-white">3</div>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white">4</div>
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
                            <div className="absolute left-[10%] top-[10%] bg-orange-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Extremo Izquierdo</div> {/* Nombre encima */}
                                <div>3/4</div>
                            </div>
                            <div className="absolute right-[10%] top-[10%] bg-yellow-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Extremo derecho</div> {/* Nombre encima */}
                                <div>3/5</div>
                            </div>
                            <div className="absolute left-[20%] top-[35%] bg-yellow-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Izquierda 6M</div> {/* Nombre encima */}
                                <div>4/7</div>
                            </div>
                            <div className="absolute left-1/2 top-[35%] -translate-x-1/2 bg-red-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Centro 6M</div> {/* Nombre encima */}
                                <div>11/12</div>
                            </div>
                            <div className="absolute right-[20%] top-[35%] bg-yellow-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Derecha 6M</div> {/* Nombre encima */}
                                <div>4/9</div>
                            </div>

                            {/* Nuevas etiquetas añadidas */}
                            <div className="absolute left-[20%] top-[60%] bg-gray-800 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Izquierda 9M</div> {/* Nombre encima */}
                                <div>1/1</div>
                            </div>
                            <div className="absolute left-1/2 top-[60%] -translate-x-1/2 bg-green-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Centro 9M</div> {/* Nombre encima */}
                                <div>2/3</div>
                            </div>
                            <div className="absolute right-[20%] top-[60%] bg-green-800 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Derecha 9M</div> {/* Nombre encima */}
                                <div>3/6</div>
                            </div>

                            {/* Nuevas etiquetas añadidas */}
                            <div className="absolute left-[34%] top-[80%] bg-blue-900 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">7 Metros</div> {/* Nombre encima */}
                                <div>1/1</div>
                            </div>
                            <div className="absolute left-[63%] top-[80%] -translate-x-1/2 bg-green-500 text-white rounded-full px-3 py-1 flex flex-col items-center">
                                <div className="text-xs">Campo Contrario</div> {/* Nombre encima */}
                                <div>2/3</div>
                            </div>


                            {/* Etiqueta de fondo */}
                            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 bg-gray-500 text-white rounded-full px-3 py-1 z-[-1]">
                                Fondo
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Timeline Table */}
                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tiempo</TableHead>
                                    <TableHead>Evento</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { time: "T1-21:41 -14:42:25", event: "GOAL_ASSIST" },
                                    { time: "T1-23:15 -14:43:59", event: "GOAL_ASSIST" },
                                    { time: "T2-09:27 -14:55:13", event: "GOAL_ASSIST" },
                                    { time: "T2-11:19 -14:57:05", event: "GOAL_ASSIST" },
                                    { time: "T2-15:50 -15:01:36", event: "GOAL_ASSIST" },
                                ].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.event}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    )
}
