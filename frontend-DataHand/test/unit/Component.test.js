import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Component from '../../app/components/component';
import '@testing-library/jest-dom';  // Asegura que las matchers como `toBeInTheDocument` estén disponibles.

const mockDataEventos = [
  { IdJugador: 1, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona1', Resultado: 'Gol' },
  { IdJugador: 2, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona2', Resultado: 'Palo' },
];
const mockDataEquipos = [{ Nombre: 'EquipoA', Id: 1 }, { Nombre: 'EquipoB', Id: 2 }];

describe('Componente Principal', () => {

    it('debería mostrar el componente LoadingPage mientras los datos se están cargando', async () => {
        render(<Component dataEventos={mockDataEventos} dataEquipos={mockDataEquipos} />);
        
        // Verifica que el componente de carga esté presente
        expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    });
});
