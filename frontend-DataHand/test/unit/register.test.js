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

    it('completes the registration process successfully and redirects to homepage', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ nombreCompleto: 'Juan Pérez' }),
        });

        render(<Register />);

        // Completar el formulario
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juan' } });
        fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Pérez' } });
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'juan.perez@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Repite contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('País'), { target: { value: 'España' } });
        const birthDateInput = screen.getByLabelText('Fecha de nacimiento');
        fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });

        // Simular el clic en "Registrarse"
        fireEvent.click(screen.getByText('Registrarse'));

        // Esperar a que aparezca el botón "Cerrar"
        const closeButton = await screen.findByText('Cerrar');
        expect(closeButton).toBeInTheDocument();

        // Simular el clic en "Cerrar"
        fireEvent.click(closeButton);

        // Verificar que se realizó la redirección a la página de inicio
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
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

    it('shows an error when an invalid email is entered', async () => {
        // Renderizar el componente
        render(<Register />);

        // Rellenar el formulario con un correo inválido
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'juan.perez@com' } });

        // Simular envío del formulario
        fireEvent.click(screen.getByText('Registrarse'));

        // Verificar que se muestra el mensaje de error
        expect(await screen.findByText('Error al conectar con el servidor.')).toBeInTheDocument();
    });

    it('shows an error when required fields are left empty', async () => {
        // Renderizar el componente
        render(<Register />);

        // Simular envío del formulario sin completar los campos obligatorios
        fireEvent.click(screen.getByText('Registrarse'));

        // Verificar que se muestra el mensaje de error
        expect(await screen.findByText('Error al conectar con el servidor.')).toBeInTheDocument();
    });
});
