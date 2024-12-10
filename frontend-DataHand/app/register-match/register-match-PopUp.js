import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import { useRouter } from 'next/router';
import EventoAlerta from '../components/EventoAlerta'; // Importa la modal

const CampoBalonmano = ({ onClick }) => {
  //const [cruzPosicion, setCruzPosicion] = useState(null); // Para guardar la posición de la cruz
  const [selectedButton, setSelectedButton] = useState(null); // Para saber qué botón está seleccionado

  const posicionesPredefinidas = [
    { nombre: 'Ext Izq'},
    { nombre: 'Ext Der'},
    { nombre: 'Lat Izq 6M'},
    { nombre: 'Piv'},
    { nombre: 'Lat Der 6M'},
    { nombre: 'Lat Izq 9M'},
    { nombre: 'Cen'},
    { nombre: 'Lat Der 9M'},
    { nombre: '7M'},
    { nombre: 'Campo Contrario'},
  ];

  const handleSeleccionarPosicion = (posicion) => {
    if (onClick) {
      onClick(posicion.nombre);
    }
    setSelectedButton(posicion.nombre); // Marcar el botón como seleccionado
  };

  /*const handleClick = (event) => {
    const stage = event.target.getStage();
    if (stage) {
      const { x, y } = stage.getPointerPosition();
      setCruzPosicion({ x, y });
      if (onClick) {
        onClick({ x, y });
      }
    }
  };*/

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <div className="flex flex-wrap justify-center absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      {/* Primera fila (2 botones con más separación entre ellos) */}
      <div className="flex w-full justify-center space-x-40 mb-14">
        {posicionesPredefinidas.slice(0, 2).map((posicion) => (
          <button
            key={posicion.nombre}
            onClick={() => handleSeleccionarPosicion(posicion)}
            className={`${
              selectedButton === posicion.nombre ? 'bg-blue-700' : 'bg-blue-500'
            } text-white px-3 py-1 rounded text-xs transition duration-200 ease-in-out transform hover:scale-105`}
            style={{ width: '70px' }} // Tamaño reducido de los botones
          >
            {posicion.nombre}
          </button>
        ))}
      </div>

      {/* Segunda fila (1 botón con separación adicional respecto a la fila anterior) */}
      <div className="flex w-full justify-center mb-8 space-x-12">
        {posicionesPredefinidas.slice(2, 5).map((posicion) => (
          <button
            key={posicion.nombre}
            onClick={() => handleSeleccionarPosicion(posicion)}
            className={`${
              selectedButton === posicion.nombre ? 'bg-blue-700' : 'bg-blue-500'
            } text-white px-3 py-1 rounded text-xs transition duration-200 ease-in-out transform hover:scale-105`}
            style={{ width: '70px' }} // Tamaño reducido de los botones
          >
            {posicion.nombre}
          </button>
        ))}
      </div>

      {/* Tercera fila (3 botones con más separación entre filas) */}
      <div className="flex w-full justify-center mb-8 space-x-12">
        {posicionesPredefinidas.slice(5,8).map((posicion) => (
          <button
            key={posicion.nombre}
            onClick={() => handleSeleccionarPosicion(posicion)}
            className={`${
              selectedButton === posicion.nombre ? 'bg-blue-700' : 'bg-blue-500'
            } text-white px-3 py-1 rounded text-xs transition duration-200 ease-in-out transform hover:scale-105`}
            style={{ width: '70px' }} // Tamaño reducido de los botones
          >
            {posicion.nombre}
          </button>
        ))}
      </div>
      {/* Cuarta fila (2 botones con más separación entre filas) */}
      <div className="flex w-full justify-center mb-8 space-x-12">
        {posicionesPredefinidas.slice(8).map((posicion) => (
          <button
            key={posicion.nombre}
            onClick={() => handleSeleccionarPosicion(posicion)}
            className={`${
              selectedButton === posicion.nombre ? 'bg-blue-700' : 'bg-blue-500'
            } text-white px-3 py-1 rounded text-xs transition duration-200 ease-in-out transform hover:scale-105`}
            style={{ width: '70px' }} // Tamaño reducido de los botones
          >
            {posicion.nombre}
          </button>
        ))}
      </div>
    </div>

      <Stage width={300} height={300} onClick={handleSeleccionarPosicion}>
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
          <Circle x={150} y={0} radius={160} fill="transparent" stroke="white" strokeWidth={5} dash={[10, 10]} />

          {/* Círculo central (si es necesario) */}
          <Circle x={150} y={300} radius={50} fill="transparent" stroke="white" strokeWidth={5} />
        </Layer>
      </Stage>
    </div>
  );
};

