import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para usar matchers como "toBeInTheDocument"
import Sidebar from '../../app/components/Sidebar';
import { useRouter } from 'next/navigation';

// Mockear useRouter para evitar errores
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Sidebar', () => {
    it('debería dirigir a http://localhost:3000/editProfile/1 al hacer clic en el botón Editar perfil', () => {
        const userID = 1;

        // Renderizamos el componente Sidebar con userID simulado
        render(<Sidebar userID={userID} />);

        // Buscamos el botón por su texto
        const editButton = screen.getByRole('button', { name: /editar perfil/i });

        // Comprobamos que el enlace contiene el URL correcto
        expect(editButton.closest('a')).toHaveAttribute(
            'href',
            `/editProfile/${userID}`
        );
    });
});
