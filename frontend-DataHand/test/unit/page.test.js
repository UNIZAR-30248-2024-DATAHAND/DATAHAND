import { render, screen } from '@testing-library/react';
import Home from '../../app/page'; // Ajusta esta importación a la ubicación de tu archivo de componente Home
import { useRouter } from 'next/navigation';

// Mockea useRouter de Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Home Page', () => {
    test('should render the page', () => {
        // Mockea el comportamiento de useRouter para que no falle
        useRouter.mockImplementation(() => ({
            push: jest.fn(), // Simula la función push para navegación
        }));

        // Renderiza el componente Home (la página principal)
        render(<Home />);

        // Verifica si algún texto o elemento clave está presente en la página para confirmar que se ha cargado
        const element = screen.getByText(/Convierte datos en decisiones./i); // Ajusta esto según el contenido real de tu página
        expect(element).toBeInTheDocument(); // Verifica que el elemento esté presente en el DOM
    });
});
