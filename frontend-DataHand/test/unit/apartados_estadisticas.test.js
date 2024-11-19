import { render, screen, fireEvent } from "@testing-library/react";
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

    it("debe cambiar a la pestaña 'sistema-de-juego' al hacer clic", () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Verificar que la pestaña 'vista-general' está activa inicialmente
        const vistaGeneralTab = screen.getByText("VISTA GENERAL");
        expect(vistaGeneralTab).toHaveClass('bg-[#45b6e5] text-white');

        // Hacer clic en la pestaña 'sistema-de-juego'
        const sistemaDeJuegoTab = screen.getByText("SISTEMA DE JUEGO");
        fireEvent.click(sistemaDeJuegoTab);

        // Verificar que la pestaña 'sistema-de-juego' ahora está activa
        expect(sistemaDeJuegoTab).toHaveClass('bg-[#45b6e5] text-white');

        // Verificar que la pestaña 'vista-general' ya no está activa
        expect(vistaGeneralTab).not.toHaveClass('bg-[#45b6e5] text-white');
    });

    it("debe cambiar a la pestaña 'lanzamientos' al hacer clic", () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Hacer clic en la pestaña 'lanzamientos'
        const lanzamientosTab = screen.getByText("LANZAMIENTOS");
        fireEvent.click(lanzamientosTab);

        // Verificar que la pestaña 'lanzamientos' ahora está activa
        expect(lanzamientosTab).toHaveClass('bg-[#45b6e5] text-white');
    });

    it("debe cambiar a la pestaña 'lanzamientos' al hacer clic", () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Hacer clic en la pestaña 'lanzamientos'
        const lanzamientosTab = screen.getByText("LANZAMIENTOS");
        fireEvent.click(lanzamientosTab);

        // Verificar que la pestaña 'lanzamientos' ahora está activa
        expect(lanzamientosTab).toHaveClass('bg-[#45b6e5] text-white');
    });

    it("debe cambiar a la pestaña 'específicas-jugadores' al hacer clic", () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Hacer clic en la pestaña 'lanzamientos'
        const especjugTab = screen.getByText("ESPECÍFICAS JUGADORES");
        fireEvent.click(especjugTab);

        // Verificar que la pestaña 'lanzamientos' ahora está activa
        expect(especjugTab).toHaveClass('bg-[#45b6e5] text-white');
    });

    it("debe cambiar a la pestaña 'juagdores' al hacer clic", () => {
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Hacer clic en la pestaña 'lanzamientos'
        const jugadoresTab = screen.getByText("JUGADORES");
        fireEvent.click(jugadoresTab);

        // Verificar que la pestaña 'lanzamientos' ahora está activa
        expect(jugadoresTab).toHaveClass('bg-[#45b6e5] text-white');
    });
});
