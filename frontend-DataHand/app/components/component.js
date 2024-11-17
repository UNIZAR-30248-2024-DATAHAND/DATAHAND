// components/component.js

/*
  Este componente es una interfaz de usuario que utiliza un sistema de pestañas (tabs)
  para mostrar diferentes vistas relacionadas con el rendimiento de un equipo en un deporte.

  - Importa varias dependencias de React, incluyendo el hook `useState` para manejar el estado
    de la pestaña activa.
  - Usa componentes de la biblioteca de tabs de Radix UI para crear una navegación por pestañas.
  - Hay cinco pestañas disponibles: 
    - VISTA GENERAL: Muestra una visión general del rendimiento.
    - SISTEMA DE JUEGO: Detalla el sistema de juego del equipo.
    - LANZAMIENTOS: Presenta estadísticas sobre lanzamientos.
    - ESPECÍFICAS JUGADORES: Muestra estadísticas específicas de los jugadores.
    - JUGADORES: Proporciona una lista de jugadores del equipo.

  - El estado `activeTab` se utiliza para determinar qué pestaña está activa y, en consecuencia,
    qué contenido debe renderizarse. 
  - La función `renderTabContent` decide qué componente se debe mostrar según la pestaña seleccionada.
  - El contenido de la pestaña activa se renderiza al final del componente.

  El diseño está organizado para que sea responsivo y fácil de usar, con estilos de Tailwind CSS
  para la apariencia visual.
*/

// Instalar eso para el Tabs: npm install @radix-ui/react-tabs

import { useState } from 'react';
// import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"; // Asegúrate de que la ruta sea correcta
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import VistaGeneral from './vista-general'; // Importa el componente de Vista General
import SistemaDeJuego from './sistema-de-juego'; // Importa el componente del Sistema de Juego (debes crearlo)
import Lanzamientos from './lanzamientos'; // Importa el componente de Lanzamientos (debes crearlo)
import EspecificasJugadores from './especifico-jugadores'; // Importa el componente de Especificas Jugadores (debes crearlo)
import Jugadores from './jugadores'; // Importa el componente de Jugadores (debes crearlo)

export default function Component({dataEventos, dataEquipos}) {
  const [activeTab, setActiveTab] = useState("vista-general"); // Estado para controlar la pestaña activa

  const renderTabContent = () => {
    switch (activeTab) {
      case "vista-general":
        return <VistaGeneral dataEventos={dataEventos} dataEquipos={dataEquipos}/>;
      case "sistema-de-juego":
        return <SistemaDeJuego dataEventos={dataEventos} dataEquipos={dataEquipos}/>; // Renderiza el componente correspondiente
      case "lanzamientos":
        return <Lanzamientos dataEventos={dataEventos} dataEquipos={dataEquipos}/>; // Renderiza el componente correspondiente
      case "especificas-jugadores":
        return <EspecificasJugadores dataEventos={dataEventos} dataEquipos={dataEquipos}/>; // Renderiza el componente correspondiente
      case "jugadores":
        return <Jugadores dataEventos={dataEventos} dataEquipos={dataEquipos}/>; // Renderiza el componente correspondiente
      default:
        return <VistaGeneral dataEventos={dataEventos} dataEquipos={dataEquipos}/>; // Por defecto, mostrar Vista General
    }
  };

  return (
    <div className="w-full bg-white text-black">
      {/* Header Tabs */}
      <Tabs defaultValue="vista-general" className="w-full">
        <TabsList className="flex space-x-4 border-b">
          <TabsTrigger 
            value="vista-general" 
            className={`px-4 py-2 rounded ${activeTab === "vista-general" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("vista-general")} // Cambia a la pestaña de Vista General
          >
            VISTA GENERAL
          </TabsTrigger>
          <TabsTrigger 
            value="sistema-de-juego" 
            className={`px-4 py-2 rounded ${activeTab === "sistema-de-juego" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("sistema-de-juego")} // Cambia a la pestaña de Sistema de Juego
          >
            SISTEMA DE JUEGO
          </TabsTrigger>
          <TabsTrigger 
            value="lanzamientos" 
            className={`px-4 py-2 rounded ${activeTab === "lanzamientos" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("lanzamientos")} // Cambia a la pestaña de Lanzamientos
          >
            LANZAMIENTOS
          </TabsTrigger>
          <TabsTrigger 
            value="especificas-jugadores" 
            className={`px-4 py-2 rounded ${activeTab === "especificas-jugadores" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("especificas-jugadores")} // Cambia a la pestaña de Específicas Jugadores
          >
            ESPECÍFICAS JUGADORES
          </TabsTrigger>
          <TabsTrigger 
            value="jugadores" 
            className={`px-4 py-2 rounded ${activeTab === "jugadores" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("jugadores")} // Cambia a la pestaña de Jugadores
          >
            JUGADORES
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Renderiza el contenido de la pestaña activa */}
      {renderTabContent()}
    </div>
  );
}
