// app/components/ui/card.js

// Componente funcional Card que envuelve contenido en una tarjeta con estilo.
// Recibe dos propiedades: `children` para renderizar el contenido interno y `className` para aplicar clases adicionales.
// El div resultante tiene un fondo blanco, sombra moderada y esquinas redondeadas, lo que proporciona un diseño limpio y moderno.
// Se utiliza para presentar información de manera consistente y atractiva en la interfaz de usuario.

export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-md rounded-lg ${className}`}>
        {children}
      </div>
    );
  };
  