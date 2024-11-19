import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router"; // Mock del router de Next.js
import { BarraHorizontal } from "../../app/register-match/register-match-Horizontal"; // Ajusta el path según tu estructura
import StatsGen from "../../app/statsGen/[idPartido]/page"; // Componente de la página StatsGen
import { useParams } from "next/navigation"; // Mock para useParams de Next.js

// Mock de useRouter
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

// Mock de useParams
jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
}));

describe("BarraHorizontal Component", () => {
    it("navega a la página de estadísticas del partido al hacer clic en 'Eventos'", () => {
        const mockPush = jest.fn(); // Mock para el método push del router
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

        // Renderizar el componente con props simuladas
        render(
            <BarraHorizontal
                equipos={equiposMock}
                setEquipos={jest.fn()}
                tiempoJugado={0}
                setTiempoJugado={jest.fn()}
                handleNavigateStats={() => mockPush("/statsGen/Partido-129")}
            />
        );

        // Verificar que el botón 'Eventos' está en el documento
        const eventosButton = screen.getByText(/eventos/i);
        expect(eventosButton).toBeInTheDocument();

        // Simular el click en el botón
        fireEvent.click(eventosButton);

        // Verificar que se llamó a router.push con la ruta esperada
        expect(mockPush).toHaveBeenCalledWith("/statsGen/Partido-129");
    });

    it("muestra 'Estadísticas Generales' en la página StatsGen", async () => {
        // Mock de useParams con un idPartido ficticio
        useParams.mockReturnValue({ idPartido: "129" });

        // Renderizar el componente StatsGen
        render(<StatsGen />);

        // Verificar que el texto 'Estadísticas Generales' aparece después de cargar los datos
        const generalStatsText = await screen.findByText(/estadísticas generales/i);
        expect(generalStatsText).toBeInTheDocument();
    });

    it("muestra elementos relevantes en la página StatsGen", async () => {
        // Mock de useParams con un idPartido ficticio
        useParams.mockReturnValue({ idPartido: "129" });

        // Renderizar el componente StatsGen
        render(<StatsGen />);

        // Verificar que los elementos esperados estén en la página después de cargar
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
