// import { render, screen, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Home from '../../app/statsGen/[idPartido]/page';
// import fetchMock from 'jest-fetch-mock';
// import { useParams } from 'next/navigation';

// // Mock de `useParams`
// jest.mock('next/navigation', () => ({
//   useParams: jest.fn(),
// }));

// // Mock del almacenamiento local
// Storage.prototype.getItem = jest.fn((key) => {
//   if (key === 'userID') return '12345';
//   return null;
// });

// fetchMock.enableMocks();

// describe('StatsGen Page', () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//     useParams.mockReturnValue({ idPartido: '1' }); // Mock de ID del partido
//   });

//   test('renders title and checks initial UI components', async () => {
//     await act(async () => {
//       render(<Home />);
//     });

//     expect(screen.getByText('ESTADISTICAS GENERALES')).toBeInTheDocument();
//     expect(screen.getByText('Cargando datos de equipos...')).toBeInTheDocument(); // Espera el componente hijo cargando.
//   });

//   test('fetches match data and updates UI on success', async () => {
//     fetchMock.mockResponse((req) => {
//       if (req.url.includes('crearPartido')) {
//         return Promise.resolve(
//           JSON.stringify({
//             IdPartido: '1',
//             Fecha: '2023-12-01T10:00:00Z',
//             EquipoLocal: 'Equipo A',
//             EquipoVisitante: 'Equipo B',
//             MarcadorLocal: 10,
//             MarcadorVisitante: 8,
//             TiempoDeJuego: 30,
//             Parte: 'Primera parte',
//             local: {
//               jugadores: [],
//               banquillo: [],
//               porteros: [],
//             },
//             visitante: {
//               jugadores: [],
//               banquillo: [],
//               porteros: [],
//             },
//           }),
//         );
//       }

//       if (req.url.includes('eventos')) {
//         return Promise.resolve(
//           JSON.stringify({
//             totalEventos: 2,
//             eventos: [{ id: 1, tipo: 'gol' }, { id: 2, tipo: 'ataque fallido' }],
//           }),
//         );
//       }

//       return Promise.reject('unknown endpoint');
//     });

//     await act(async () => {
//       render(<Home />);
//     });

//     expect(screen.getByText('ESTADISTICAS GENERALES')).toBeInTheDocument();
//     expect(screen.queryByText('Cargando datos de equipos...')).not.toBeInTheDocument();
//     expect(fetchMock).toHaveBeenCalledWith('../api/users/crearPartido?IdPartido=1', expect.anything());
//     expect(fetchMock).toHaveBeenCalledWith('../../api/users/eventos?idPartido=1', expect.anything());
//   });

//   test('handles API errors gracefully', async () => {
//     fetchMock.mockReject(new Error('API error'));

//     await act(async () => {
//       render(<Home />);
//     });

//     expect(screen.getByText('ESTADISTICAS GENERALES')).toBeInTheDocument();
//     // Aquí podrías verificar si muestra un mensaje de error o realiza una acción de fallback según la implementación
//     expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error en la solicitud GET'));
//     expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error en la solicitud:'));
//   });

//   test('calls fetchData on mount and processes promises correctly', async () => {
//     const mockEventos = [
//       { id: 1, tipo: 'gol' },
//       { id: 2, tipo: 'penalti' },
//     ];
//     const mockEquipos = {
//       IdPartido: '1',
//       Fecha: '2023-12-01',
//       EquipoLocal: 'Local',
//       EquipoVisitante: 'Visitante',
//       MarcadorLocal: 5,
//       MarcadorVisitante: 3,
//     };

//     fetchMock.mockResponses(
//       [JSON.stringify({ totalEventos: mockEventos.length, eventos: mockEventos }), { status: 200 }],
//       [JSON.stringify(mockEquipos), { status: 200 }],
//     );

//     await act(async () => {
//       render(<Home />);
//     });

//     expect(fetchMock).toHaveBeenCalledTimes(2);
//     expect(fetchMock).toHaveBeenCalledWith('../../api/users/eventos?idPartido=1', expect.anything());
//     expect(fetchMock).toHaveBeenCalledWith('../api/users/crearPartido?IdPartido=1', expect.anything());
//     expect(screen.getByText('ESTADISTICAS GENERALES')).toBeInTheDocument();
//   });
// });
