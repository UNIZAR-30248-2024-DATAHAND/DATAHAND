import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router"; // Mock del router de Next.js
import { BarraHorizontal } from "../../app/register-match/register-match-Horizontal"; // Ajusta el path según tu estructura
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

    it("debe abrir el selector de equipos cuando se selecciona el tipo de equipo", async () => {
        const mockSetEquipos = jest.fn();

        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "123" });

        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={mockSetEquipos}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => {}}
                setEventosUndo={jest.fn()}
            />
        );

        // Simulamos el click para seleccionar el equipo local
        const botonEquipoLocal = screen.getByText("Equipo A");
        fireEvent.click(botonEquipoLocal);

        // Esperamos a que aparezca el selector de equipos
        await waitFor(() => expect(screen.getByText('Equipo 1')).toBeInTheDocument());

        // Simulamos la selección de un equipo
        const equipoSeleccionado = screen.getByText('Equipo 1');
        fireEvent.click(equipoSeleccionado);

        // Verificamos que el estado de los equipos se ha actualizado
        expect(mockSetEquipos).toHaveBeenCalledWith(expect.objectContaining({
            EquipoLocal: 'Equipo 1'
        }));
        expect(screen.queryByText('Seleccionar Equipo Local')).not.toBeInTheDocument(); // Verifica que el popup se cierre
    });

    it("debe abrir el selector de equipos cuando se selecciona el tipo de equipo visitante", async () => {
        const mockSetEquipos = jest.fn();

        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "123" });

        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={mockSetEquipos}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => {}}
                setEventosUndo={jest.fn()}
            />
        );

        // Simulamos el click para seleccionar el equipo visitante
        const botonEquipoVisitante = screen.getByText('Seleccionar Equipo Visitante');
        fireEvent.click(botonEquipoVisitante);

        // Esperamos a que aparezca el selector de equipos
        await waitFor(() => expect(screen.getByText('Equipo 2')).toBeInTheDocument());

        // Simulamos la selección de un equipo
        const equipoSeleccionado = screen.getByText('Equipo 2');
        fireEvent.click(equipoSeleccionado);

        // Verificamos que el estado de los equipos se ha actualizado
        expect(mockSetEquipos).toHaveBeenCalledWith(expect.objectContaining({
            EquipoVisitante: 'Equipo 2'
        }));
        expect(screen.queryByText('Seleccionar Equipo Visitante')).not.toBeInTheDocument(); // Verifica que el popup se cierre
    });
});
