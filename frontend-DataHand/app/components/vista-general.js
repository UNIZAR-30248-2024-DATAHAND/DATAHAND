// components/vista-general.js

/*
  Este componente, `VistaGeneral`, proporciona una visualización de las estadísticas
  de rendimiento de dos equipos en un evento deportivo (en este caso, balonmano).

  - Utiliza un componente hijo `StatBar` para mostrar barras de progreso que representan 
    diferentes estadísticas de cada equipo. Cada barra muestra un porcentaje y un texto descriptivo.
  
  - Dentro de `VistaGeneral`, se presenta una tabla estructurada en una cuadrícula que
    contiene:
    - Nombres de los equipos y sus estadísticas, incluyendo posesiones, eficiencia en lanzamientos,
      balones perdidos, ataque posicional, contraataques y otras métricas relevantes.
  
  - Los equipos se representan en columnas separadas, con un encabezado que indica el nombre
    del equipo y sus respectivas estadísticas.
  
  - Los estilos de Tailwind CSS se utilizan para dar formato y diseño a los elementos,
    asegurando que la interfaz sea limpia y fácil de leer.
  
  - Las métricas se presentan en un formato claro y organizado, lo que facilita la comparación
    directa entre los dos equipos.
*/


function StatBar({ value, text }) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm w-32">{text}</div>
        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#45e5d6] rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="text-sm w-16">{value}%</div>
      </div>
    );
  }
  
  export default function VistaGeneral() {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Vista General</h2>
        <div className="grid grid-cols-[200px_1fr_1fr] gap-4 text-black">
          {/* Labels Column */}
          <div className="space-y-7">
            <div className="font-semibold">Teams:</div>
            <div className="font-semibold">Posesiones</div>
            <div className="font-semibold">EFF %</div>
            <div className="font-semibold">EFF Lanzamiento %</div>
            <div className="font-semibold">Balones Perdidas %</div>
            <div className="font-semibold">Ataque Posicional %</div>
            <div className="font-semibold">Contraataque %</div>
            <div className="font-semibold">Contragol %</div>
            <div className="font-semibold">Superioridad %</div>
            <div className="font-semibold">Igualdad %</div>
            <div className="font-semibold">7 Metros Goal %</div>
          </div>
  
          {/* Zaragoza Column */}
          <div className="space-y-6">
            <div className="bg-[#0f2d50] text-white p-2 rounded">ZARAGOZA BALONMANO</div>
            <div className="font-semibold">48</div>
            <StatBar value={67} text="32 / 48" />
            <StatBar value={68} text="32 / 47" />
            <StatBar value={10} text="5 / 45" />
            <StatBar value={65} text="15 / 23 (23)" />
            <StatBar value={71} text="15 / 21 (22)" />
            <StatBar value={50} text="2 / 4 (5)" />
            <StatBar value={100} text="2 / 2" />
            <StatBar value={63} text="30 / 48" />
            <StatBar value={100} text="2 / 2" />
          </div>
  
          {/* Soria Column */}
          <div className="space-y-6">
            <div className="bg-[#45e5d6] text-white p-2 rounded">SORIA</div>
            <div className="font-semibold">49</div>
            <StatBar value={39} text="19 / 49" />
            <StatBar value={49} text="19 / 39" />
            <StatBar value={22} text="11 / 49" />
            <StatBar value={40} text="17 / 43 (43)" />
            <StatBar value={20} text="1 / 5 (5)" />
            <StatBar value={100} text="1 / 1 (5)" />
            <StatBar value={0} text="0 / 0" />
            <StatBar value={33} text="18 / 55" />
            <StatBar value={86} text="6 / 7" />
          </div>
        </div>
      </div>
    );
}
  