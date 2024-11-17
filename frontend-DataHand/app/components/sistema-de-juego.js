// components/sistema-de-juego.js

// Este componente React llamado SistemaDeJuego implementa una interfaz con pestañas
// para mostrar estadísticas de rendimiento deportivo del equipo Zaragoza Balonmano.
// Usa "@radix-ui/react-tabs" para gestionar las pestañas y organiza los datos en una tabla
// con acciones, tiempos jugados, goles, y otros indicadores de rendimiento.

// Descargar este paquete: npm install @tanstack/react-table

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function SistemaDeJuego({dataEventos}) {
  return (
    <div className="w-full bg-white">
      {/* Contenido de la pestaña Sistema de Juego */}
      <Tabs defaultValue="sistema-de-juego" className="w-full">
        {/* Pestañas secundarias dentro de Sistema de Juego */}
        <Tabs defaultValue="equipo" className="w-full">
          <TabsList className="w-full justify-center mt-4 mb-4"> {/* Centrado y márgenes */}
            <TabsTrigger 
              value="equipo" 
              className="flex-1 bg-gray-200 text-gray-600 text-center py-2 transition-colors duration-200 data-[state=active]:bg-[#45b6e5] data-[state=active]:text-white" // Cambios en el estado activo
            >
              EQUIPO
            </TabsTrigger>
            <TabsTrigger 
              value="individual"
              className="flex-1 bg-gray-200 text-gray-600 text-center py-2 transition-colors duration-200 data-[state=active]:bg-[#45b6e5] data-[state=active]:text-white" // Cambios en el estado activo
            >
              INDIVIDUAL
            </TabsTrigger>
          </TabsList>

          {/* Contenido de la pestaña Equipo */}
          <TabsContent value="equipo" className="mt-6">
            <div className="text-center text-xl font-bold mb-4">
              ZARAGOZA BALONMANO
            </div>
            <Table>
              <TableHeader className="bg-[#e6f7ff]">
                <TableRow>
                  <TableHead className="w-[200px] font-bold">ACCIÓN</TableHead>
                  <TableHead className="font-bold">TIEMPO JUGADO</TableHead>
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
                  <TableCell className="font-bold">12</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    TRANSICIONES - SEGUNDA OLEADA
                  </TableCell>
                  <TableCell className="font-bold">10</TableCell>
                  <TableCell className="font-bold">7</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    TRANSICIONES - CONTRAGOL
                  </TableCell>
                  <TableCell className="font-bold">5</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-red-500">
                    ATAQUE - AMPLITUD
                  </TableCell>
                  <TableCell className="font-bold">11</TableCell>
                  <TableCell className="font-bold">7</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-red-500">
                    ATAQUE - 7
                  </TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-red-500">
                    ATAQUE - 0 o 1x1
                  </TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE 1
                  </TableCell>
                  <TableCell className="font-bold">9</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE 2
                  </TableCell>
                  <TableCell className="font-bold">9</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE 3
                  </TableCell>
                  <TableCell className="font-bold">9</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE 4
                  </TableCell>
                  <TableCell className="font-bold">9</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
                <TableRow className="bg-white">
                  <TableCell className="font-bold text-[#ffa500]">
                    ATAQUE 5
                  </TableCell>
                  <TableCell className="font-bold">9</TableCell>
                  <TableCell className="font-bold">1</TableCell>
                  <TableCell className="font-bold">2</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                  <TableCell className="font-bold">8</TableCell>
                  <TableCell className="font-bold">3</TableCell>
                  <TableCell className="font-bold">0</TableCell>
                </TableRow>
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
