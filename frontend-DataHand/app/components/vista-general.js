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
import { contarEventos, contarGoles, contarAtaquePosicional, contarAtaquePosicionalConGol, contarContragol,contarContragolConGol,contarContrataque,
  contarContrataqueConGol,contarLanzamientosTotal,contarLanzamientosYPerdidas,contarPerdidasDeBalon}  from '../utils/calculosEstadistica';  // Ajusta la ruta según la ubicación del archivo
import { useState , useEffect} from 'react';

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
  
  export default function VistaGeneral({dataEventos,dataEquipos}) {
    
    const [datosVistaGeneral, setdatosVistaGeneral] = useState({  //AQUI PODEMOS AÑADER SUPERIORIDAD, IGUALDAD Y 7 METROS
      posesionesLocal: '',
      posesionesVisitante: '',
      effLocal: '',
      effVisitante: '',
      effLanzamientoLocal: '',
      effLanzamientoVisitante: '',
      balonesPerdidosLocal: '',
      balonesPerdidosVisitante: '',
      ataquePosicionalLocal: '',
      ataquePosicionalVisitante: '',
      contraataqueLocal: '',
      contraataqueVisitante: '',
      contragolLocal: '',
      contragolVisitante: '',
    });
      
    if (!dataEquipos || !dataEquipos.EquipoLocal || !dataEquipos.EquipoVisitante) {
      return (
        <div className="text-center text-gray-500 p-4">
          Cargando datos de equipos...
        </div>
      );
    }
    
    const calcularEstadisticas = () => {
      const formatToTwoDecimals = (value) => parseFloat(value.toFixed(2)); // Formateador reutilizable
  
      const varPosesionesLocal = contarLanzamientosYPerdidas(dataEventos, "local");
      const varEficaciaLocal = formatToTwoDecimals(100 * contarGoles(dataEventos, "local") / varPosesionesLocal);
      const varEficaciaLanzamientoLocal = formatToTwoDecimals(100 * contarGoles(dataEventos, "local") / contarLanzamientosTotal(dataEventos, "local"));
      const varPerdidasLocal = formatToTwoDecimals(100 * contarPerdidasDeBalon(dataEventos, "local") / varPosesionesLocal);
      const varAtaquePosicionalLocal = formatToTwoDecimals(100 * contarAtaquePosicionalConGol(dataEventos, "local") / contarAtaquePosicional(dataEventos, "local"));
      const varContraataqueLocal = formatToTwoDecimals(100 * contarContrataqueConGol(dataEventos, "local") / contarContrataque(dataEventos, "local"));
      const varContragolLocal = formatToTwoDecimals(100 * contarContragolConGol(dataEventos, "local") / contarContragol(dataEventos, "local"));
  
      const varPosesionesVisitante = contarLanzamientosYPerdidas(dataEventos, "visitante");
      const varEficaciaVisitante = formatToTwoDecimals(100 * contarGoles(dataEventos, "visitante") / varPosesionesVisitante);
      const varEficaciaLanzamientoVisitante = formatToTwoDecimals(100 * contarGoles(dataEventos, "visitante") / contarLanzamientosTotal(dataEventos, "visitante"));
      const varPerdidasVisitante = formatToTwoDecimals(100 * contarPerdidasDeBalon(dataEventos, "visitante") / varPosesionesVisitante);
      const varAtaquePosicionalVisitante = formatToTwoDecimals(100 * contarAtaquePosicionalConGol(dataEventos, "visitante") / contarAtaquePosicional(dataEventos, "visitante"));
      const varContraataqueVisitante = formatToTwoDecimals(100 * contarContrataqueConGol(dataEventos, "visitante") / contarContrataque(dataEventos, "visitante"));
      const varContragolVisitante = formatToTwoDecimals(100 * contarContragolConGol(dataEventos, "visitante") / contarContragol(dataEventos, "visitante"));
  
      setdatosVistaGeneral(prevState => ({
          ...prevState,
          posesionesLocal: varPosesionesLocal,
          effLanzamientoLocal: varEficaciaLanzamientoLocal,
          effLocal: varEficaciaLocal,
          balonesPerdidosLocal: varPerdidasLocal,
          ataquePosicionalLocal: varAtaquePosicionalLocal,
          contraataqueLocal: varContraataqueLocal,
          contragolLocal: varContragolLocal,
          posesionesVisitante: varPosesionesVisitante,
          effVisitante: varEficaciaVisitante,
          effLanzamientoVisitante: varEficaciaLanzamientoVisitante,
          balonesPerdidosVisitante: varPerdidasVisitante,
          ataquePosicionalVisitante: varAtaquePosicionalVisitante,
          contraataqueVisitante: varContraataqueVisitante,
          contragolVisitante: varContragolVisitante,
      }));
  };

    useEffect(() => {  
      // Solo actualizamos si el valor es diferente al actual
      calcularEstadisticas();
    }, []); 

    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-center mx-auto">Vista General</h2>
        <div className="grid grid-cols-[200px_1fr_1fr] gap-5 text-gray-600">
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
          </div>
  
          {/* Zaragoza Column */}
          <div className="space-y-6">
            <div className="bg-[#0f2d50] text-white p-2 rounded">{dataEquipos.EquipoLocal}</div>
            <div className="font-semibold">{datosVistaGeneral.posesionesLocal}</div>
            <StatBar value={datosVistaGeneral.effLocal} text={datosVistaGeneral.effLocal} />
            <StatBar value={datosVistaGeneral.effLanzamientoLocal} text={datosVistaGeneral.effLanzamientoLocal}/>
            <StatBar value={datosVistaGeneral.balonesPerdidosLocal} text={datosVistaGeneral.balonesPerdidosLocal}/>
            <StatBar value={datosVistaGeneral.ataquePosicionalLocal} text={datosVistaGeneral.ataquePosicionalLocal} />
            <StatBar value={datosVistaGeneral.contraataqueLocal} text={datosVistaGeneral.contraataqueLocal}/>
            <StatBar value={datosVistaGeneral.contragolLocal} text={datosVistaGeneral.contragolLocal} />
          </div>
  
          {/* Soria Column */}
          <div className="space-y-6">
            <div className="bg-[#45e5d6] text-white p-2 rounded">{dataEquipos.EquipoVisitante}</div>
            <div className="font-semibold">{datosVistaGeneral.posesionesVisitante}</div>
            <StatBar value={datosVistaGeneral.effVisitante} text={datosVistaGeneral.effVisitante} />
            <StatBar value={datosVistaGeneral.effLanzamientoVisitante} text={datosVistaGeneral.effLanzamientoVisitante}/>
            <StatBar value={datosVistaGeneral.balonesPerdidosVisitante} text={datosVistaGeneral.balonesPerdidosVisitante}/>
            <StatBar value={datosVistaGeneral.ataquePosicionalVisitante} text={datosVistaGeneral.ataquePosicionalVisitante} />
            <StatBar value={datosVistaGeneral.contraataqueVisitante} text={datosVistaGeneral.contraataqueVisitante}/>
            <StatBar value={datosVistaGeneral.contragolVisitante} text={datosVistaGeneral.contragolVisitante} />
          </div>
        </div>
      </div>
    );
}
  