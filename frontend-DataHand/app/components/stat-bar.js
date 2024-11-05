// stat-bar.js

// Este componente StatBar representa una barra de progreso visual.
// Recibe dos propiedades: 
// - value: un número que representa el porcentaje de la barra (0 a 100).
// - text: un texto descriptivo que se muestra junto a la barra.
// La barra se muestra con un fondo gris y un color de progreso que varía según el valor.

export default function StatBar({ value, text }) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm w-16">{text}</div>
        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#45e5d6] rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="text-sm w-12">{value}%</div>
      </div>
    );
}