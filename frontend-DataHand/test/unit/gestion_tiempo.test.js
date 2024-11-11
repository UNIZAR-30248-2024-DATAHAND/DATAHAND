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
        jest.useFakeTimers();
        mockSetEquipos.mockClear();
        mockSetTiempoJugado.mockClear();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

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

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalled();
        });
    });

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

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalledTimes(1);
            const estadoDetenido = mockSetEquipos.mock.calls[0][0](equipos);
            expect(estadoDetenido.TiempoDeJuego).toBe(tiempoAntesDetener);
        });
    });

    it('debe finalizar el primer tiempo cuando se presiona el botón "Fin del Primer Tiempo"', async () => {
        let tiempoAntesFinalizar;
        mockSetEquipos.mockImplementation((callback) => {
            const nuevoEstado = callback(equipos);
            tiempoAntesFinalizar = nuevoEstado.TiempoDeJuego;
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

        const botonFinPrimerTiempo = screen.getByText('Fin del Primer Tiempo');
        expect(botonFinPrimerTiempo).toBeInTheDocument();
        fireEvent.click(botonFinPrimerTiempo);

        await waitFor(() => {
            expect(mockSetEquipos).toHaveBeenCalled();
            const estadoFinalizado = mockSetEquipos.mock.calls[0][0](equipos);
            expect(estadoFinalizado.TiempoDeJuego).toBe(30 * 60); // 30 minutos
            expect(estadoFinalizado.Parte).toBe('Fin del primer tiempo');
        });

        const botonTextoModificado = screen.getByText('Fin del partido');
        expect(botonTextoModificado).toBeInTheDocument();
    });
});