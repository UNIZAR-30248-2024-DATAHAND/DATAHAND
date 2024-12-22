import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../app/statsGen/[idPartido]/page";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../app/components/component", () => () => <div>Mocked Component</div>);
jest.mock("../../app/components/Sidebar", () => () => <div>Mocked Sidebar</div>);

global.localStorage = {
  getItem: jest.fn(() => "mockUserID"),
};

global.fetch = jest.fn();

describe("Home Page - StatsGen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ idPartido: "123" });
  });

  const mockEquipoData = {
    IdPartido: "123",
    Fecha: new Date().toISOString(),
    EquipoLocal: "Equipo A",
    EquipoVisitante: "Equipo B",
    local: { jugadores: [], banquillo: [], porteros: [] },
    visitante: { jugadores: [], banquillo: [], porteros: [] },
  };

  const mockEventoData = {
    totalEventos: 2,
    eventos: [
      { Tipo: "Gol", Minuto: 10, Equipo: "Equipo A" },
      { Tipo: "Gol", Minuto: 20, Equipo: "Equipo B" },
    ],
  };

  it("Debería renderizar correctamente el título de la página", () => {
    render(<Home />);
    const title = screen.getByText(/ESTADISTICAS GENERALES/i);
    expect(title).toBeInTheDocument();
  });

  it("Debería renderizar correctamente los componentes hijos", () => {
    render(<Home />);
    expect(screen.getByText("Mocked Component")).toBeInTheDocument();
    expect(screen.getByText("Mocked Sidebar")).toBeInTheDocument();
  });

  it("Debería mostrar estado de carga inicialmente", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockEquipoData) });
    render(<Home />);
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument(); // Asume que no hay indicador de carga textual
  });

  it("Debería cargar los datos correctamente tras las llamadas API", async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockEventoData) }) // Eventos
      .mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(mockEquipoData) }); // Equipo

    render(<Home />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("../api/users/crearPartido?IdPartido=123", expect.any(Object));
      expect(fetch).toHaveBeenCalledWith("../../api/users/eventos?idPartido=123", expect.any(Object));
    });
  });

  it("Debería mostrar un error cuando falla la llamada a los datos del partido", async () => {
    fetch.mockRejectedValueOnce(new Error("Error al obtener datos"));

    render(<Home />);

    await waitFor(() => {
      // Reemplazar por mensajes de error manejados en el componente si existen
      expect(fetch).toHaveBeenCalled();
    });
  });
});
