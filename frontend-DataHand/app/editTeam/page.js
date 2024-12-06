'use client';

import { useEffect, useState } from 'react';

export default function EditarEquipo() {
  const [equipo, setEquipo] = useState();

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        // Recupera el userID almacenado en localStorage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('No se encontró userID en localStorage.');
          return;
        }
  
        // Realiza la consulta a la API con el userID
        const response = await fetch(`/api/users/equipos?entrenador=${userID}`);
        if (!response.ok) {
          console.error('Error al cargar el equipo:', response.statusText);
          return;
        }
  
        const data = await response.json();
        console.log('Equipos encontrados:', data);
  
        // Filtra el equipo correspondiente al userID
        const equipoDelEntrenador = data.find((equipo) => equipo.entrenador === userID);
        if (equipoDelEntrenador) {
          setEquipo(equipoDelEntrenador);
        } else {
          console.error('No se encontró un equipo para el entrenador especificado.');
        }
      } catch (error) {
        console.error('Error al obtener el equipo:', error);
      }
    };
  
    fetchEquipo();
  }, []);
  

  if (!equipo) {
    return <p>Cargando equipo...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Organizar Equipo</h1>
      <div className="flex items-center gap-4">
        <img src={equipo.imagen} alt={equipo.nombre} className="w-20 h-20 rounded-full" />
        <h2 className="text-xl font-semibold">{equipo.nombre}</h2>
      </div>

      <section className="mt-5">
        <h3 className="text-lg font-semibold mb-3">Jugadores:</h3>
        <ul className="list-disc list-inside">
            {equipo.jugadores && equipo.jugadores.length > 0 ? (
            equipo.jugadores.map((jugador, index) => (
                <li key={index}>{jugador}</li>
            ))
            ) : (
            <li>No hay jugadores disponibles</li>
            )}
        </ul>
      </section>

      <section className="mt-5">
        <h3 className="text-lg font-semibold mb-3">Porteros:</h3>
        <ul className="list-disc list-inside">
            {equipo.porteros && equipo.porteros.length > 0 ? (
            equipo.porteros.map((portero, index) => (
                <li key={index}>{portero}</li>
            ))
            ) : (
            <li>No hay porteros disponibles</li>
            )}
        </ul>
      </section>

      <section className="mt-5">
        <h3 className="text-lg font-semibold mb-3">Banquillo:</h3>
        <ul className="list-disc list-inside">
            {equipo.banquillo && equipo.banquillo.length > 0 ? (
            equipo.banquillo.map((jugador, index) => (
                <li key={index}>{jugador}</li>
            ))
            ) : (
            <li>No hay jugadores en el banquillo</li>
            )}
        </ul>
      </section>

    </div>
  );
}
