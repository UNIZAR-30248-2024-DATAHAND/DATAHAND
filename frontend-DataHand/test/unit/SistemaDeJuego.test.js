import { render, screen } from "@testing-library/react";
import SistemaDeJuego from "../../app/components/sistema-de-juego";
import {
  contarContragolConGol,
  contarContrataqueConGol,
  contarContrataqueConFalta,
  contarContrataqueCon7M,
  contarContrataqueConSuspension,
  obtenerSistemaAtaque,
  contarContragolConFalta,
  contarContragolCon7M,
  contarContragolConSuspension,
  filtrarPalosPorSistema,
  filtrarParadasPorSistema,
  contarContragolConParada,
  contarContragolConPalo,
  filtrarFaltasPorSistema,
  filtrar7MPorSistema,
  filtrar2MPorSistema,
  contarContrataqueConParada,
  contarContrataqueConPalo,
  filtrarGolPorSistema,
  obtenerJugadoresEquipo,
  obtenerPorterosEquipo
} from "../../app/utils/calculosEstadistica";

jest.mock("../../app/utils/calculosEstadistica", () => ({
  contarContragolConGol: jest.fn(),
  contarContrataqueConGol: jest.fn(),
  contarContrataqueConFalta: jest.fn(),
  contarContrataqueCon7M: jest.fn(),
  contarContrataqueConSuspension: jest.fn(),
  obtenerSistemaAtaque: jest.fn(),
  contarContragolConFalta: jest.fn(),
  contarContragolCon7M: jest.fn(),
  contarContragolConSuspension: jest.fn(),
  filtrarPalosPorSistema: jest.fn(),
  filtrarParadasPorSistema: jest.fn(),
  contarContragolConParada: jest.fn(),
  contarContragolConPalo: jest.fn(),
  filtrarFaltasPorSistema: jest.fn(),
  filtrar7MPorSistema: jest.fn(),
  filtrar2MPorSistema: jest.fn(),
  contarContrataqueConParada: jest.fn(),
  contarContrataqueConPalo: jest.fn(),
  filtrarGolPorSistema: jest.fn(),
  obtenerJugadoresEquipo: jest.fn(),
  obtenerPorterosEquipo: jest.fn()
}));

describe("SistemaDeJuego", () => {
  const dataEventosMock = [
    { Tipo: "Gol", Intervalo: 1, SistemaAtaque: "Rapido", Equipo: "local" },
    { Tipo: "Falta", Intervalo: 1, SistemaAtaque: "Organizado", Equipo: "local" },
  ];

  const dataEquiposMock = { EquipoLocal: "Zaragoza Balonmano", EquipoVisitante: "Rival FC" };

  beforeEach(() => {
    jest.clearAllMocks();

    obtenerSistemaAtaque.mockReturnValue(["Rapido", "Organizado"]);
    obtenerJugadoresEquipo.mockReturnValue([]);
    obtenerPorterosEquipo.mockReturnValue([{ nombre: "Portero 1" }, { nombre: "Portero 2" }]);
    contarContrataqueConGol.mockReturnValue(5);
    contarContrataqueConFalta.mockReturnValue(2);
    contarContragolConGol.mockReturnValue(3);
    contarContragolConFalta.mockReturnValue(1);
    filtrarGolPorSistema.mockImplementation((_, sistema) => (sistema === "Rapido" ? 2 : 0));
    filtrarFaltasPorSistema.mockImplementation((_, sistema) => (sistema === "Organizado" ? 1 : 0));
  });

  it("Debería renderizar correctamente el nombre del equipo local", () => {
    render(<SistemaDeJuego dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    const teamName = screen.getByText(/Zaragoza Balonmano/i);
    expect(teamName).toBeInTheDocument();
  });

  it("Debería mostrar correctamente los valores de transiciones y contragol", () => {
    render(<SistemaDeJuego dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);

    const contraataqueGoles = screen.getByText("5");
    const contragolGoles = screen.getByText("3");
    expect(contraataqueGoles).toBeInTheDocument();
    expect(contragolGoles).toBeInTheDocument();
  });

  it("Debería manejar correctamente cuando no hay eventos", () => {
    render(<SistemaDeJuego dataEventos={[]} dataEquipos={dataEquiposMock} />);

    const noData = screen.getByText(/Zaragoza Balonmano/i);
    expect(noData).toBeInTheDocument();
  });

  it("Debería calcular las métricas correctamente basadas en los datos de los mocks", () => {
    render(<SistemaDeJuego dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);

    expect(obtenerSistemaAtaque).toHaveBeenCalledWith(dataEventosMock);
    expect(contarContrataqueConGol).toHaveBeenCalledWith(dataEventosMock, "local");
    expect(filtrarGolPorSistema).toHaveBeenCalledWith(dataEventosMock, "Rapido", "local");
    expect(filtrarFaltasPorSistema).toHaveBeenCalledWith(dataEventosMock, "Organizado", "local");
  });
});
