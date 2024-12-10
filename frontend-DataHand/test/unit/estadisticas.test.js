import { render, screen, fireEvent } from "@testing-library/react";
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

describe("BarraHorizontal Component", () => {
    it("navega a la página de estadísticas del partido al hacer clic en 'Estadísticas'", () => {
        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "123" });

        const mockPush = jest.fn(); // Mock para el método push
        useRouter.mockReturnValue({
            push: mockPush, // Mockea router.push
        });

        const equiposMock = {
            EquipoLocal: "Equipo 1",
            EquipoVisitante: "Equipo 2",
            TiempoDeJuego: 0,
            Parte: "Inicio",
            MarcadorLocal: 0,
            MarcadorVisitante: 0,
        };

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

        // Simulamos el clic en el botón de estadísticas
        const botonEstadisticas = screen.getByText(/Estadísticas/i);
        fireEvent.click(botonEstadisticas);

        // Verificamos que router.push fue llamado con la URL correcta
        expect(mockPush).toHaveBeenCalledWith("/statsGen/Partido-123");
    });

    it("muestra elementos relevantes en la página StatsGen", async () => {
        // Mock de useParams para controlar el id del partido
        useParams.mockReturnValue({ idPartido: "129" });

        const mockPush = jest.fn(); // Mock para el método push
        useRouter.mockReturnValue({
            push: mockPush,
        });

        // Renderizamos el componente StatsGen
        render(<StatsGen />);

        // Verificamos que los textos esperados estén presentes en la página
        const vistageneralText = await screen.findByText("VISTA GENERAL");
        expect(vistageneralText).toBeInTheDocument();

        const sistjuegoText = await screen.findByText(/sistema de juego/i);
        expect(sistjuegoText).toBeInTheDocument();

        const lanzamientosText = await screen.findByText(/lanzamientos/i);
        expect(lanzamientosText).toBeInTheDocument();

        const especjugText = await screen.findByText(/específicas jugadores/i);
        expect(especjugText).toBeInTheDocument();

        const jugadoresText = await screen.findByText("JUGADORES");
        expect(jugadoresText).toBeInTheDocument();
    });
});
