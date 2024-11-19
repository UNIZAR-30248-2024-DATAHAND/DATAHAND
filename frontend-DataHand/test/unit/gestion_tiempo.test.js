import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BarraHorizontal } from '../../app/register-match/register-match-Horizontal'; // Ajusta la ruta si es necesario

const mockSetEquipos = jest.fn();
const mockSetTiempoJugado = jest.fn();

describe('BarraHorizontal', () => {
    const equipos = {
        sistemaDefensivoLocal: true,
        sistemaDefensivoVisitante: true,
        EquipoLocal: 'Equipo Local',
        EquipoVisitante: 'Equipo Visitante',
        MarcadorLocal: 0,
        MarcadorVisitante: 0,
        TiempoDeJuego: 0,
        Parte: 'Primer Tiempo',
    };

    beforeEach(() => {
        jest.useFakeTimers(); // Simula temporizadores
        jest.clearAllMocks(); // Limpia todos los mocks
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Equipo A' }, { id: 2, name: 'Equipo B' }]),
            })
        ); // Mock de fetch
    });

    afterEach(() => {
        jest.runOnlyPendingTimers(); // Limpia temporizadores pendientes
        jest.useRealTimers(); // Restaura temporizadores reales
    });

    // Test de Integracion
    it('debe iniciar el cronómetro cuando se presiona el botón "Iniciar"', async () => {
        mockSetEquipos.mockImplementation((callback) => {
            const nuevoEstado = callback(equipos);
            expect(nuevoEstado.TiempoDeJuego).toBeGreaterThan(equipos.TiempoDeJuego);
        });

        render(
            <BarraHorizontal
                equipos={equipos}
                setEquipos={mockSetEquipos}
                tiempoJugado={equipos.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        const botonIniciar = screen.getByText('Iniciar');
        fireEvent.click(botonIniciar);

        jest.advanceTimersByTime(1000); // Avanza el temporizador en 1 segundo

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalled();
        });
    });

    // Test de Integracion
    it('debe parar el cronómetro cuando se presiona el botón "Detener"', async () => {
        let tiempoAntesDetener;

        mockSetEquipos.mockImplementation((callback) => {
            const nuevoEstado = callback(equipos);
            tiempoAntesDetener = nuevoEstado.TiempoDeJuego;
        });

        render(
            <BarraHorizontal
                equipos={equipos}
                setEquipos={mockSetEquipos}
                tiempoJugado={equipos.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        const botonIniciar = screen.getByText('Iniciar');
        fireEvent.click(botonIniciar);

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalled();
        });

        const botonDetener = screen.getByText('Detener');
        fireEvent.click(botonDetener);

        jest.advanceTimersByTime(1000); // No debería incrementar más el tiempo

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalledTimes(1); // Solo se llama una vez
            const estadoDetenido = mockSetEquipos.mock.calls[0][0](equipos);
            expect(estadoDetenido.TiempoDeJuego).toBe(tiempoAntesDetener);
        });
    });

    // Test de Integracion
    it('debe finalizar el primer tiempo cuando se presiona el botón "Fin del Primer Tiempo"', async () => {
        mockSetEquipos.mockImplementation((callback) => callback(equipos));

        render(
            <BarraHorizontal
                equipos={equipos}
                setEquipos={mockSetEquipos}
                tiempoJugado={equipos.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        const botonFinPrimerTiempo = screen.getByText('Fin del Primer Tiempo');
        fireEvent.click(botonFinPrimerTiempo);

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalled();
            const estadoFinalizado = mockSetEquipos.mock.calls[0][0](equipos);
            expect(estadoFinalizado.TiempoDeJuego).toBe(30 * 60); // 30 minutos
            expect(estadoFinalizado.Parte).toBe('Fin del primer tiempo');
        });

        expect(screen.getByText('Fin del partido')).toBeInTheDocument();
    });

    // Test de Integracion
    it('debería mostrar y cerrar el popup al hacer clic en un equipo', async () => {
        render(
            <BarraHorizontal
                equipos={{
                    EquipoLocal: 'Equipo 1',
                    EquipoVisitante: 'Equipo 2',
                    TiempoDeJuego: 0,
                    sistemaDefensivoLocal: null,
                    sistemaDefensivoVisitante: null,
                }}
                setEquipos={mockSetEquipos}
                tiempoJugado={0}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        fireEvent.click(screen.getByText('Equipo 1')); // Abre el popup

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/users/equipos'); // Verifica fetch
        });

        expect(await screen.findByText(/Selecciona un Equipo/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Cerrar/i)); // Cierra el popup

        await waitFor(() => {
            expect(screen.queryByText(/Selecciona un Equipo/i)).not.toBeInTheDocument();
        });
    });

    // Test de Integracion
    it('debe formatear correctamente el tiempo', () => {
        render(
            <BarraHorizontal
                equipos={equipos}
                setEquipos={mockSetEquipos}
                tiempoJugado={equipos.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        expect(screen.getByText('Cronómetro: 00:00')).toBeInTheDocument();
    });

    // Test de Integracion
    it('debe redirigir al presionar el botón "Salir"', () => {
        render(
            <BarraHorizontal
                equipos={equipos}
                setEquipos={mockSetEquipos}
                tiempoJugado={equipos.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        const botonSalir = screen.getByText('Salir');
        expect(botonSalir.closest('a')).toHaveAttribute('href', '/');
    });

});
