import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import Sidebar from '../../app/components/Sidebar'; // Ajusta la ruta si es necesario
import { useRouter } from 'next/navigation';

// Mock de useRouter de Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('Sidebar', () => {
    const mockPush = jest.fn(); // Define mockPush aquí

    beforeEach(() => {
        // Configura useRouter para devolver mockPush en cada test
        useRouter.mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        // Restablece todos los mocks después de cada test
        jest.resetAllMocks();
    });

    it('muestra el botón de registrar partido si el usuario es entrenador y al pulsarlo lo redirige correctamente', async () => {
        // Mock de la respuesta de la API de usuario
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                tipoUsuario: 'entrenador',
                nombreCompleto: 'Entrenador Test',
                correoElectronico: 'test@ejemplo.com',
            }),
        });

        // Mock de la respuesta de la API para registrar un partido
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                partido: { IdPartido: 'Partido-123' },
            }),
        });

        // Renderiza el componente Sidebar con el userID
        render(<Sidebar userID="12345" />);

        // Espera a que el botón "Registrar partido" sea visible
        await waitFor(() => screen.getByText(/Registrar partido/i));

        expect(screen.getByText(/Registrar partido/i)).toBeInTheDocument();

        // Envuelve la interacción con `act` para manejar la asíncrona
        await act(async () => {
            fireEvent.click(screen.getByText(/Registrar partido/i));
        });

        // Verifica que la navegación fue llamada con la URL correcta
        expect(mockPush).toHaveBeenCalledWith('/register-match/Partido-123');
    });
});
