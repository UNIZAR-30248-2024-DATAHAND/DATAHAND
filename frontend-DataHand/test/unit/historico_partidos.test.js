import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../app/profile/[userID]/page';

// Mock de ResizeObserver para evitar errores durante las pruebas
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock de las funciones de navegación de Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(), // Mock para la redirección
    })),
    useParams: jest.fn(() => ({ userID: '123' })), // Simula un userID
}));

describe('Home Page', () => {
    beforeEach(() => {
        // Simulamos la respuesta de la API que debe retornar partidos
        global.fetch = jest.fn((url, options) => {
            if (options?.method === 'DELETE') {
                return Promise.resolve({ ok: true });
            }

            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        atributos: {
                            goles: 10,
                            asistencias: 5,
                            efectividad: 80,
                            blocajes: 3,
                            recuperaciones: 2,
                        },
                        historialPartidos: ["Partido-81"],
                        tipoUsuario: 'entrenador',
                    }),
            });
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre pruebas
    });

    // Test de Integracion
    it('debe mostrar al menos un partido en el historial', async () => {
        render(<Home />);

        await waitFor(() => {
            const partidos = screen.getAllByText('Partido-81');
            expect(partidos.length).toBeGreaterThan(0);
        });
    });

    // Test de Integracion
    it('debe redirigir al usuario al hacer clic en el botón de editar', async () => {
        const useRouter = require('next/navigation').useRouter;
        const mockPush = jest.fn();
        useRouter.mockReturnValue({ push: mockPush });

        render(<Home />);

        // Esperamos a que se renderice el partido
        await waitFor(() => screen.getByText('Partido-81'));

        // Simulamos un clic en el botón de editar
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Verificamos que se haya llamado a `push` con la URL correcta
        expect(mockPush).toHaveBeenCalledWith('/register-match/Partido-81');
    });

    it('debe eliminar un partido del historial al confirmar en el modal', async () => {
        // Renderizar el componente
        render(<Home />);

        // Esperamos a que se renderice el partido
        await waitFor(() => screen.getByText('Partido-81'));

        // Simular el clic en el botón de borrar
        const deleteButton = screen.getByText('Borrar');
        fireEvent.click(deleteButton);

        // Esperar a que el modal de confirmación sea visible
        const confirmModal = await screen.findByText('¿Está seguro de querer eliminar este partido?');
        expect(confirmModal).toBeInTheDocument();

        // Simular clic en el botón de confirmación dentro del modal
        const confirmButton = screen.getByText('Eliminar');
        fireEvent.click(confirmButton);

        // Esperar a que el partido sea eliminado del historial
        await waitFor(() => {
            const partidoEliminado = screen.queryByText('Partido-81');
            expect(partidoEliminado).toBeNull(); // El partido ya no debe estar en el DOM
        });
    });

    it('debe mostrar las estadísticas del partido del historial al hacer clic en el botón de editar', async () => {
        const useRouter = require('next/navigation').useRouter;
        const mockPush = jest.fn();
        useRouter.mockReturnValue({ push: mockPush });

        render(<Home />);

        // Esperamos a que se renderice el partido
        await waitFor(() => screen.getByText('Partido-81'));

        // Simulamos un clic en el botón de editar
        const editButton = screen.getByText('Ver');
        fireEvent.click(editButton);

        // Verificamos que se haya llamado a `push` con la URL correcta
        expect(mockPush).toHaveBeenCalledWith('/statsGen/Partido-81');
    });
});
