import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router"; // Mock del router de Next.js
import { BarraHorizontal } from "../../app/register-match/register-match-Horizontal"; // Ajusta el path según tu estructura
import StatsGen from "../../app/statsGen/[idPartido]/page"; // Componente de la página StatsGen
import { useParams } from "next/navigation"; // Mock para useParams de Next.js

// Mock de useRouter de Next.js
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

// Mock de useParams de Next.js
jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
    useRouter: jest.fn(),
}));

beforeEach(() => {
    jest.useFakeTimers(); // Simula temporizadores
    jest.clearAllMocks(); // Limpia todos los mocks
    // Mock global.fetch
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ equipos: ["Equipo 1", "Equipo 2"] }),
        })
    );
});

afterEach(() => {
    jest.runOnlyPendingTimers(); // Limpia temporizadores pendientes
    jest.useRealTimers(); // Restaura temporizadores reales
});

const mockSetEquipos = jest.fn();
const mockSetTiempoJugado = jest.fn();
const equiposMock = {
    EquipoLocal: "Equipo 1",
    EquipoVisitante: "Equipo 2",
    TiempoDeJuego: 0,
    Parte: "Inicio",
    MarcadorLocal: 0,
    MarcadorVisitante: 0,
};

describe("BarraHorizontal Component", () => {
    it('debe mostrar el selector de equipos cuando se hace clic en el botón "Elegir Equipo A"', async () => {
        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "123" });

        const mockPush = jest.fn(); // Mock para el método push
        useRouter.mockReturnValue({
            push: mockPush, // Mockea router.push
        });

        // Renderizamos el componente BarraHorizontal, pasándole las props necesarias
        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={mockSetEquipos}
                tiempoJugado={0}
                showEquipoSelector={true}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        // Obtener el botón para elegir equipo A por role
        const botonEquipoA = screen.getByTestId('boton-equipo-local');
        fireEvent.click(botonEquipoA);
    });

    it('debe mostrar el selector de equipos cuando se hace clic en el botón "Elegir Equipo B"', async () => {
        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "123" });

        const mockPush = jest.fn(); // Mock para el método push
        useRouter.mockReturnValue({
            push: mockPush, // Mockea router.push
        });

        // Renderizamos el componente BarraHorizontal, pasándole las props necesarias
        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={mockSetEquipos}
                tiempoJugado={0}
                showEquipoSelector={true}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        // Obtener el botón para elegir equipo B por role
        const botonEquipoB = screen.getByTestId('boton-equipo-visitante');
        fireEvent.click(botonEquipoB);
    });
});
