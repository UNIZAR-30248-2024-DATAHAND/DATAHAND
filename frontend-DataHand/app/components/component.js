import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import VistaGeneral from './vista-general';
import SistemaDeJuego from './sistema-de-juego';
import Lanzamientos from './lanzamientos';
import EspecificasJugadores from './especifico-jugadores';
import Jugadores from './jugadores';
import LoadingPage from './LoadingPage';

export default function Component({ dataEventos, dataEquipos }) {
  const [activeTab, setActiveTab] = useState("vista-general");
  const [capturedTabs, setCapturedTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simula la carga de datos (puedes reemplazarlo con lógica real)
  useEffect(() => {
    const loadData = async () => {
      // Simula un tiempo de carga de datos
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos
      setIsLoading(false);
    };
    loadData();
  }, []);

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

  // Captura el contenido de la pestaña activa y la añade o la quita de capturedTabs
  const toggleTabInPDF = async () => {
    const tabIndex = capturedTabs.findIndex((tab) => tab.name === activeTab);

    if (tabIndex > -1) {
      // Si la pestaña ya está capturada, la eliminamos de capturedTabs
      setCapturedTabs((prevTabs) => prevTabs.filter((_, index) => index !== tabIndex));
    } else {
      // Si no está capturada, capturamos su contenido
      const content = document.querySelector(`#${activeTab}-content`);
      if (content) {
        // Esperar un momento para asegurarse de que el contenido esté visible
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL("image/png");

        // Agregamos la nueva pestaña capturada
        setCapturedTabs((prevTabs) => [
          ...prevTabs,
          { name: activeTab, imgData },
        ]);
      } else {
        console.error("No se encontró el contenido de la pestaña");
      }
    }
  };

  // Función para generar el PDF con todas las pestañas capturadas
  const generatePDF = () => {
    if (capturedTabs.length === 0) {
      alert("No se ha capturado ninguna pestaña. Por favor, añada pestañas al PDF.");
      return;
    }

    const doc = new jsPDF();
    capturedTabs.forEach((tab, index) => {
      if (index > 0) {
        doc.addPage();
      }
      doc.addImage(tab.imgData, 'PNG', 10, 10, 180, 120);
    });

    doc.save('vistas-seleccionadas.pdf');
  };


  // Si los datos están cargando, muestra el componente de carga
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full bg-white text-black h-auto mt-6">
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
      <div className="flex flex-col items-center">
        <button
          onClick={toggleTabInPDF}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded active:bg-blue-700"
        >
          {capturedTabs.some((tab) => tab.name === activeTab)
            ? "Quitar del PDF"
            : "Añadir al PDF"}
        </button>
        
        <button
          onClick={generatePDF}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded active:bg-green-700"
        >
          Generar PDF con vistas seleccionadas
        </button>
      </div>
    </div>
  );  
}
