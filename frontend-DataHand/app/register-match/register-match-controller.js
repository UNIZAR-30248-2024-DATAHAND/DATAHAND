import React from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';

const CampoBalonmano = ({ onClick }) => {
  const handleClick = (event) => {
    const stage = event.target.getStage();
    if (stage) {
      const { x, y } = stage.getPointerPosition();
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
      </Layer>
    </Stage>
  );
};

const PorteriaBalonmano = ({ onClick }) => {
  const width = 300; // Ancho de la portería
  const height = 200; // Altura de la portería
  const postThickness = 15; // Grosor de los postes
  const stripeHeight = height / 10; // Alto de cada franja

  // Maneja el click en el Stage
  const handleClick = (event) => {
    const stage = event.target.getStage();
    if (stage) {
      const { x, y } = stage.getPointerPosition();
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
        

      </Layer>
    </Stage>
  );
};

export { CampoBalonmano, PorteriaBalonmano };