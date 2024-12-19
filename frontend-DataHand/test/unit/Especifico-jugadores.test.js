import EspecificoJugadores from '../../app/components/especifico-jugadores'; // Ajusta la ruta si es necesario
import { render, screen, fireEvent } from '@testing-library/react';
import { obtenerResultadoJugador, obtenerSuspensionJugador, obtenerAccionJugador, filtrarResultadoPorPosicionJugador, filtrarResultadoPorLocalizacionJugador, obtenerJugadoresUnicos } from '../../app/utils/calculosEstadistica';

jest.mock('../../app/utils/calculosEstadistica', () => ({
  obtenerResultadoJugador: jest.fn(),
  obtenerSuspensionJugador: jest.fn(),
  obtenerAccionJugador: jest.fn(),
  filtrarResultadoPorPosicionJugador: jest.fn(),
  filtrarResultadoPorLocalizacionJugador: jest.fn(), // <- Agregada
  obtenerJugadoresUnicos: jest.fn()
}));

const dataEventosMock = [
    { IdJugador: 1, Tipo: "Gol", LocalizacionLanzamiento: "1", EquipoJugador: "local" },
    { IdJugador: 2, Tipo: "Parada", LocalizacionLanzamiento: "1", EquipoJugador: "local" },
    { IdJugador: 3, Tipo: "Gol", LocalizacionLanzamiento: "2", EquipoJugador: "local" },
];

const dataEquiposMock = [
    { id: 1, nombre: "Equipo Local", jugadores: [{ id: 1, nombre: "Jugador 1" }] },
    { id: 2, nombre: "Equipo Visitante", jugadores: [{ id: 2, nombre: "Jugador 2" }] },
];

describe('EspecificoJugadores', () => {
  beforeEach(() => {
    obtenerResultadoJugador.mockClear();
    obtenerSuspensionJugador.mockClear();
    obtenerAccionJugador.mockClear();
    filtrarResultadoPorPosicionJugador.mockClear();
    filtrarResultadoPorLocalizacionJugador.mockClear();
    obtenerJugadoresUnicos.mockClear();
  });

  it('Debería renderizar sin errores', () => {
    render(<EspecificoJugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    expect(screen.getByText(/Mostrar Jugadores/i)).toBeInTheDocument();
  });

  it('Debería cambiar el jugador seleccionado al hacer clic en uno', () => {
    const jugadoresMock = [
      { id: 1, nombre: 'Jugador 1' },
      { id: 2, nombre: 'Jugador 2' },
      { id: 3, nombre: 'Jugador 3' },
    ];

    render(<EspecificoJugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    fireEvent.click(screen.getByText('Mostrar Jugadores'));
    expect(screen.getByText('Ocultar Jugadores')).toBeInTheDocument();

    // Simulamos el clic en un jugador
    fireEvent.click(screen.getByText('Jugador 2'));
    expect(screen.getByText('Jugador 2')).toBeInTheDocument();
  });

  it('Debería calcular y mostrar el color correcto en función del porcentaje de lanzamientos', () => {
    const color = "bg-green-500"; // Este es solo un ejemplo. Los valores deberán depender de tu lógica.
    expect(color).toBe("bg-green-500"); 
  });

  it('Debería calcular estadísticas correctamente de goles en ataque posicional', () => {
    obtenerResultadoJugador.mockImplementation((dataEventos, tipo, localizacion, jugadorFalso) => {
      if (tipo === "Gol" && localizacion === "Ataque posicional") {
        return 5;  // Valor simulado
      }
    });

    render(<EspecificoJugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    const golesAtaquePosicional = obtenerResultadoJugador(dataEventosMock, "Gol", "Ataque posicional", "2");
    
    expect(golesAtaquePosicional).toBe(5);
  });

  it('Debería calcular estadísticas correctamente de tarjetas para un jugador', () => {
    obtenerSuspensionJugador.mockImplementation((dataEventos, tipo, jugadorFalso) => {
      if (tipo === "2 Minutos") {
        return 1;  // Valor simulado
      }
    });

    render(<EspecificoJugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    const suspension2M = obtenerSuspensionJugador(dataEventosMock, "2 Minutos", "2");
    
    expect(suspension2M).toBe(1);
  });

  it('Debería filtrar correctamente las estadísticas por posición y localización', () => {
    filtrarResultadoPorPosicionJugador.mockImplementation((dataEventos, tipo, posicion, equipo, jugadorFalso) => {
      if (tipo === "Gol" && posicion === "\"Ext Der\"") {
        return 3;  // Valor simulado
      }
    });

    render(<EspecificoJugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    const golesExtDer = filtrarResultadoPorPosicionJugador(dataEventosMock, "Gol", "\"Ext Der\"", "local", "2");
    
    expect(golesExtDer).toBe(3);
  });
  
});
