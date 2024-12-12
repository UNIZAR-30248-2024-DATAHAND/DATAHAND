import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Component from "../../app/components/component"; // Asegúrate de que la ruta sea correcta
import { useParams } from "next/navigation"; // Mock para useParams de Next.js

// Mock de useParams
jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
}));

describe("Componente de Tabs", () => {
    const dataEventos = [
        { id: 1, evento: "Gol" },
        { id: 2, evento: "Tarjeta amarilla" },
    ];
    const dataEquipos = {
        IdPartido: '1',
        Fecha: new Date(),
        EquipoLocal: 'Local',
        EquipoVisitante: 'Visitante',
        MarcadorLocal: 0,
        MarcadorVisitante: 0,
        TiempoDeJuego: 0,
        Parte: 'Primera parte',
        local: {
            jugadores: ['Jugador 1', 'Jugador 2'],
            banquillo: ['Banquillo 1'],
            porteros: ['Portero 1'],
        },
        visitante: {
            jugadores: ['Jugador 3', 'Jugador 4'],
            banquillo: ['Banquillo 2'],
            porteros: ['Portero 2'],
        },
        sistemaDefensivoLocal: "4-4-2",
        sistemaDefensivoVisitante: "4-3-3"
    };

    beforeEach(() => {
        // Mock de useParams para proporcionar un idPartido
        useParams.mockReturnValue({ idPartido: '1' });
    });

    it("debe cambiar a la pestaña 'sistema-de-juego' al hacer clic", async () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Esperar a que el loading-overlay desaparezca
        await waitFor(() => !screen.queryByTestId('loading-overlay'));

        await waitFor(() => screen.getByTestId('contenedor'));
        // Esperar a que el tab 'vista-general' esté disponible
        await waitFor(() => screen.getByTestId('tab-vista-general'));

        // Verificar que la pestaña inicial es "Vista General"
        expect(screen.getByTestId('tab-vista-general')).toHaveClass('bg-[#45b6e5]');

        // Hacer clic en el botón de "Sistema de Juego"
        fireEvent.click(screen.getByTestId('tab-sistema-de-juego'));

        // Verificar que la pestaña activa ahora es "Sistema de Juego"
        expect(screen.getByTestId('tab-sistema-de-juego')).toHaveClass('bg-[#45b6e5]');
    });
});