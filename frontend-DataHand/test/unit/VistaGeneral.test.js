import { render, screen } from "@testing-library/react";
import VistaGeneral from "../../app/components/vista-general";
import { contarLanzamientosYPerdidas, contarGoles, contarPerdidasDeBalon } from "../../app/utils/calculosEstadistica";

jest.mock("../../app/utils/calculosEstadistica", () => ({
  contarLanzamientosYPerdidas: jest.fn(),
  contarGoles: jest.fn(),
  contarAtaquePosicional: jest.fn(),
  contarAtaquePosicionalConGol: jest.fn(),
  contarContragol: jest.fn(),
  contarContragolConGol: jest.fn(),
  contarContrataque: jest.fn(),
  contarContrataqueConGol: jest.fn(),
  contarLanzamientosTotal: jest.fn(),
  contarLanzamientosYPerdidas: jest.fn(),
  contarPerdidasDeBalon: jest.fn(),
}));

describe("VistaGeneral Component", () => {
  const dataEventosMock = [
    { Tipo: "Gol", Equipo: "local" },
    { Tipo: "Pérdida de balón", Equipo: "local" },
  ];

  const dataEquiposMock = {
    EquipoLocal: "Zaragoza Balonmano",
    EquipoVisitante: "Soria FC",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    contarLanzamientosYPerdidas.mockReturnValue(10);
    contarGoles.mockReturnValue(5);
    contarPerdidasDeBalon.mockReturnValue(2);
  });

  it("Debería mostrar el mensaje de carga cuando no hay datos de los equipos", () => {
    render(<VistaGeneral dataEventos={dataEventosMock} dataEquipos={{}} />);
    const loadingMessage = screen.getByText(/Cargando datos de equipos.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it("Debería renderizar correctamente los nombres de los equipos", () => {
    render(<VistaGeneral dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    expect(screen.getByText("Zaragoza Balonmano")).toBeInTheDocument();
    expect(screen.getByText("Soria FC")).toBeInTheDocument();
  });

  it("Debería llamar a las funciones de cálculo con los parámetros correctos", () => {
    render(<VistaGeneral dataEventos={dataEventosMock} dataEquipos={dataEquiposMock} />);
    
    expect(contarLanzamientosYPerdidas).toHaveBeenCalledWith(dataEventosMock, "local");
    expect(contarGoles).toHaveBeenCalledWith(dataEventosMock, "local");
    expect(contarPerdidasDeBalon).toHaveBeenCalledWith(dataEventosMock, "local");
  });
});
