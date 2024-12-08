import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../app/page';
import { useRouter } from 'next/navigation';

// Mockeamos useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Login Component', () => {
    let mockPush;

    beforeEach(() => {
        // Configuramos el mock de useRouter
        mockPush = jest.fn();
        useRouter.mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería mostrar un mensaje de error si las credenciales son incorrectas', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Error en las credenciales.' }),
            })
        );

        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
            target: { value: 'incorrecto@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
            target: { value: '1234' },
        });
        fireEvent.click(screen.getByText('Iniciar Sesión'));

        await waitFor(() => {
            expect(screen.getByText('Error en las credenciales.')).toBeInTheDocument();
        });
    });

    it('debería redirigir al perfil del usuario si las credenciales son correctas', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ userID: 9 }),
            })
        );

        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
            target: { value: 'correcto@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
            target: { value: 'securepassword' },
        });
        fireEvent.click(screen.getByText('Iniciar Sesión'));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/profile/9');
        });
    });
});
