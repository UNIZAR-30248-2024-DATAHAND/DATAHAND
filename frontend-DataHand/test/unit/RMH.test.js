import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BarraHorizontal } from "../../app/register-match/register-match-Horizontal";
import { useParams } from "next/navigation";

// Mock de `next/image`
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props) => <img {...props} />,
}));

describe("BarraHorizontal Component", () => {
    const mockEquipos = {
        EscudoLocal: "mocked-local-url.png",
        EscudoVisitante: "mocked-visitor-url.png",
        EquipoLocal: "Equipo A",
        EquipoVisitante: "Equipo B",
        MarcadorLocal: 2,
        MarcadorVisitante: 3,
        TiempoDeJuego: 1500,
        Parte: "Primera parte",
        sistemaDefensivoLocal: true,
        sistemaDefensivoVisitante: true,
    };

    const mockHandlers = {
        manejarClickEquipo: jest.fn(),
        manejarClickFinPartido: jest.fn(),
        iniciarCronometro: jest.fn(),
        detenerCronometro: jest.fn(),
        handleUndo: jest.fn(),
        handleNavigateStats: jest.fn(),
        seleccionarEquipo: jest.fn(),
        setShowEquipoSelector: jest.fn(),
    };

    it("Debería renderizar correctamente el botón del equipo local", () => {
        render(
            <BarraHorizontal 
                equipos={mockEquipos} 
                manejarClickEquipo={mockHandlers.manejarClickEquipo}
            />
        );

        const botonLocal = screen.getByTestId("boton-equipo-local");
        expect(botonLocal).toBeInTheDocument();

        fireEvent.click(botonLocal);
        expect(mockHandlers.manejarClickEquipo).toHaveBeenCalledWith("local");
    });

    it("Debería mostrar correctamente el marcador", () => {
        render(<BarraHorizontal equipos={mockEquipos} />);
        const marcador = screen.getByText(/Marcador: 2 - 3/i);
        expect(marcador).toBeInTheDocument();
    });

    it("Debería mostrar correctamente el cronómetro y la parte", () => {
        render(<BarraHorizontal equipos={mockEquipos} />);
        
        const cronometro = screen.getByText(/Cronómetro: 1500 mins/i);
        const parte = screen.getByText(/Primera parte/i);

        expect(cronometro).toBeInTheDocument();
        expect(parte).toBeInTheDocument();
    });

    it("Debería ejecutar la lógica de los botones correctamente", () => {
        render(
            <BarraHorizontal
                equipos={mockEquipos}
                manejarClickFinPartido={mockHandlers.manejarClickFinPartido}
                iniciarCronometro={mockHandlers.iniciarCronometro}
                detenerCronometro={mockHandlers.detenerCronometro}
            />
        );

        const btnIniciar = screen.getByText("Iniciar");
        const btnDetener = screen.getByText("Detener");

        fireEvent.click(btnIniciar);
        fireEvent.click(btnDetener);

        expect(mockHandlers.iniciarCronometro).toHaveBeenCalled();
        expect(mockHandlers.detenerCronometro).toHaveBeenCalled();
    });

    it("Debería mostrar correctamente el popup de selección de equipos", () => {
        render(
            <BarraHorizontal
                equipos={mockEquipos}
                equiposList={[{ id: 1, nombre: "Equipo Mock" }]}
                showEquipoSelector={true}
                seleccionarEquipo={mockHandlers.seleccionarEquipo}
                setShowEquipoSelector={mockHandlers.setShowEquipoSelector}
            />
        );

        const popupTexto = screen.getByText(/Selecciona un Equipo/i);
        const equipoButton = screen.getByText("Equipo Mock");
        const cerrarPopupButton = screen.getByText("Cerrar");

        expect(popupTexto).toBeInTheDocument();
        expect(equipoButton).toBeInTheDocument();
        expect(cerrarPopupButton).toBeInTheDocument();

        fireEvent.click(equipoButton);
        expect(mockHandlers.seleccionarEquipo).toHaveBeenCalledWith({ id: 1, nombre: "Equipo Mock" });

        fireEvent.click(cerrarPopupButton);
        expect(mockHandlers.setShowEquipoSelector).toHaveBeenCalledWith(false);
    });
});
