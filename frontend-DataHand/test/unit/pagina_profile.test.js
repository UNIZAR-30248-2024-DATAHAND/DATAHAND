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

describe('Página de Perfil - Profile Page', () => {
    beforeEach(() => {
        // Mock de la API fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        nombreCompleto: 'Juan Pérez',
                        tipoUsuario: 'jugador',
                        pais: 'España',
                        club: 'Real Madrid',
                        atributos: {
                            goles: 12,
                            asistencias: 7,
                            efectividad: 85,
                            blocajes: 2,
                            recuperaciones: 10,
                        },
                        historialPartidos: ['Partido-1', 'Partido-2'],
                        fotoPerfil: 'https://example.com/foto.jpg',
                    }),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    it('debe mostrar el nombre completo del usuario', async () => {
        render(<Home />);

        // Esperar que el nombre del usuario aparezca en la página
        await waitFor(() => {
            const nombreUsuario = screen.getByText('Juan Pérez');
            expect(nombreUsuario).toBeInTheDocument();
        });
    });

    it('debe mostrar las estadísticas del jugador en el radar chart', async () => {
        render(<Home />); // Renderiza la página
        
        // Usa querySelector para obtener el canvas de forma más específica
        const canvas = document.querySelector('canvas'); // Busca el primer <canvas> en el documento
        
        // Verifica que el canvas se haya renderizado
        expect(canvas).toBeInTheDocument();
        
        // Asegúrate de que el canvas tenga un contexto 2D, lo cual significa que el gráfico está renderizado
        const context = canvas.getContext('2d');
        expect(context).toBeTruthy(); // Si el contexto es true, significa que el gráfico se renderizó
    });
                
    it('debe mostrar al menos un partido en el historial', async () => {
        render(<Home />);

        // Verifica que se muestra el historial de partidos
        await waitFor(() => {
            const partido = screen.getByText('Partido-1');
            expect(partido).toBeInTheDocument();
        });
    });

    it('debe mostrar la imagen de perfil del usuario', async () => {
        render(<Home />);
    
        await waitFor(() => {
            const imagenPerfil = screen.getByAltText('Imagen del jugador');
            expect(imagenPerfil.src).toContain('http://localhost/_next/image?url=https%3A%2F%2Fexample.com%2Ffoto.jpg&w=828&q=75');
        });
    });

    it('debe mostrar el país y el club del usuario', async () => {
        render(<Home />);

        // Verifica que el país y el club aparecen correctamente
        await waitFor(() => {
            const pais = screen.getByText('España');
            const club = screen.getByText('Real Madrid');
            expect(pais).toBeInTheDocument();
            expect(club).toBeInTheDocument();
        });
    });
});
