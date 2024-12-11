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
    it('debe iniciar el cronómetro cuando se presiona el botón "Iniciar"', () => {
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
                setEquipos={jest.fn()}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        const botonIniciar = screen.getByText('Iniciar');
        fireEvent.click(botonIniciar);
    });

    it('debe parar el cronómetro cuando se presiona el botón "Detener"', async () => {
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
                setEquipos={jest.fn()}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        const botonIniciar = screen.getByText('Detener');
        fireEvent.click(botonIniciar);
    });

    // Test de Integracion
    it('debe finalizar el primer tiempo cuando se presiona el botón "Fin del Primer Tiempo"', async () => {
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
                setEquipos={jest.fn()}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        const botonIniciar = screen.getByText('Fin del Primer Tiempo');
        fireEvent.click(botonIniciar);
    });

    // Test de Integracion
    it("debería mostrar y cerrar el popup al hacer clic en un equipo", async () => {
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
                setEquipos={jest.fn()}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => mockPush(`/statsGen/Partido-123`)}
            />
        );

        fireEvent.click(screen.getByText("Equipo 1")); // Abre el popup

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/users/equipos"); // Verifica fetch
        });

    });

    // Test de Integracion
    it('debe formatear correctamente el tiempo', () => {
        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={mockSetEquipos}
                tiempoJugado={equiposMock.TiempoDeJuego}
                setTiempoJugado={mockSetTiempoJugado}
                handleNavigateStats={() => {}}
            />
        );

        expect(screen.getByText('Cronómetro: 00:00')).toBeInTheDocument();
    });
});
