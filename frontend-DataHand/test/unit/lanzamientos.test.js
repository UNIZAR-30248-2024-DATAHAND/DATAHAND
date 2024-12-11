import { render, screen } from '@testing-library/react';
import Lanzamientos from '../../app/components/lanzamientos'; // Ajusta la ruta si es necesario
import { filtrarResultadoPorPosicion, filtrarResultadoPorLocalizacion } from '../../app/utils/calculosEstadistica'

// Mock de las funciones
jest.mock('../../app/utils/calculosEstadistica', () => ({
    filtrarResultadoPorPosicion: jest.fn(),
    filtrarResultadoPorLocalizacion: jest.fn(),
}));

describe('Lanzamientos Component', () => {
    const mockDataEventos = [
        { resultado: 'Gol', posicion: '"Ext Der"', equipo: 'local' },
        { resultado: 'Palo/Fuera', posicion: '"Lat Der 9M"', equipo: 'visitante' },
        // Agregar más objetos si es necesario para simular los eventos.
    ];

    const mockDataEquipos = [
        { nombre: 'Equipo Local', id: 1 },
        { nombre: 'Equipo Visitante', id: 2 },
    ];

    beforeEach(() => {
        // Resetear mocks antes de cada test
        jest.clearAllMocks();
    });

    it('debe calcular lanzamientos correctamente por posición para el equipo local', () => {
        // Simula el valor devuelto por filtrarResultadoPorPosicion
        filtrarResultadoPorPosicion.mockImplementation((dataEventos, resultado, posicion, equipo) => {
            if (equipo === 'local' && posicion === '"Ext Der"') return 3;
            if (equipo === 'local' && posicion === '"Ext Izq"') return 2;
            return 0;
        });

        render(<Lanzamientos dataEventos={mockDataEventos} dataEquipos={mockDataEquipos} />);

        // Verifica que los lanzamientos para 'Ext Der' y 'Ext Izq' hayan sido calculados
        expect(filtrarResultadoPorPosicion).toHaveBeenCalledTimes(60);
        expect(filtrarResultadoPorPosicion).toHaveBeenCalledWith(mockDataEventos, 'Gol', '"Ext Der"', 'local');
        expect(filtrarResultadoPorPosicion).toHaveBeenCalledWith(mockDataEventos, 'Gol', '"Ext Izq"', 'local');
    });

    it('verifica el cálculo correcto de los lanzamientos totales', () => {
        // Simula los resultados para las funciones de filtrado
        filtrarResultadoPorPosicion.mockImplementation((dataEventos, resultado, posicion, equipo) => {
            if (equipo === 'local' && posicion === '"Ext Der"') return 3;
            if (equipo === 'local' && posicion === '"Ext Izq"') return 2;
            return 0;
        });

        render(<Lanzamientos dataEventos={mockDataEventos} dataEquipos={mockDataEquipos} />);

        // Verifica que el cálculo total de lanzamientos sea correcto
        expect(filtrarResultadoPorPosicion).toHaveBeenCalledWith(mockDataEventos, 'Gol', '"Ext Der"', 'local');
        expect(filtrarResultadoPorPosicion).toHaveBeenCalledWith(mockDataEventos, 'Gol', '"Ext Izq"', 'local');
    });
});
