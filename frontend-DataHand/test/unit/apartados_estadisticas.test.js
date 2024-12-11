import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Component from "../../app/components/component"; // Asegúrate de que la ruta sea correcta
import { useParams } from "next/navigation";

// Mock de useParams
jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
}));

describe("Component", () => {
    const dataEventos = [
        { id: 1, evento: "Gol" },
        { id: 2, evento: "Tarjeta amarilla" },
    ];
    const dataEquipos = {
        IdPartido: "1",
        Fecha: new Date(),
        EquipoLocal: "Local",
        EquipoVisitante: "Visitante",
        MarcadorLocal: 0,
        MarcadorVisitante: 0,
        TiempoDeJuego: 0,
        Parte: "Primera parte",
        local: {
            jugadores: ["Jugador 1", "Jugador 2"],
            banquillo: ["Banquillo 1"],
            porteros: ["Portero 1"],
        },
        visitante: {
            jugadores: ["Jugador 3", "Jugador 4"],
            banquillo: ["Banquillo 2"],
            porteros: ["Portero 2"],
        },
        sistemaDefensivoLocal: "4-4-2",
        sistemaDefensivoVisitante: "4-3-3",
    };

    beforeEach(() => {
        // Mock de useParams para proporcionar un idPartido
        useParams.mockReturnValue({ idPartido: "1" });
    });

    it("debe cambiar a la pestaña 'sistema de juego' al hacer clic", async () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Esperar a que desaparezca el overlay de carga
        await waitFor(() => expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument());

        // Buscar la pestaña usando findByRole con el valor 'button' y la opción name
        await waitFor(() => screen.findByRole('button', { name: /SISTEMA DE JUEGO/i }));

        // Simular clic
        fireEvent.click(sistemaDeJuegoTab);

        // Verificar que la clase cambió
        expect(sistemaDeJuegoTab).toHaveClass("bg-[#45b6e5] text-white");
    });

    it("debe cambiar a la pestaña 'lanzamientos' al hacer clic", async () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Esperar que cargue el componente
        await waitFor(() => expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument());

        await waitFor(() => screen.findByRole('button', { name: /LANZAMIENTOS/i }));
        // Buscar la pestaña 'LANZAMIENTOS' usando findByRole con el valor 'button' y name
        const lanzamientosTab = await screen.findByRole('button', { name: /LANZAMIENTOS/i });

        // Simular clic
        fireEvent.click(lanzamientosTab);

        // Verificar clase activa
        expect(lanzamientosTab).toHaveClass("bg-[#45b6e5] text-white");
    });
});
