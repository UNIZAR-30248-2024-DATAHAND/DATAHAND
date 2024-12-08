import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../app/register-user/page';
import { useRouter } from 'next/navigation';

// Mock de useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Register Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockPush });
        global.alert = jest.fn();
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });

    it('completes the registration process successfully', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ nombreCompleto: 'Juan Pérez' }),
        });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } });
        fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Pérez' } });
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'juan.perez@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Repite contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('País'), { target: { value: 'España' } });

        fireEvent.click(screen.getByText('Registrarse'));

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith(
                'Registro exitoso. El usuario Juan Pérez se ha creado correctamente.'
            );
        });
    });

    it('shows an error when passwords do not match', async () => {
        // Renderizar el componente
        render(<Register />);

        // Rellenar el formulario con contraseñas que no coinciden
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Repite contraseña'), { target: { value: 'password321' } });

        // Simular envío del formulario
        fireEvent.click(screen.getByText('Registrarse'));

        // Verificar que se muestra el mensaje de error
        expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    });
});