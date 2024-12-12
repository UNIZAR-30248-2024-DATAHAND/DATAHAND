import { render, screen } from '@testing-library/react';
import LoadingPage from '../../app/components/LoadingPage'; // Ajusta la ruta según la ubicación de tu archivo
import '@testing-library/jest-dom'; // Para las aserciones adicionales

describe('LoadingPage', () => {
    it('should render the loading page', () => {
        render(<LoadingPage />);

        // Verificar si el contenedor principal de la animación de carga está en el DOM
        const loadingOverlay = screen.getByTestId('loading-overlay');
        expect(loadingOverlay).toBeInTheDocument();

        // Verificar que los elementos clave de la "hourglass" están presentes
        const hourglass = screen.getByTestId('hourglass-container');
        expect(hourglass).toBeInTheDocument();
    });

    it('should render hourglass components', () => {
        render(<LoadingPage />);

        // Verificar que al menos uno de los elementos de la "hourglass" está en el DOM
        const hourglassCurves = screen.getByTestId('hourglass-curves');
        expect(hourglassCurves).toBeInTheDocument();
    });
});
