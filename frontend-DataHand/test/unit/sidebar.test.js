import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Sidebar from '../../app/components/Sidebar'; // Ajusta la ruta si es necesario
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('Sidebar', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tipoUsuario: 'entrenador',
        nombreCompleto: 'Entrenador Test',
        correoElectronico: 'test@ejemplo.com',
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        partido: { IdPartido: 'Partido-123' },
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        valoresFiltrados: ['Jugador 1', 'Jugador 2'],
      }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

it('muestra el botón de registrar partido si el usuario es entrenador y al pulsarlo lo redirige correctamente', async () => {
  // Usamos `act` para envolver la renderización y las actualizaciones de estado asíncronas
  await act(async () => {
    render(<Sidebar userID="12345" />);
  });

  // Espera a que el botón "Registrar partido" sea visible
  const registrarPartidoButton = await screen.findByText(/Registrar partido/i);

  // Verifica que el botón de "Registrar partido" esté en el documento
  expect(registrarPartidoButton).toBeInTheDocument();

  // Si se hiciera clic en el botón, se debe redirigir
  await act(async () => {
    fireEvent.click(registrarPartidoButton);
  });

  // Verifica que la navegación se haya llamado con la URL correcta
  expect(mockPush).toHaveBeenCalledWith('/register-match/Partido-123');
});
});
