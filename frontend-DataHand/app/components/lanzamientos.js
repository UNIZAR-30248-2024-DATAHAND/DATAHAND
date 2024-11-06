// lanzamientos.js

// Componente "Lanzamientos" que presenta dos canchas de balonmano (Zaragoza y Soria).
// Cada cancha incluye una sección superior con un sistema de cuadrícula para visualizar datos
// de rendimiento (goles/intentados) y una sección inferior que representa la cancha.
// Se utilizan etiquetas para mostrar posiciones específicas de los jugadores y sus estadísticas.
// El diseño es responsivo, con una cuadrícula que se ajusta a pantallas más grandes.


export default function Lanzamientos() {
    return (
      <div className="w-full bg-white">
        {/* Courts Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          
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

                {/* Nuevas etiquetas añadidas */}
                {/* <div className="absolute left-1/2 top-[86%] -translate-x-1/2 bg-blue-900 text-white rounded-full px-3 py-1 flex flex-col items-center">
                    <div className="text-xs">Centro 15M</div> 
                    {/* <div>1/1</div>
                </div> */}

                {/* Etiqueta de fondo */}
                <div className="absolute left-1/2 top-[55%] -translate-x-1/2 bg-gray-500 text-white rounded-full px-3 py-1 z-[-1]">
                    Fondo
                </div>
              </div>
            </div>
          </div>
  
          {/* Soria Court */}
          <div className="space-y-4">
            <h2 className="text-center font-bold text-[#45e5d6]">SORIA</h2>
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

                    {/* Nuevas etiquetas añadidas
                    <div className="absolute left-1/2 top-[86%] -translate-x-1/2 bg-blue-900 text-white rounded-full px-3 py-1 flex flex-col items-center">
                        <div className="text-xs">Centro 15M</div> {/* Nombre encima
                        {/* <div>1/1</div>
                    </div> */}

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
  