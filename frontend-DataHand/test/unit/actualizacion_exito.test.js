import { render, screen, fireEvent } from "@testing-library/react";
import ActualizacionExito from "../../app/components/ActualizacionExito";

describe("ActualizacionExito", () => {
    it("debe renderizar el mensaje correctamente", () => {
        const mensaje = "Actualización completada exitosamente.";
        render(<ActualizacionExito mensaje={mensaje} onClose={jest.fn()} />);

        // Verifica que el mensaje se muestre correctamente
        expect(screen.getByText(/¡Éxito!/i)).toBeInTheDocument();
        expect(screen.getByText(mensaje)).toBeInTheDocument();
    });

    it("debe llamar a la función onClose al hacer clic en el botón", () => {
        const onCloseMock = jest.fn();
        render(<ActualizacionExito mensaje="Prueba de mensaje" onClose={onCloseMock} />);

        // Encuentra el botón y haz clic en él
        const button = screen.getByRole("button", { name: /Continuar/i });
        fireEvent.click(button);

        // Verifica que onClose se haya llamado una vez
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});