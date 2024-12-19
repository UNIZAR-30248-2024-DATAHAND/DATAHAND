import { render, screen, fireEvent } from '@testing-library/react';
import UndoConfirmacion from '../../app/components/UndoConfirmacion'; // Ajusta la ruta si es necesario

describe('UndoConfirmacion', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Limpiar cualquier posible estado anterior
    mockOnClose.mockClear();
  });

  it('debe mostrar correctamente el mensaje pasado como prop', () => {
    render(<UndoConfirmacion mensaje="Mensaje de prueba" onClose={mockOnClose} />);
    
    expect(screen.getByText(/Mensaje de prueba/i)).toBeInTheDocument();
  });

  it('debe llamar a la función onClose cuando se hace clic en el botón Cerrar', () => {
    render(<UndoConfirmacion mensaje="Mensaje de prueba" onClose={mockOnClose} />);

    const closeButton = screen.getByText(/Cerrar/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
