import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';

const CampoBalonmano = ({ onClick }) => {
  const [cruzPosicion, setCruzPosicion] = useState(null); // Para guardar la posición de la cruz

  const handleClick = (event) => {
    const stage = event.target.getStage();
    if (stage) {
      const { x, y } = stage.getPointerPosition();
      setCruzPosicion({ x, y });
      if (onClick) {
        onClick({ x, y });
      }
    }
  };

  return (
    <Stage width={300} height={300} onClick={handleClick}>
      <Layer>
        {/* Rectángulo del medio campo de balonmano orientado hacia arriba */}
        <Rect
          x={0}
          y={0}
          width={300}  // Ancho del medio campo
          height={300}  // Altura extendida del campo
          fill="lightblue"
          stroke="white"
          strokeWidth={5}
        />
        
        {/* Líneas del campo */}
        <Rect x={0} y={0} width={300} height={300} fill="transparent" stroke="white" strokeWidth={5} />

        {/* Portería en la parte superior (norte) */}
        <Rect x={100} y={0} width={100} height={10} fill="white" />

        {/* Líneas 4 metros */}
        <Rect x={140} y={60} width={15} height={5} fill="white" />
        {/* Líneas 7 metros */}
        <Rect x={135} y={135} width={30} height={5} fill="white" />

        {/* Área de 6 metros (rectángulo cerca de la portería) */}
        <Circle x={150} y={0} radius={120} fill="transparent" stroke="white" strokeWidth={5} />

        {/* Área de 9 metros (arco) */}
        <Circle x={150} y={0} radius={160} fill="transparent" stroke="white" strokeWidth={5} dash={[10, 10]}/>

        {/* Círculo central (si es necesario) */}
        <Circle x={150} y={300} radius={50} fill="transparent" stroke="white" strokeWidth={5} />
        {/* Dibujar la cruz en la posición del clic */}
        {cruzPosicion && (
          <>
            {/* Línea vertical */}
            <Line points={[cruzPosicion.x, cruzPosicion.y - 10, cruzPosicion.x, cruzPosicion.y + 10]} stroke="red" strokeWidth={2}/>
            {/* Línea horizontal */}
            <Line points={[cruzPosicion.x - 10, cruzPosicion.y, cruzPosicion.x + 10, cruzPosicion.y]} stroke="red" strokeWidth={2}/>
          </>
        )}
      </Layer>
    </Stage>
  );
};

const PorteriaBalonmano = ({ onClick }) => {
  const width = 300; // Ancho de la portería
  const height = 200; // Altura de la portería
  const postThickness = 15; // Grosor de los postes
  const stripeHeight = height / 10; // Alto de cada franja
  
  const [cruzPorteria, setCruzPorteria] = useState(null); // Para guardar la posición de la cruz

  // Maneja el click en el Stage
  const handleClick = (event) => {
    const stage = event.target.getStage();
    if (stage) {
      const { x, y } = stage.getPointerPosition();  
      setCruzPorteria({ x, y });
      if (onClick) {
        onClick({ x, y }); // Pasa las coordenadas a la función onClick que recibes por props
      }
    }
  };

  // Función para generar las franjas rojo-blanco alternadas
  const createStripedPost = (x, y) => {
    const stripes = [];
    for (let i = 0; i < 10; i++) {
      stripes.push(
        <Rect
          key={i}
          x={x}
          y={y + i * stripeHeight} // Desplazar cada franja
          width={postThickness}
          height={stripeHeight}
          fill={i % 2 === 0 ? "red" : "white"} // Alternar entre rojo y blanco
          stroke="black"
          strokeWidth={2}
        />
      );
    }
    return stripes;
  };

  return (
    <Stage width={350} height={250} onClick={handleClick}>
      <Layer>
        {/* Fondo del área donde está la portería */}
        <Rect x={25} y={0} width={width} height={height} fill="transparent" />

        {/* Poste izquierdo */}
        {createStripedPost(35, 25)}

        {/* Poste derecho */}
        {createStripedPost(321, 25)}

        {/* Traversa superior */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Rect
            key={i}
            x={35 + i * (width / 10)} // Dividir la barra superior en franjas
            y={25}
            width={width / 10}
            height={postThickness}
            fill={i % 2 === 0 ? "red" : "white"} // Alternar entre rojo y blanco
            stroke="black"
            strokeWidth={2}
          />
        ))}

        {/* Líneas franja porteria */}
        <Line points={[138, 0, 138, 225]} stroke="grey" strokeWidth={3} dash={[10, 5]} />
        <Line points={[238, 0, 238, 225]} stroke="grey" strokeWidth={3} dash={[10, 5]} />
        <Line points={[25, 100, 375, 100]} stroke="grey" strokeWidth={3} dash={[10, 5]} />
        <Line points={[25, 160, 375, 160]} stroke="grey" strokeWidth={3} dash={[10, 5]} />
        
        {/* Dibujar la cruz en la posición del clic */}
        {cruzPorteria && (
          <>
            {/* Línea vertical */}
            <Line points={[cruzPorteria.x, cruzPorteria.y - 10, cruzPorteria.x, cruzPorteria.y + 10]} stroke="red" strokeWidth={2}/>
            {/* Línea horizontal */}
            <Line points={[cruzPorteria.x - 10, cruzPorteria.y, cruzPorteria.x + 10, cruzPorteria.y]} stroke="red" strokeWidth={2}/>
          </>
        )}

      </Layer>
    </Stage>
  );
};

