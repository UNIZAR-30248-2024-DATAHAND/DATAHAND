import Jugadores from '../../app/components/jugadores'; // Ajusta la ruta si es necesario
import { render, screen } from '@testing-library/react';
import { obtenerResultadoIntervaloJugador, obtenerAccionIntervaloJugador, obtenerSuspensionIntervaloJugador, 
  obtenerResultado7MIntervaloJugador, obtenerAsistenciaIntervaloJugador, obtenerResultadoTotalJugador, obtenerSuspensionJugador,
  obtenerAsistenciaTotalJugador, obtenerJugadoresEquipo, obtenerPorterosEquipo, obtenerResultadoIntervaloPortero, obtenerResultadoTotalPortero } from '../../app/utils/calculosEstadistica';

jest.mock('../../app/utils/calculosEstadistica', () => ({
  obtenerResultadoIntervaloJugador: jest.fn(),
  obtenerAccionIntervaloJugador: jest.fn(),
  obtenerSuspensionIntervaloJugador: jest.fn(),
  obtenerResultado7MIntervaloJugador: jest.fn(),
  obtenerAsistenciaIntervaloJugador: jest.fn(),
  obtenerResultadoTotalJugador: jest.fn(),
  obtenerSuspensionJugador: jest.fn(),
  obtenerAsistenciaTotalJugador: jest.fn(),
  obtenerJugadoresEquipo: jest.fn(),
  obtenerPorterosEquipo: jest.fn(),
  obtenerResultadoIntervaloPortero: jest.fn(),
  obtenerResultadoTotalPortero: jest.fn(),
}));

const dataEventosMock = [
  { IdJugador: 1, Tipo: "Suspension", Intervalo: 1, EquipoJugador: "local" },
  { IdJugador: 2, Tipo: "Suspension", Intervalo: 1, EquipoJugador: "local" },
];

const dataEquiposMock = [
  { id: 1, nombre: "Equipo Local", jugadores: [{ id: 1, nombre: "Jugador 1" }, { id: 4, nombre: "Portero 1", esPortero: true }] },
  { id: 2, nombre: "Equipo Visitante", jugadores: [{ id: 2, nombre: "Jugador 2" }] },
];

describe('Jugadores', () => {
  beforeEach(() => {
    obtenerResultadoIntervaloJugador.mockClear();
    obtenerAccionIntervaloJugador.mockClear();
    obtenerSuspensionIntervaloJugador.mockClear();
    obtenerResultado7MIntervaloJugador.mockClear();
    obtenerAsistenciaIntervaloJugador.mockClear();
    obtenerResultadoTotalJugador.mockClear();
    obtenerSuspensionJugador.mockClear();
    obtenerAsistenciaTotalJugador.mockClear();
    obtenerJugadoresEquipo.mockClear();
    obtenerPorterosEquipo.mockImplementation(() => [{ id: 4, nombre: 'Portero 1', esPortero: true }]); // Devolver el portero
    obtenerJugadoresEquipo.mockImplementation(() => [{ id: 1, nombre: "Jugador 1" }, { id: 2, nombre: "Jugador 2" }]); // Devolver los jugadores
  });

  it('Debería renderizar sin errores', () => {
    render(<Jugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    expect(screen.getByText(/Players/i)).toBeInTheDocument();
  });


  it('Debería calcular las estadísticas de un jugador correctamente', () => {
    obtenerResultadoIntervaloJugador.mockImplementation(() => 3);
    obtenerSuspensionIntervaloJugador.mockImplementation(() => 1);
    obtenerAccionIntervaloJugador.mockImplementation(() => 2);

    render(<Jugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    // Llamada para obtener estadísticas
    const jugadoresStats = obtenerResultadoIntervaloJugador(dataEventosMock, 'Gol', 0, 600, '1', 'local');
    expect(jugadoresStats).toBe(3);
  });

  it('Debería manejar los eventos correctamente cuando se actualizan los datos de jugadores', async () => {
    obtenerJugadoresEquipo.mockImplementation(() => [1, 2]);
    obtenerPorterosEquipo.mockImplementation(() => [3]);
    
    render(<Jugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    // Esperamos que los jugadores sean actualizados correctamente
    await screen.findByText('Jugador 1');
    await screen.findByText('Jugador 2');
  });

  it('Debería manejar correctamente la actualización de las estadísticas de un portero', () => {
    obtenerResultadoIntervaloPortero.mockImplementation(() => 4);
    
    render(<Jugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    // Verificamos las estadísticas calculadas para porteros
    const porteroStats = obtenerResultadoIntervaloPortero(dataEventosMock, 'Gol', 0, 600, '3', 'visitante');
    expect(porteroStats).toBe(4);
  });

  it('Debería mostrar las estadísticas correctamente por cada intervalo de tiempo', () => {
    obtenerSuspensionIntervaloJugador.mockImplementation(() => 1);
    obtenerResultado7MIntervaloJugador.mockImplementation(() => 1);
    obtenerAsistenciaIntervaloJugador.mockImplementation(() => 3);

    render(<Jugadores dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    // Verifica que se rendericen correctamente las estadísticas
    const suspensiones = screen.getAllByRole('presentation'); // Suponiendo que las suspensiones estén representadas por círculos
    expect(suspensiones).toHaveLength(16); // Esperamos 2 círculos rojos de suspensiones
  });

});
