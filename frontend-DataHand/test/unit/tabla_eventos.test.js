import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // Para mejores matchers como `toBeInTheDocument`
import PopUpAccion from "../../app/register-match/register-match-PopUp"; // Ajusta esto según la ubicación del componente

test("debe añadir un evento y mostrarlo en la tabla de eventos", () => {
    const mockOnClose = jest.fn();
    const mockAsistencias = [
        { id: 1, nombre: "Jugador 1" },
        { id: 2, nombre: "Jugador 2" },
        { id: 3, nombre: "Jugador 3" },
        // Agrega jugadores según sea necesario
    ];

    const mockEquipos = { local: "Equipo Local", visitante: "Equipo Visitante" };

    render(
        <PopUpAccion
            showPopup={true}
            onClose={mockOnClose}
            asistencias={mockAsistencias}
            seleccionado={{ equipo: "local", index: 0 }}
            faseDeJuego="Ataque"
            resultado="Empate"
            tiempoJugado="00:30"
            idPartido={1234}
            equipos={mockEquipos}
            setEquipos={() => {}}
        />
    );

    // Interactuar con los elementos para simular la generación de un evento
    const lanzarPosicionButton = screen.getByText("Lat Izq 9M");
    fireEvent.click(lanzarPosicionButton);

    const confirmarButton = screen.getByText("Confirmar");
    fireEvent.click(confirmarButton);

    // Asegurarse de que el evento aparece en la tabla
    const eventoEnTabla = screen.getByText("Lat Izq 9M");
    expect(eventoEnTabla).toBeInTheDocument();
});
