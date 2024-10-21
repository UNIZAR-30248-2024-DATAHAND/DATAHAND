import CrearPartidos from '/models/CrearPartido.js';
// Función para enviar los datos del usuario para registrar
export const crearPartidoNuevo = async () => {
    // Partido nuevo que será enviado
    const nuevoPartido = new CrearPartidos({
    IdPartido: '1',
    Fecha: new Date(),
    EquipoLocal: 'Equipo A',
    EquipoVisitante: 'Equipo B',
    MarcadorLocal: 2,
    MarcadorVisitante: 1,
    TiempoDeJuego: '10:00',
    Parte: ['Parte1'],
    Equipos: {
        Locales: {
        Porteros: ['Portero A'],
        Jugadores: ['Jugador 1', 'Jugador 2'],
        Banquillo: ['Jugador 3'],
        },
        Visitantes: {
        Porteros: ['Portero B'],
        Jugadores: ['Jugador 4', 'Jugador 5'],
        Banquillo: ['Jugador 6'],
        },
    },
    SistemaDefensivoLocal: '6:0',
    SistemaDefensivoVisitante: '6:0',
    });

    try {
      // Enviar una solicitud POST a la API para registrar el usuario
      const response = await fetch("/api/users/CrearPartido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPartido),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Partido creado:", nuevoPartido.IdPartido);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };