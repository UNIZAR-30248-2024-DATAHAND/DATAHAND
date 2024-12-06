import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import VistaGeneral from './vista-general';
import SistemaDeJuego from './sistema-de-juego';
import Lanzamientos from './lanzamientos';
import EspecificasJugadores from './especifico-jugadores';
import Jugadores from './jugadores';

export default function Component({ dataEventos, dataEquipos }) {
  const [activeTab, setActiveTab] = useState("vista-general");
  const [capturedTabs, setCapturedTabs] = useState([]);

  // Función para renderizar el contenido de la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case "vista-general":
        return <VistaGeneral dataEventos={dataEventos} dataEquipos={dataEquipos} />;
      case "sistema-de-juego":
        return <SistemaDeJuego dataEventos={dataEventos} dataEquipos={dataEquipos} />;
      case "lanzamientos":
        return <Lanzamientos dataEventos={dataEventos} dataEquipos={dataEquipos} />;
      case "especificas-jugadores":
        return <EspecificasJugadores dataEventos={dataEventos} dataEquipos={dataEquipos} />;
      case "jugadores":
        return <Jugadores dataEventos={dataEventos} dataEquipos={dataEquipos} />;
      default:
        return <VistaGeneral dataEventos={dataEventos} dataEquipos={dataEquipos} />;
    }
  };

  // Función para capturar la pestaña activa y agregarla al PDF
  const captureTabForPDF = async () => {
    const content = document.querySelector(`#${activeTab}-content`); // Asegúrate de usar un id único para cada tab
    if (content) {
      // Asegurarse de que el contenido esté renderizado antes de capturarlo
      await new Promise(resolve => setTimeout(resolve, 500)); // Esperar medio segundo

      // Capturamos el contenido usando html2canvas
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");

      // Agregar la imagen al array de pestañas capturadas
      setCapturedTabs(prevTabs => [...prevTabs, imgData]);
    } else {
      console.error('No se encontró el contenido de la pestaña');
    }
  };

  // Función para generar el PDF con todas las pestañas capturadas
  const generatePDF = () => {
    if (capturedTabs.length === 0) {
      alert("No se ha capturado ninguna pestaña. Por favor, seleccione una pestaña para agregar al PDF.");
      return;
    }

    const doc = new jsPDF();
    capturedTabs.forEach((imgData, index) => {
      if (index > 0) {
        doc.addPage();
      }
      doc.addImage(imgData, 'PNG', 10, 10, 180, 120); // Ajustar las coordenadas y el tamaño si es necesario
    });

    doc.save('vistas-seleccionadas.pdf');
  };

  return (
    <div className="w-full bg-white text-black h-full">
      {/* Header Tabs */}
      <Tabs defaultValue="vista-general" className="w-full">
        <TabsList className="flex flex-wrap space-x-4 border-b">
          <TabsTrigger
            value="vista-general"
            className={`px-4 py-2 rounded ${activeTab === "vista-general" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("vista-general")}
          >
            VISTA GENERAL
          </TabsTrigger>
          <TabsTrigger
            value="sistema-de-juego"
            className={`px-4 py-2 rounded ${activeTab === "sistema-de-juego" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("sistema-de-juego")}
          >
            SISTEMA DE JUEGO
          </TabsTrigger>
          <TabsTrigger
            value="lanzamientos"
            className={`px-4 py-2 rounded ${activeTab === "lanzamientos" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("lanzamientos")}
          >
            LANZAMIENTOS
          </TabsTrigger>
          <TabsTrigger
            value="especificas-jugadores"
            className={`px-4 py-2 rounded ${activeTab === "especificas-jugadores" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("especificas-jugadores")}
          >
            ESPECÍFICAS JUGADORES
          </TabsTrigger>
          <TabsTrigger
            value="jugadores"
            className={`px-4 py-2 rounded ${activeTab === "jugadores" ? 'bg-[#45b6e5] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab("jugadores")}
          >
            JUGADORES
          </TabsTrigger>
        </TabsList>
      </Tabs>
  
      {/* Contenedor que envuelve el contenido de las pestañas, con ids únicos */}
      <div id={`${activeTab}-content`}>
        {renderTabContent()}
      </div>
  
      {/* Botón para capturar la pestaña activa y agregarla al PDF */}
      <button onClick={captureTabForPDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Agregar al PDF
      </button>
  
      {/* Botón para generar el PDF con todas las pestañas seleccionadas */}
      <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Generar PDF con vistas seleccionadas
      </button>
    </div>
  );  
}
