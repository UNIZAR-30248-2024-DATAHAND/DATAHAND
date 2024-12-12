import { render, screen } from '@testing-library/react';
import { Card } from '../../app/components/ui/card';

// Prueba para verificar que el componente Card renderiza correctamente
describe('Card', () => {
    it('debería renderizar el contenido pasado como children', () => {
        render(
            <Card>
                <p>Contenido de la tarjeta</p>
            </Card>
        );

        // Verifica que el contenido de la tarjeta se ha renderizado
        expect(screen.getByText('Contenido de la tarjeta')).toBeInTheDocument();
    });

    it('debería aplicar la clase adicional pasada a className', () => {
        render(
            <Card className="extra-class">
                <p>Contenido de la tarjeta</p>
            </Card>
        );

        // Verifica que la clase adicional se aplica correctamente
        const cardElement = screen.getByText('Contenido de la tarjeta').parentElement;
        expect(cardElement).toHaveClass('extra-class');
    });

    it('debería tener las clases predeterminadas', () => {
        render(
            <Card>
                <p>Contenido de la tarjeta</p>
            </Card>
        );

        // Verifica que las clases predeterminadas estén aplicadas correctamente
        const cardElement = screen.getByText('Contenido de la tarjeta').parentElement;
        expect(cardElement).toHaveClass('bg-white');
        expect(cardElement).toHaveClass('shadow-md');
        expect(cardElement).toHaveClass('rounded-lg');
    });
});
