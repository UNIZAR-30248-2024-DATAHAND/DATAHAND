import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Sidebar from '../../app/components/Sidebar'; // Ajusta la ruta si es necesario
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('Sidebar', () => {
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockRouterPush });
        fetch.mockClear();
    });

    // Test de accesibilidad
    it('debe tener atributos de accesibilidad correctos', () => {
        render(<Sidebar />);
        
        // Buscar el botón "Registrar partido"
        const botonRegistrarPartido = screen.getByText('Registrar partido');
        
        // Verificar que el botón tiene el atributo 'aria-label' correcto para accesibilidad
        expect(botonRegistrarPartido).toHaveAttribute('aria-label', 'Registrar partido');
    });

    // Test de integracion
    it('debe manejar errores al registrar un partido', async () => {
        // Simulamos una respuesta fallida de la API
        fetch.mockResolvedValueOnce({
            ok: false, // Simula un fallo en la respuesta
            json: async () => ({ message: 'Error al registrar el partido' }),
        });

        render(<Sidebar />);

        // Buscar y hacer clic en el botón para registrar un partido
        const botonRegistrarPartido = screen.getByText('Registrar partido');
        fireEvent.click(botonRegistrarPartido);

        // Esperamos que no se haya llamado a router.push (no debe redirigir si hay error)
        await waitFor(() => expect(mockRouterPush).not.toHaveBeenCalled());

        // Verificar que se muestra el mensaje de error
        expect(screen.getByText('Error al registrar el partido')).toBeInTheDocument();
    });

    // Test de integracion    
    it('debe registrar un partido y redirigir al usuario', async () => {
        // Simulamos la respuesta de la API cuando se registra el partido
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                partido: { IdPartido: 75 }, // Aquí usamos un ID genérico
            }),
        });

        render(<Sidebar />);

        // Buscar el botón "Registrar partido"
        const botonRegistrarPartido = screen.getByText('Registrar partido');
        expect(botonRegistrarPartido).toBeInTheDocument();

        // Hacer clic en el botón para registrar el partido
        fireEvent.click(botonRegistrarPartido);

        // Esperar a que se haga la llamada a fetch y la redirección
        await waitFor(() => expect(fetch).toHaveBeenCalledWith('../api/users/crearPartido', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })));

        // Verificar que el router hizo un push a la página correcta con un ID genérico (sin 'Partido-')
        expect(mockRouterPush).toHaveBeenCalledWith('/register-match/75');
    });

    // Test unitario
    it('debe tener el estado inicial correctamente', () => {
        render(<Sidebar />);

        // Verificar que el sidebar está inicialmente abierto (translate-x-0)
        const sidebar = screen.getByRole('complementary');
        expect(sidebar).toHaveClass('translate-x-0'); // Verifica que la clase indica que está abierto

        // Verificar que el botón de error no está visible al principio
        const errorMessage = screen.queryByText('Error al registrar el partido');
        expect(errorMessage).not.toBeInTheDocument();

        // Verificar que el botón "Registrar partido" está presente
        const botonRegistrarPartido = screen.getByText('Registrar partido');
        expect(botonRegistrarPartido).toBeInTheDocument();
    });
});
