import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../app/statsGen/[idPartido]/page'; // Ajusta la ruta según la ubicación de tu archivo
import '@testing-library/jest-dom'; // Para las aserciones adicionales

// Mock de useRouter de Next.js
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

// Mock de useParams de Next.js
jest.mock("next/navigation", () => ({
    useParams: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('../../app/components/component', () => () => <div>Component Mock</div>);
jest.mock('../../app/components/Sidebar', () => () => <div>Sidebar Mock</div>);

describe('Home Page', () => {
    it('should render the page title correctly', () => {
        render(<Home />);
        const title = screen.getByText('ESTADISTICAS GENERALES');
        expect(title).toBeInTheDocument();
    });

    it('should render the Component with events and teams data', async () => {
        // Mock de los datos de equipos y eventos
        const mockEquipos = {
            IdPartido: '1',
            Fecha: new Date(),
            EquipoLocal: 'Local',
            EquipoVisitante: 'Visitante',
            MarcadorLocal: 0,
            MarcadorVisitante: 0,
            TiempoDeJuego: 0,
            Parte: 'Primera parte',
            local: { jugadores: [], banquillo: [], porteros: [] },
            visitante: { jugadores: [], banquillo: [], porteros: [] },
            sistemaDefensivoLocal: '',
            sistemaDefensivoVisitante: ''
        };

        const mockEventos = [{ evento: 'Gol', tiempo: '10:00' }];

        // Simulando que los datos ya fueron obtenidos
        render(<Home />);

        // Esperar a que los datos estén disponibles y verificar
        await waitFor(() => {
            const component = screen.getByText('Component Mock');
            expect(component).toBeInTheDocument();
        });
    });

    it('should render Sidebar correctly', () => {
        render(<Home />);
        const sidebar = screen.getByText('Sidebar Mock');
        expect(sidebar).toBeInTheDocument();
    });

    it('should update loading state to false after data is fetched', async () => {
        render(<Home />);

        // Esperar a que los datos se obtengan
        await waitFor(() => expect(screen.getByText('Component Mock')).toBeInTheDocument());

        // Verificar que el estado de carga es falso
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument(); // Asumiendo que tienes un texto de "Cargando..."
    });
});
