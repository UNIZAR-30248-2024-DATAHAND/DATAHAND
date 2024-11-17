// components/sistema-de-juego.js

// Este componente React llamado SistemaDeJuego implementa una interfaz con pestañas
// para mostrar estadísticas de rendimiento deportivo del equipo Zaragoza Balonmano.
// Usa "@radix-ui/react-tabs" para gestionar las pestañas y organiza los datos en una tabla
// con acciones, tiempos jugados, goles, y otros indicadores de rendimiento.

// Descargar este paquete: npm install @tanstack/react-table

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { contarEventos, contarGoles, contarAtaquePosicional, contarAtaquePosicionalConGol, contarContragol,contarContragolConGol,contarContrataque,
  contarContrataqueConGol,contarLanzamientosTotal,contarLanzamientosYPerdidas,contarPerdidasDeBalon, obtenerSistemaAtaque, filtrarGolPorSistema, filtrarPalosPorSistema,
filtrarParadasPorSistema}  from '../utils/calculosEstadistica';  // Ajusta la ruta según la ubicación del archivo
import { useState , useEffect} from 'react';

export default function SistemaDeJuego({dataEventos,dataEquipos}) {

  const [datosVistaGeneral, setdatosVistaGeneral] = useState({  //AQUI PODEMOS AÑADER SUPERIORIDAD, IGUALDAD Y 7 METROS
    golesContrataque: '',
    paradasContrataque: '',
    posteContrataque:'',

  });

  const valoresUnicosSistemaAtaque = obtenerSistemaAtaque(dataEventos);

  const calcularEstadisticas = () => {
    

    setdatosVistaGeneral(prevState => ({
      ...prevState,
      
    }));
  };

  useEffect(() => {  
    // Solo actualizamos si el valor es diferente al actual
    calcularEstadisticas();
  }, []); // Solo se ejecutará cuando dataEventos cambie

  return (
    <div className="w-full bg-white">
      {/* Contenido de la pestaña Sistema de Juego */}
      <Tabs defaultValue="sistema-de-juego" className="w-full">
        {/* Pestañas secundarias dentro de Sistema de Juego */}
        <Tabs defaultValue="equipo" className="w-full">
          {/* Contenido de la pestaña Equipo */}
          <TabsContent value="equipo" className="mt-6">
            <div className="text-center text-xl font-bold mb-4">
              {dataEquipos.EquipoLocal}
            </div>
            <Table>
              <TableHeader className="bg-[#e6f7ff]">
                <TableRow>
                  <TableHead className="w-[200px] font-bold">ACCIÓN</TableHead>
                  <TableHead className="font-bold">Nº GOLES</TableHead>
                  <TableHead className="font-bold">Nº PARADAS</TableHead>
                  <TableHead className="font-bold">Nº POSTE/FUERA</TableHead>
                  <TableHead className="font-bold">Nº 7 METROS</TableHead>
                  <TableHead className="font-bold">Nº Faltas</TableHead>
                  <TableHead className="font-bold">Nº Suspensiones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    TRANSICIONES - CONTRAATAQUE DIRECTO
                  </TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    TRANSICIONES - CONTRAGOL
                  </TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                </TableRow>
                {valoresUnicosSistemaAtaque.map((sistema, index) => (
                <TableRow className="bg-white" key={index}>
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE {sistema} {/* Aquí usamos el valor del sistema de ataque dinámicamente */}
                  </TableCell>
                  <TableCell className="font-bold"></TableCell>
                  <TableCell className="font-bold"> </TableCell>
                  <TableCell className="font-bold"> </TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Contenido de la pestaña Individual */}
          <TabsContent value="individual">
            {/* Aquí puedes añadir contenido específico para la pestaña "Individual" cuando sea necesario */}
          </TabsContent>
        </Tabs>
      </Tabs>
    </div>
  );
}
