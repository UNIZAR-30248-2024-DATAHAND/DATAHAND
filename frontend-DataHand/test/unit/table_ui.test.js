import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../app/components/ui/table';

describe('Componente Table', () => {
    it('debería renderizar correctamente la tabla', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Encabezado 1</TableHead>
                        <TableHead>Encabezado 2</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Celda 1</TableCell>
                        <TableCell>Celda 2</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        // Verifica que la tabla se ha renderizado correctamente
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Encabezado 1')).toBeInTheDocument();
        expect(screen.getByText('Celda 1')).toBeInTheDocument();
    });
});