const PopUpAccion = ({ showPopup, onClose, asistencias, seleccionado, faseDeJuego, resultado, tiempoJugado }) => {

  if (!showPopup) return null; // Si no se debe mostrar el popup, no renderizar nada

  const jugadoresAMostrar = seleccionado.equipo === 'local' ? asistencias.slice(0, 7) : asistencias.slice(7, 14);
  // Filtrar para excluir el jugador seleccionado
  const jugadoresFiltrados = jugadoresAMostrar.filter((jugador, index) => 
    seleccionado.index === null || index !== seleccionado.index
  );

  //Habra que enviar estos const + IdEvento, IdPartido, Jugador ,Minuto-segundo, Fase de juego, Resultado
  const [posicionLanzador, setPosicionLanzador] = useState(null);
  const [localizacionLanzamiento, setlocalizacionLanzamiento] = useState(null);
  const [asistenciaDada, setAsistenciaDada] = useState(null);
  const [sistemaAtaque, setSistemaAtaque] = useState(null);
  const [sistemaDefensa, setSistemaDefensa] = useState(null);

  // Función que maneja el clic en el campo y almacena las coordenadas
  const handlePosicionClick = (coords) => {
    setPosicionLanzador(coords); // Actualiza las coordenadas del campo
    console.log("Coordenadas del campo:", coords);
  };

  // Función que maneja el clic en la portería y almacena las coordenadas
  const handlePorteriaClick = (coords) => {
    setlocalizacionLanzamiento(coords); // Actualiza las coordenadas de la portería
    console.log("Coordenadas de la portería:", coords);
  };

  const handleGuardarDatos = () => {
    // Validaciones
  if (seleccionado.index === null) {
    alert("Falta seleccionar el jugador.");
    return;
  }
  if (!tiempoJugado) {
    alert("Falta registrar el tiempo de juego.");
    return;
  }
  if (!faseDeJuego) {
    alert("Falta definir la fase de juego.");
    return;
  }
  if (!resultado) {
    alert("Falta registrar el resultado.");
    return;
  }
  if (!posicionLanzador) {
    alert("Falta seleccionar la posición del lanzador.");
    return;
  }
  if (!localizacionLanzamiento) {
    alert("Falta seleccionar la localización del lanzamiento.");
    return;
  }
  if (!asistenciaDada) {
    alert("Falta seleccionar la asistencia dada.");
    return;
  }
  if (!sistemaAtaque) {
    alert("Falta seleccionar el sistema de ataque.");
    return;
  }
  if (!sistemaDefensa) {
    alert("Falta seleccionar el sistema de defensa.");
    return;
  }
    console.log("IdEvento: ");
    console.log("IdPartido: ");
    console.log("IdJugador:", seleccionado.index);
    console.log("Minuto-segundo:", tiempoJugado);
    console.log("Fase de juego:", faseDeJuego);
    console.log("Resultado:", resultado);
    console.log("Posición Lanzador:", posicionLanzador);
    console.log("Localización Lanzamiento:", localizacionLanzamiento);
    console.log("Asistencia Dada:", asistenciaDada);
    console.log("Sistema de Ataque:", sistemaAtaque);
    console.log("Sistema de Defensa:", sistemaDefensa);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Popup ocupa una gran parte de la pantalla y es naranja */}
      <div className="bg-orange-500 rounded-lg p-6 w-[80vw] h-[80vh] overflow-auto flex items-center justify-center">
          {/* Rectángulo blanco dentro del popup */}
          <div className="bg-white rounded-lg p-6 w-[90%] h-[90%] flex flex-row shadow-lg">
              {/* Columna izquierda */}
              <div className="flex flex-col flex-1 justify-between">
                  {/* Sección de Posición Gol */}
                  <div className="bg-gray-200 rounded-lg p-4 flex-grow flex flex-col items-center justify-center text-center mb-4">
                      <h3 className="text-sm font-semibold text-black">Posición Gol</h3>
                      <PorteriaBalonmano onClick={handlePorteriaClick} />
                      
                  </div>
                  {/* Sección de Posición Lanzador */}
                  <div className="bg-gray-200 rounded-lg p-4 flex-grow flex flex-col items-center justify-center text-center">
                      <h3 className="text-sm font-semibold text-black mb-4">Posición Lanzador</h3>
                      <CampoBalonmano onClick={handlePosicionClick} />
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
                        {jugadoresFiltrados.map((jugador, index) => (
                        <button
                          key={index}
                          onClick={() => setAsistenciaDada(jugador)}  // Guardamos el jugador seleccionado
                          className={`bg-blue-500 text-white px-4 py-2 rounded text-sm ${asistenciaDada === jugador ? 'opacity-80' : ''}`}  // Aplicamos clase de opacidad si está seleccionado
                        >
                          Jugador {jugador}
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
                                  <button
                                    key={index}
                                    onClick={() => setSistemaAtaque(index + 1)}  // Guardar la selección del sistema de ataque
                                    className={`bg-gray-200 text-black px-3 py-2 rounded text-sm ${sistemaAtaque === index + 1 ? 'opacity-80' : ''}`}  // Aplicar la clase "opacity-80" si está seleccionado
                                  >
                                    Ataque {index + 1}
                                  </button>
                              ))}
                          </div>
                      </div>
                      <div className="flex flex-col">
                          <h4 className="text-md font-semibold text-black mb-2">Defensa</h4>
                          <div className="grid grid-cols-5 gap-2">
                              {Array.from({ length: 10 }, (_, index) => (
                                  <button
                                    key={index + 10}
                                    onClick={() => setSistemaDefensa(index + 1)}  // Guardar la selección del sistema de defensa
                                    className={`bg-gray-200 text-black px-3 py-2 rounded text-sm ${sistemaDefensa === index + 1 ? 'opacity-80' : ''}`}  // Aplicar la clase "opacity-80" si está seleccionado
                                  >
                                    Defensa {index + 1}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
                  
                  {/* Botón de Guardar */}
                  <div className="flex justify-center">
                      <button 
                          className="bg-green-500 text-white px-6 py-2 rounded" 
                          onClick={handleGuardarDatos} // Cierra el popup
                      >
                          Guardar
                      </button>
                  </div>

                  {/* Botón de Cerrar */}
                  <div className="flex justify-center">
                      <button 
                          className="bg-red-500 text-white px-6 py-2 rounded" 
                          onClick={onClose} // Cierra el popup
                      >
                          Cerrar
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>

  );
};

export { CampoBalonmano, PorteriaBalonmano, PopUpAccion };