const PorteriaBalonmano = ({ onClick }) => {
  const width = 300; // Ancho de la portería
  const height = 200; // Altura de la portería
  const postThickness = 15; // Grosor de los postes
  const stripeHeight = height / 10; // Alto de cada franja
  
  const [selectedButton, setSelectedButton] = useState(null); // Botón seleccionado

  const botonesPorFilas = [
    [{ id: 1 }],
    [{ id: 2 }, { id: 3 }, { id: 4 }],
    [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
    [{ id: 10 }, { id: 11 }, { id: 12 }],
  ];

  const handleSeleccionarBoton = (id) => {
    setSelectedButton(id);
    if (onClick) {
      onClick(id);
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
    <div style={{ position: 'relative', width: '350px', height: '250px' }}>
      {/* Contenedor de botones */}
      <div
        className="absolute w-full flex flex-col z-10 space-y-9" // Incrementa el margen entre filas
        style={{
          top: "0px", // Ajusta la altura inicial de los botones
          pointerEvents: "none", // Evitar interferencias al clicar en el Stage
        }}
      >
    {botonesPorFilas.map((fila, index) => (
      <div
        key={index}
        className="flex justify-center space-x-16"
        style={{ pointerEvents: "auto" }} // Reactivar interacción para botones
      >
        {fila.map(({ id }) => (
          <button
            key={id}
            onClick={() => handleSeleccionarBoton(id)}
            className={`${
              selectedButton === id ? "bg-blue-700" : "bg-blue-500"
            } text-white px-2 py-1 rounded text-xs transition transform hover:scale-105`}
          >
            {id}
          </button>
        ))}
      </div>
    ))}
  </div>

  {/* Portería (Stage) */}
  <Stage width={350} height={250} onClick={handleSeleccionarBoton}>
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

    </Layer>
  </Stage>
</div>
  );
};

const PopUpAccion = ({ showPopup, onClose, asistencias, seleccionado, faseDeJuego, resultado, tiempoJugado, idPartido, equipos, setEquipos }) => {

  if (!showPopup) return null; // Si no se debe mostrar el popup, no renderizar nada

  const jugadoresAMostrar = seleccionado.equipo === 'local' ? asistencias.slice(0, 7) : asistencias.slice(7, 14);
  // Filtrar para excluir el jugador seleccionado
  const jugadoresFiltrados = jugadoresAMostrar.filter((jugador, index) => 
    seleccionado.index === null || index !== seleccionado.index
  );

  //Habra que enviar estos const + IdEvento, IdPartido, Jugador ,Minuto-segundo, Fase de juego, Resultado
  const [posicionLanzador, setPosicionLanzador] = useState(null);
  const [localizacionLanzamiento, setLocalizacionLanzamiento] = useState(null);
  const [asistenciaDada, setAsistenciaDada] = useState(null);
  const [sistemaAtaque, setSistemaAtaque] = useState(null);
  const [sistemaDefensa, setSistemaDefensa] = useState(null);

  const [datosEvento, setDatosEvento] = useState({
    IdPartido: null,
    IdJugador: null,
    IdPortero: null,
    EquipoJugador: null,
    MinSeg: null,
    faseDeJuego: null,
    resultado: null,
    posicionLanzador: null,
    localizacionLanzamiento: null,
    asistenciaDada: null,
    sistemaAtaque: null,
    sistemaDefensa: null
  });


  // Función que maneja el clic en el campo y almacena las coordenadas
  const handlePosicionClick = (coords) => {
    setPosicionLanzador(coords); // Actualiza las coordenadas del campo
    console.log("Coordenadas del campo:", coords);
  };

  // Función que maneja el clic en la portería y almacena las coordenadas
  const handlePorteriaClick = (coords) => {
    setLocalizacionLanzamiento(coords); // Actualiza las coordenadas de la portería
    console.log("Coordenadas de la portería:", coords);
  };

  //HASTA AQUI
  const [eventoRegistrado, setEventoRegistrado] = useState(false); // Booleano de control

  // Función para marcar gol
  const marcarGol = (equipo) => {
    setEquipos((prevEquipos) => {
        if (equipo === "local") {
            return {
                ...prevEquipos,
                MarcadorLocal: prevEquipos.MarcadorLocal + 1,
            };
        } else if (equipo === "visitante") {
            return {
                ...prevEquipos,
                MarcadorVisitante: prevEquipos.MarcadorVisitante + 1,
            };
        } else {
            console.warn("Equipo desconocido al intentar marcar gol:", equipo);
            return prevEquipos; // Devuelve el estado anterior si el equipo no es válido
        }
    });
  };

  // useEffect para actualizar datosEvento solo si todos los datos están completos
  useEffect(() => {
    // Solo actualizar datosEvento si todos los datos están completos y no se ha registrado un evento
    console.log("Valores actuales antes de la actualización:", {
      IdPartido: idPartido,
      IdJugador: equipos[seleccionado.equipo].jugadores[seleccionado.index],
      IdPortero: seleccionado.equipo === 'local' 
          ? equipos.visitante.porteros[0] 
          : equipos.local.porteros[0], 
      EquipoJugador: seleccionado.equipo,
      MinSeg: tiempoJugado,
      faseDeJuego,
      resultado,
      posicionLanzador,
      localizacionLanzamiento,
      asistenciaDada,
      sistemaAtaque,
      sistemaDefensa,
      eventoRegistrado
    });

    if (!eventoRegistrado && 
        equipos[seleccionado.equipo].jugadores[seleccionado.index] !== null &&
        tiempoJugado &&
        faseDeJuego &&
        resultado &&
        posicionLanzador &&
        localizacionLanzamiento &&
        asistenciaDada &&
        sistemaAtaque &&
        sistemaDefensa
    ) {
      console.log('Entro en el if');
      // Actualizar el estado de datosEvento
      setDatosEvento({
        IdPartido: idPartido,
        IdJugador: equipos[seleccionado.equipo].jugadores[seleccionado.index],
        IdPortero: seleccionado.equipo === 'local' 
          ? equipos.visitante.porteros[0] 
          : equipos.local.porteros[0],
        EquipoJugador: seleccionado.equipo,
        MinSeg: tiempoJugado,
        faseDeJuego,
        resultado,
        posicionLanzador: JSON.stringify(posicionLanzador), // Convertir a string
        localizacionLanzamiento: JSON.stringify(localizacionLanzamiento), // Convertir a string
        asistenciaDada,
        sistemaAtaque,
        sistemaDefensa
      });
      console.log('Datos del evento a registrar:', datosEvento);
    }
  }, [
    seleccionado.index,
    faseDeJuego,
    resultado,
    posicionLanzador,
    localizacionLanzamiento,
    asistenciaDada,
    sistemaAtaque,
    sistemaDefensa,
    eventoRegistrado // Añadido para controlar el registro del evento
  ]);

  // useEffect para registrar el evento cuando datosEvento cambia
  useEffect(() => {
    if (eventoRegistrado) return; // Si el evento ya se registró, no hacer nada

    // Verificar si todos los datos del evento están completos
    if (
      datosEvento.IdJugador !== undefined &&
      datosEvento.IdPortero !== undefined &&
      datosEvento.EquipoJugador !== undefined &&
      datosEvento.MinSeg &&
      datosEvento.faseDeJuego &&
      datosEvento.resultado &&
      datosEvento.posicionLanzador &&
      datosEvento.localizacionLanzamiento &&
      datosEvento.asistenciaDada &&
      datosEvento.sistemaAtaque &&
      datosEvento.sistemaDefensa
    ) {
      // Llamar a la función para registrar el evento
      registrarEvento(); 

      // Marcar el evento como registrado
      if (resultado === "Gol") {
        console.log("Gol detectado");
        marcarGol(seleccionado.equipo);
      }

      // Reset de variable
      setEventoRegistrado(true);
    }
  }, [datosEvento, eventoRegistrado]); // Cambiar solo si cambia datosEvento o eventoRegistrado 

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);


  const customConfirm = (mensaje) => {
    return new Promise((resolve) => {
        setMensajeAlerta(mensaje); // Establece el mensaje
        // setAlertaVisible(true); // Muestra la alerta

        // Define la función que resolverá la promesa
        setOnConfirm(() => (response) => {
            setAlertaVisible(false); // Oculta la alerta
            resolve(response); // Devuelve la respuesta
        });
    });
  };


  // Función para registrar un partido
  const registrarEvento = async () => {
    try {
      // const confirmacion = await customConfirm(`Se ha registrado un evento de: ${datosEvento.resultado} del jugador: ${datosEvento.IdJugador}`);
      
      // if (!confirmacion) {
      //   console.log('El usuario canceló la acción.');
      //   return; // Detener el flujo si el usuario cancela
      // }
      
      const res = await fetch('../api/users/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEvento), // Convertir el objeto a una cadena JSON
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Evento registrado:', data);
        // Reiniciar los campos
        // window.confirm("Se ha registrado un evento de: "+ datosEvento.resultado + " del jugador: "+ datosEvento.IdJugador);
        const confirmacion = await customConfirm(`Se ha registrado un evento de: ${datosEvento.resultado} del jugador: ${datosEvento.IdJugador}`);
        reiniciarCampos();

        // Cerrar el popup
        onClose(); // Asegúrate de invocar la función

      } else {
        console.error('Error al registrar el evento');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      // Siempre reiniciar el booleano aquí después de intentar registrar
      setEventoRegistrado(false); // Reiniciar el booleano
    }
  };

  // Función para reiniciar los campos
  const reiniciarCampos = () => {
    setPosicionLanzador(null);
    setLocalizacionLanzamiento(null);
    setAsistenciaDada('');
    setSistemaAtaque('');
    setSistemaDefensa('');
    setDatosEvento({}); // Reiniciar datosEvento
  };

  const handleAbrirAlerta = () => {
    handleCerrar();
  };

  const handleCerrar = () => {
     // Mostrar la alerta cuando se cierre el pop-up principal
    setAlertaVisible(true); // Mostrar la alerta cuando se cierre el pop-up principal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      
        {/* Popup ocupa una gran parte de la pantalla y es naranja */}
        <div className="bg-orange-500 rounded-lg p-6 w-full max-w-5xl h-auto max-h-[90vh] overflow-y-auto flex items-center justify-center">
            {/* Rectángulo blanco dentro del popup */}
            <div className="bg-white rounded-lg p-6 w-full h-full flex flex-col md:flex-row shadow-lg">
                {/* Columna izquierda */}
                <div className="flex flex-col flex-1 justify-between mb-6 md:mb-0">
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
                <div className="hidden md:block w-1 bg-orange-500 mx-4" />

                {/* Columna derecha */}
                <div className="flex flex-col flex-1">
                    {/* Sección de Asistencias */}
                    <div className="mb-4 flex flex-col">
                        <h3 className="text-lg font-semibold text-black mb-2">Asistencias</h3>
                        <div className="flex flex-wrap gap-2">
                            {jugadoresFiltrados.map((jugador, index) => (
                                <button
                                    key={index}
                                    onClick={() => setAsistenciaDada(jugador)}
                                    className={`bg-blue-500 text-white px-4 py-2 rounded text-sm ${
                                        asistenciaDada === jugador ? 'opacity-80' : ''
                                    }`}
                                >
                                    Jugador {jugador}
                                </button>
                            ))}
                            {/* Botón adicional para "Sin asistencia" */}
                            <button
                                onClick={() => setAsistenciaDada("0")}
                                className={`bg-blue-500 text-white px-4 py-2 rounded text-sm ${
                                    asistenciaDada === "0" ? 'opacity-80' : ''
                                }`}
                            >
                                Sin asistencia
                            </button>
                        </div>
                    </div>

                    {/* Sección de Sistema de Juego */}
                    <div className="flex flex-col mb-4">
                        <h3 className="text-lg font-semibold text-black mb-2">Sistema de Juego</h3>
                        <div className="flex flex-col mb-4">
                            <h4 className="text-md font-semibold text-black mb-2">Ataque</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSistemaAtaque(index + 1)}
                                        className={`bg-gray-200 text-black px-3 py-2 rounded text-sm ${
                                            sistemaAtaque === index + 1 ? 'opacity-80' : ''
                                        }`}
                                    >
                                        Ataque {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-md font-semibold text-black mb-2">Defensa</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <button
                                        key={index + 10}
                                        onClick={() => setSistemaDefensa(index + 1)}
                                        className={`bg-gray-200 text-black px-3 py-2 rounded text-sm ${
                                            sistemaDefensa === index + 1 ? 'opacity-80' : ''
                                        }`}
                                    >
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
                            onClick={() => { handleAbrirAlerta(); }} // Llamamos a ambas funciones                        
                        >
                            Cerrar
                        </button>
                        {alertaVisible && (
                          <EventoAlerta
                            mensaje={mensajeAlerta}
                            onConfirm={() => setAlertaVisible(false)} // Cambiado de onClose a onConfirm
                            onClose={() => onClose()} // Cambiado de onClose a onConfirm
                          />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export { CampoBalonmano, PorteriaBalonmano, PopUpAccion };