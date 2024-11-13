import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../app/profile-jugador/page'; // Ajusta la ruta si es necesario

// Mock de ResizeObserver para evitar errores durante las pruebas
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Home Page', () => {
    beforeEach(() => {
        // Simulamos la respuesta de la API que debe retornar partidos
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, nombre: 'Partido 1' }]), // Asegúrate de que esto sea lo que la API retorna
            })
        );
    });

    it('debe mostrar historico de partidos', async () => {
        render(<Home />);

        // Esperamos que el partido aparezca en la pantalla
        await waitFor(() => {
            expect(screen.getByText('Partido 1')).toBeInTheDocument(); // Verificamos que el nombre del partido aparezca
        });
    });
});
