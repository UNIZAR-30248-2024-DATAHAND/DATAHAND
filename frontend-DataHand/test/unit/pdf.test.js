import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from '../../app/components/component'; // Ajusta la ruta a tu componente
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

jest.mock('jspdf', () => {
    return {
        jsPDF: jest.fn().mockImplementation(() => ({
            addImage: jest.fn(),
            addPage: jest.fn(),
            save: jest.fn(),
        })),
    };
});

jest.mock('html2canvas', () =>
    jest.fn(() =>
        Promise.resolve({
            toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
        })
    )
);

describe('Componente PDF', () => {
    it('captura la pestaña activa y genera un PDF usando ID dinámico', async () => {
        const mockSave = jest.fn();
        jsPDF.mockImplementation(() => ({
            addImage: jest.fn(),
            addPage: jest.fn(),
            save: mockSave,
        }));

        // Simular datos provenientes del endpoint para el ID 100
        const dataEventos = [{ id: 100, nombre: 'Evento Test Partido 100' }];
        const dataEquipos = [{ id: 1, nombre: 'Equipo A' }, { id: 2, nombre: 'Equipo B' }];

        // Renderizar el componente con datos mockeados
        render(<Component dataEventos={dataEventos} dataEquipos={dataEquipos} />);

        // Simular clic en la pestaña activa (opcional si hay una predeterminada)
        const vistaGeneralTab = screen.getByText(/vista general/i);
        expect(vistaGeneralTab).toBeInTheDocument();
        fireEvent.click(vistaGeneralTab);

        // Simular clic en el botón de "Agregar al PDF"
        const addToPDFButton = screen.getByText(/agregar al pdf/i);
        expect(addToPDFButton).toBeInTheDocument();
        fireEvent.click(addToPDFButton);

        // Esperar que html2canvas se haya llamado con el ID dinámico
        await new Promise((r) => setTimeout(r, 100)); // Ajusta el tiempo si es necesario
        expect(html2canvas).toHaveBeenCalled();
        expect(html2canvas).toHaveBeenCalledWith(
            expect.any(Element) // Verifica que se llamó con un elemento DOM
        );

        // Simular clic en el botón de "Generar PDF"
        const generatePDFButton = screen.getByText(/generar pdf con vistas seleccionadas/i);
        fireEvent.click(generatePDFButton);

        // Verificar que se haya llamado al método save
        expect(mockSave).toHaveBeenCalledWith('vistas-seleccionadas.pdf');
    });
});
