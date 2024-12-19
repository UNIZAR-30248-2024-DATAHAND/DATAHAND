import { render, fireEvent, screen } from '@testing-library/react';
import UndoAlerta from '../../app/components/UndoAlerta'; // Ajusta la ruta si es necesario

describe('UndoAlerta', () => {
    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        // Limpiar los mocks antes de cada test
        jest.clearAllMocks();
    });

    it('muestra correctamente el mensaje pasado como prop', () => {
        const mensaje = '¿Estás seguro de eliminar este elemento?';

        // Renderizar el componente con un mensaje
        render(<UndoAlerta mensaje={mensaje} />);

        // Verificar que el mensaje está en el documento
        expect(screen.getByText(mensaje)).toBeInTheDocument();
    });

    it('llama a la función onConfirm al hacer clic en el botón Confirmar', () => {
        // Renderizar el componente con el mock de onConfirm
        render(<UndoAlerta mensaje="Mensaje de prueba" onConfirm={mockOnConfirm} />);

        // Hacer clic en el botón Confirmar
        fireEvent.click(screen.getByText(/Confirmar/i));

        // Verificar que onConfirm fue llamado
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('llama a la función onClose al hacer clic en el botón Cerrar', () => {
        // Renderizar el componente con el mock de onClose
        render(<UndoAlerta mensaje="Mensaje de prueba" onClose={mockOnClose} />);

        // Hacer clic en el botón Cerrar
        fireEvent.click(screen.getByText(/Cerrar/i));

        // Verificar que onClose fue llamado
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });   
});
