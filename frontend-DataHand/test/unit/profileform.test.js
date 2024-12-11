import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from '../../app/components/profileform'; // Ruta del componente
import { useRouter } from 'next/navigation';

// Mock del hook de Next.js para redirigir
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('ProfileForm', () => {
    const mockSetUserData = jest.fn();
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockRouterPush }); // Mock de la función `push` del router
    });

    it('should render the form fields correctly', () => {
        const userData = {
            userID: '123',
            nombreCompleto: 'Juan Pérez',
            contrasena: 'password123',
            fotoPerfil: 'profile.jpg',
            club: 'FC Barcelona',
        };

        render(<ProfileForm userData={userData} setUserData={mockSetUserData} />);

        expect(screen.getByLabelText(/Nombre Completo/)).toHaveValue('Juan Pérez');
        const passwordFields = screen.getAllByLabelText(/Contraseña/);
        expect(passwordFields[0]).toHaveValue('password123');  // for 'Contraseña'
        expect(passwordFields[1]).toHaveValue('password123');  // for 'Repite la Contraseña'
        expect(screen.getByLabelText(/Club/)).toHaveValue('FC Barcelona');
    });

    it('should show error if passwords do not match', async () => {
        const userData = {
            userID: '123',
            nombreCompleto: 'Juan Pérez',
            contrasena: 'password123',
            fotoPerfil: 'profile.jpg',
            club: 'FC Barcelona',
        };

        const mockSetUserData = jest.fn(); // Mock function to update userData

        render(<ProfileForm userData={userData} setUserData={mockSetUserData} />);

        const passwordFields = screen.getAllByLabelText(/Contraseña/);
        expect(passwordFields[0]).toHaveValue('password123');  // for 'Contraseña'
        expect(passwordFields[1]).toHaveValue('password123');  // for 'Repite la Contraseña'

        // Change the value of the password fields (this modifies the vector of passwordFields)
        fireEvent.change(passwordFields[0], { target: { value: 'newPassword' } });
        fireEvent.change(passwordFields[1], { target: { value: 'differentPassword' } });

        // Ensure the password fields are updated correctly
        expect(passwordFields[0]).toHaveValue('newPassword');
        expect(passwordFields[1]).toHaveValue('differentPassword');

        // Check if the error message appears
        await waitFor(() => expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument());
    });

    it('should show success alert when profile is updated', async () => {
        const userData = {
            userID: '123',
            nombreCompleto: 'Juan Pérez',
            contrasena: 'password123',
            fotoPerfil: 'profile.jpg',
            club: 'FC Barcelona',
        };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ message: 'Success' }),
        });

        render(<ProfileForm userData={userData} setUserData={mockSetUserData} />);

        fireEvent.click(screen.getByText('Guardar Cambios'));

        await waitFor(() => expect(screen.getByText('El perfil se ha actualizado correctamente.')).toBeInTheDocument());
    });
});
