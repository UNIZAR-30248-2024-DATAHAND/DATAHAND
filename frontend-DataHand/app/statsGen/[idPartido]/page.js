'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState , useEffect} from 'react';
import { useParams } from 'next/navigation';
import Component from '../../components/component'; // Asegúrate de que la ruta sea correcta 
import Sidebar from '../../components/Sidebar';


  export default function Home() {
    const userID = localStorage.getItem('userID');
    const {idPartido} = useParams(); // Obtener el idPartido de los parámetros
    const [eventos, setEventos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para gestionar la carga
    const [equipos, setEquipos] = useState({
      IdPartido: '1',                  // Identificador del partido
      Fecha: new Date(),               // Fecha del partido
      EquipoLocal: 'Local',         // Nombre del equipo local
      EquipoVisitante: 'Visitante',     // Nombre del equipo visitante
      MarcadorLocal: 0,                // Marcador del equipo local
      MarcadorVisitante: 0,            // Marcador del equipo visitante
      TiempoDeJuego: 0,                // Tiempo de juego transcurrido en minutos
      Parte: 'Primera parte',                // Parte actual del juego (Parte 1, Parte 2, Prórroga)
      local: {
          jugadores: [],
          banquillo: [],
          porteros: [], // Dos porteros
      },
      visitante: {
          jugadores: [],
          banquillo: [],
          porteros: [], // Dos porteros
      },
      sistemaDefensivoLocal: "", // Sistema defensivo del equipo local
      sistemaDefensivoVisitante: "", // Sistema defensivo del equipo visitante
  });

  const obtenerPartido = async () => {
    try {
        console.log(`Solicitando partido con IdPartido: ${idPartido}`);
        const res = await fetch(`../api/users/crearPartido?IdPartido=${idPartido}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Datos recibidos:', data); // Mostrar los datos recibidos del backend

            // Mapear los datos recibidos directamente al estado de `equipos`
            setEquipos({
                IdPartido: data.IdPartido || '',
                Fecha: new Date(data.Fecha) || new Date(),
                EquipoLocal: data.EquipoLocal || '',
                EquipoVisitante: data.EquipoVisitante || '',
                MarcadorLocal: data.MarcadorLocal || 0,
                MarcadorVisitante: data.MarcadorVisitante || 0,
                TiempoDeJuego: data.TiempoDeJuego || 0,
                Parte: data.Parte || '',
                local: {
                    jugadores: data.local?.jugadores || [],
                    banquillo: data.local?.banquillo || [],
                    porteros: data.local?.porteros || []
                },
                visitante: {
                    jugadores: data.visitante?.jugadores || [],
                    banquillo: data.visitante?.banquillo || [],
                    porteros: data.visitante?.porteros || []
                },
                sistemaDefensivoLocal: data.sistemaDefensivoLocal || '',
                sistemaDefensivoVisitante: data.sistemaDefensivoVisitante || ''
            });
        } else {
            const errorText = await res.text();
            console.error('Error al obtener los datos del partido:', errorText); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
    }
};

    const obtenerEventos = async (idPartido) => {
      try {
          const url = idPartido
              ? `../../api/users/eventos?idPartido=${idPartido}`
              : `../../api/users/eventos`;
          const res = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
    
          if (res.ok) {
              const data = await res.json();
              console.log('Total de eventos:', data.totalEventos);
              console.log('Datos eventos:', data.eventos);
              setEventos(data.eventos);
              return data.eventos;
          } else {
              console.error('Error al obtener los eventos');
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        await Promise.all([obtenerEventos(idPartido), obtenerPartido(idPartido)]);
        setIsLoading(false); // Marcar como completado después de obtener los datos
      };
  
      fetchData();
    }, [idPartido]);
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-orange-500 text-white">
          <div className="main">
            <div className="up">
              <div className="loaders">
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
              </div>
              <div className="loadersB">
                <div className="loaderA">
                  <div className="ball0"></div>
                </div>
                <div className="loaderA">
                  <div className="ball1"></div>
                </div>
                <div className="loaderA">
                  <div className="ball2"></div>
                </div>
                <div className="loaderA">
                  <div className="ball3"></div>
                </div>
                <div className="loaderA">
                  <div className="ball4"></div>
                </div>
                <div className="loaderA">
                  <div className="ball5"></div>
                </div>
                <div className="loaderA">
                  <div className="ball6"></div>
                </div>
                <div className="loaderA">
                  <div className="ball7"></div>
                </div>
                <div className="loaderA">
                  <div className="ball8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // if (isLoading) {
    //   return (
    //     <div className="flex items-center justify-center h-screen bg-orange-500 text-white">
    //       <h2 className="text-2xl">Cargando datos...</h2>
    //     </div>
    //   );
    // }
  
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-start bg-orange-500 px-4 sm:px-8">
        
    
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4 text-white text-center"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Estadísticas Generales
        </h1>
    
        <Component dataEventos={eventos} dataEquipos={equipos} />
    
        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
    
          .animate-gradient {
            background: linear-gradient(270deg, #ffb835, #8a2be2);
            background-size: 400% 400%;
            animation: gradient 20s ease infinite;
          }
        `}</style>
         <Sidebar userID={userID} />
      </div>
    );    
}
