// components/sistema-de-juego.js

// Este componente React llamado SistemaDeJuego implementa una interfaz con pestañas
// para mostrar estadísticas de rendimiento deportivo del equipo Zaragoza Balonmano.
// Usa "@radix-ui/react-tabs" para gestionar las pestañas y organiza los datos en una tabla
// con acciones, tiempos jugados, goles, y otros indicadores de rendimiento.

// Descargar este paquete: npm install @tanstack/react-table

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { contarContragolConGol, contarContrataqueConGol, obtenerSistemaAtaque, filtrarGolPorSistema,
filtrarPalosPorSistema, filtrarParadasPorSistema, contarContragolConParada, contarContragolConPalo, contarContrataqueConParada, contarContrataqueConPalo}  from '../utils/calculosEstadistica';  // Ajusta la ruta según la ubicación del archivo
import { useState , useEffect} from 'react';

export default function SistemaDeJuego({dataEventos,dataEquipos}) {
  //TO DO FALTAN LAS ACCIONES QUE ESTA HACIENDO JUANJO
  const valoresUnicosSistemaAtaque = obtenerSistemaAtaque(dataEventos);

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
                  <TableCell className="font-bold">{contarContrataqueConGol(dataEventos)}</TableCell>
                  <TableCell className="font-bold">{contarContrataqueConParada(dataEventos)}</TableCell>
                  <TableCell className="font-bold">{contarContrataqueConPalo(dataEventos)}</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    TRANSICIONES - CONTRAGOL
                  </TableCell>
                  <TableCell className="font-bold">{contarContragolConGol(dataEventos)}</TableCell>
                  <TableCell className="font-bold">{contarContragolConParada(dataEventos)}</TableCell>
                  <TableCell className="font-bold">{contarContragolConPalo(dataEventos)}</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                </TableRow>
                {valoresUnicosSistemaAtaque.map((sistema, index) => (
                <TableRow className="bg-white" key={index}>
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE {sistema} {/* Aquí usamos el valor del sistema de ataque dinámicamente */}
                  </TableCell>
                  <TableCell className="font-bold">{filtrarGolPorSistema(dataEventos,sistema)}</TableCell>
                  <TableCell className="font-bold">{filtrarParadasPorSistema(dataEventos,sistema)} </TableCell>
                  <TableCell className="font-bold">{filtrarPalosPorSistema(dataEventos,sistema)}</TableCell>
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
