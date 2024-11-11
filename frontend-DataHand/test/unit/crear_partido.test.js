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

    it('debe registrar un partido y redirigir al usuario', async () => {
        // Simulando la respuesta de la API cuando se registra el partido
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
});
