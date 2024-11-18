import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../app/profile/[userID]/page';

// Mock de ResizeObserver para evitar errores durante las pruebas
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock de las funciones de navegación de Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(() => ({ userID: '123' })), // Simula un userID
}));

describe('Home Page', () => {
    beforeEach(() => {
        // Simulamos la respuesta de la API que debe retornar partidos
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        atributos: {
                            goles: 10,
                            asistencias: 5,
                            efectividad: 80,
                            blocajes: 3,
                        },
                        historialPartidos: ["Partido-81"], // Simula el historial de partidos con el formato "Partido-81"
                        tipoUsuario: 'entrenador', // Simula el tipo de usuario
                    }),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre pruebas
    });

    it('debe mostrar al menos un partido en el historial', async () => {
        render(<Home />);

        // Esperamos que el contenedor de partidos tenga al menos un hijo
        await waitFor(() => {
            // Busca el texto "Partido-81" directamente
            const partidos = screen.getAllByText('Partido-81'); // Coincide con el texto exacto
            expect(partidos.length).toBeGreaterThan(0); // Verifica que haya al menos un partido
        });
    });
});
