import React from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

const CampoBalonmano = ({ onClick }) => {
  const handleClick = (event) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    if (onClick) {
      onClick({ x, y });
    }
  };

  return (
    <Stage width={600} height={300} onClick={handleClick}>
      <Layer>
        {/* Campo de balonmano */}
        <Rect
          x={0}
          y={0}
          width={600}
          height={300}
          fill="lightgreen"
          stroke="white"
          strokeWidth={5}
        />

        {/* Líneas del campo */}
        <Rect x={0} y={0} width={600} height={300} fill="transparent" stroke="white" strokeWidth={5} />
        <Rect x={0} y={100} width={10} height={100} fill="white" />
        <Rect x={590} y={100} width={10} height={100} fill="white" />
        <Rect x={0} y={110} width={100} height={10} fill="white" />
        <Rect x={500} y={110} width={100} height={10} fill="white" />

        {/* Círculo de 9 metros */}
        <Circle x={80} y={150} radius={80} fill="transparent" stroke="white" strokeWidth={5} />
        <Circle x={520} y={150} radius={80} fill="transparent" stroke="white" strokeWidth={5} />

        {/* Círculo central */}
        <Circle x={300} y={150} radius={50} fill="transparent" stroke="white" strokeWidth={5} />
      </Layer>
    </Stage>
  );
};

export default CampoBalonmano;
