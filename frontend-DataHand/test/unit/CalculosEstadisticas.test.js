  import {
    contarEventos,
    contarGoles,
    contarLanzamientosTotal,
    contarPerdidasDeBalon,
    contarLanzamientosYPerdidas,
    contarAtaquePosicional,
    contarContragol,
    contarContrataque,
    contarContrataqueConGol,
    contarContrataqueConParada,
    contarContrataqueConPalo,
    contarContrataqueConFalta,
    contarContrataqueCon7M,
    contarContrataqueConSuspension,
    contarContragolConGol,
    contarContragolConParada,
    contarContragolConPalo,
    contarContragolConFalta,
    contarContragolCon7M,
    contarContragolConSuspension,
    contarAtaquePosicionalConGol,
    obtenerSistemaAtaque,
    filtrarGolPorSistema,
    filtrarParadasPorSistema,
    filtrarPalosPorSistema,
    filtrarFaltasPorSistema, 
    filtrar7MPorSistema, 
    filtrar2MPorSistema,
    contarEventosPorLocalizacionYResultado,
    contarEventosPorPosicionYResultado,
    obtenerResultadoJugador,
    obtenerSuspensionJugador,
    obtenerAccionJugador,
    filtrarResultadoPorLocalizacionJugador,
    filtrarResultadoPorPosicionJugador,
    obtenerJugadoresEquipo,
    obtenerPorterosEquipo,
    obtenerResultadoIntervaloJugador,
    obtenerAccionIntervaloJugador,
    obtenerSuspensionIntervaloJugador,
    obtenerResultado7MIntervaloJugador,
    obtenerAsistenciaIntervaloJugador,
    obtenerResultadoTotalJugador,
    obtenerAccionTotalJugador,
    obtenerAsistenciaTotalJugador,
    obtenerResultadoIntervaloPortero,
    sacarAsistencias,
    obtenerJugadoresUnicos,
    filtrarResultadoPorLocalizacion,
    obtenerJugadores,
    sacarBlocajes,
    obtenerResultadoTotalPortero,
  } from '../../app/utils/calculosEstadistica';

  describe('Pruebas para contarEventos', () => {
    it('debería devolver el número de eventos cuando recibe un arreglo de eventos', () => {
      const dataEventos = [
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Parada', EquipoJugador: 'EquipoB' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' }
      ];
      const resultado = contarEventos(dataEventos);
      expect(resultado).toBe(3);  // Hay 3 eventos en el arreglo
    });

    it('debería devolver 0 cuando no se pasa un arreglo', () => {
        const dataEventos = null; // O puede ser un valor como un objeto
        const resultado = contarEventos(dataEventos);
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarGoles', () => {
    it('debería devolver el número de goles para el equipo especificado', () => {
      const dataEventos = [
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' }
      ];
      const resultado = contarGoles(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 goles
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null; // O cualquier valor no array
        const resultado = contarGoles(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarLanzamientosTotal', () => {
    it('debería devolver el número total de lanzamientos para un equipo especificado', () => {
      const dataEventos = [
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoB' }
      ];
      const resultado = contarLanzamientosTotal(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 1 gol, 1 parada y 1 palo/fuera
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarLanzamientosTotal(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarPerdidasDeBalon', () => {
    it('debería devolver el número total de pérdidas de balón para un equipo especificado', () => {
      const dataEventos = [
        { Resultado: 'Perdida de balon', EquipoJugador: 'EquipoA' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Perdida de balon', EquipoJugador: 'EquipoA' },
        { Resultado: 'Perdida de balon', EquipoJugador: 'EquipoB' }
      ];
      const resultado = contarPerdidasDeBalon(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 pérdidas de balón
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarPerdidasDeBalon(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
    });
  });

  describe('Pruebas para contarLanzamientosYPerdidas', () => {
    it('debería devolver el número total de eventos (lanzamientos y pérdidas de balón) para un equipo especificado', () => {
      const dataEventos = [
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { Resultado: 'Perdida de balon', EquipoJugador: 'EquipoA' },
        { Resultado: 'Perdida de balon', EquipoJugador: 'EquipoA' },
        { Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { Resultado: 'Parada', EquipoJugador: 'EquipoB' }
      ];
      
      const resultado = contarLanzamientosYPerdidas(dataEventos, 'EquipoA');
      expect(resultado).toBe(6);  // EquipoA tiene 5 eventos: 2 goles, 1 parada, 1 palo/fuera, 1 pérdida de balón
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarLanzamientosYPerdidas(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });
  
  describe('Pruebas para contarAtaquePosicional', () => {
    it('debería devolver el número de eventos de ataque posicional para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Defensa', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoA' }
      ];
      
      const resultado = contarAtaquePosicional(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Ataque Posicional"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarAtaquePosicional(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
    });
  });
  
  describe('Pruebas para contarContragol', () => {
    it('debería devolver el número de eventos de contragol para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragol(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Contragol"
    });
    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContragol(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarContrataque', () => {
    it('debería devolver el número de eventos de contrataque para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contrataque', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contrataque', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataque(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Contrataque"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataque(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarContrataqueConGol', () => {
    it('debería devolver el número de contrataques con gol para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueConGol(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Contrataque" con "Gol"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueConGol(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarContrataqueConParada', () => {
    it('debería devolver el número de contrataques con parada para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Parada', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueConParada(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Contrataque" con "Parada"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueConParada(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });

  describe('Pruebas para contarContrataqueConPalo', () => {
    it('debería devolver el número de contrataques con palo para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contrataque', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueConPalo(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos de "Contrataque" con "Palo/Fuera"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueConPalo(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });
  
  describe('Pruebas para contarContrataqueConFalta', () => {
    it('debería devolver el número de contrataques con falta para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueConFalta(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 eventos de "Contragol" con "Falta"
    });

    it('debería devolver un arreglo vacío cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueConFalta(dataEventos, 'EquipoA');
        expect(resultado).toEqual([]);  // No es un arreglo, por lo que debe devolver un arreglo vacío
      });
  });
  
  describe('Pruebas para contarContrataqueCon7M', () => {
    it('debería devolver el número de contrataques con "7m provocado" o "7m + 2min" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: '7m provocado', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m provocado', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueCon7M(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos con "7m provocado" o "7m + 2min"
    });
    it('debería devolver un arreglo vacío cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueCon7M(dataEventos, 'EquipoA');
        expect(resultado).toEqual([]);  // No es un arreglo, por lo que debe devolver un arreglo vacío
      });
  });
  
  describe('Pruebas para contarContrataqueConSuspension', () => {
    it('debería devolver el número de contrataques con "2 Minutos" o "7m + 2min" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: '2 Minutos', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '2 Minutos', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContrataqueConSuspension(dataEventos, 'EquipoA');
      expect(resultado).toBe(3);  // EquipoA tiene 3 eventos con "2 Minutos" o "7m + 2min"
    });

    it('debería devolver un arreglo vacío cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContrataqueConSuspension(dataEventos, 'EquipoA');
        expect(resultado).toEqual([]);  // No es un arreglo, por lo que debe devolver un arreglo vacío
      });
  });
  
  describe('Pruebas para contarContragolConGol', () => {
    it('debería devolver el número de contragoles con "Gol" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConGol(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 3 contragoles con "Gol"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContragolConGol(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });
  
  describe('Pruebas para contarContragolConParada', () => {
    it('debería devolver el número de contragoles con "Parada" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConParada(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "Parada"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContragolConParada(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });
  
  describe('Pruebas para contarContragolConPalo', () => {
    it('debería devolver el número de contragoles con "Palo/Fuera" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConPalo(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "Palo/Fuera"
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarContragolConPalo(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
      });
  });
  
  describe('Pruebas para contarContragolConFalta', () => {
    it('debería devolver el número de contragoles con "Falta" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Parada', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConFalta(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "Falta"
    });

    // it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const resultado = contarContragolConFalta(dataEventos, 'EquipoA');
    //     expect(resultado).toBe();  // No es un arreglo, por lo que debe devolver 0
    //   });
  });
  
  describe('Pruebas para contarContragolCon7M', () => {
    it('debería devolver el número de contragoles con "7m provocado" o "7m + 2min" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: '7m provocado', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: '7m provocado', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Parada', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolCon7M(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "7m provocado" o "7m + 2min"
    });

    // it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const resultado = contarContragolCon7M(dataEventos, 'EquipoA');
    //     expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
    //   });
  });

  describe('Pruebas para contarContragolConSuspension', () => {
    it('debería devolver el número de contragoles con "2 Minutos" o "7m + 2min" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: '2 Minutos', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConSuspension(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "2 Minutos" o "7m + 2min"
    });

    // it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const resultado = contarContragolConSuspension(dataEventos, 'EquipoA');
    //     expect(resultado).toBe(0);  // No es un arreglo, por lo que debe devolver 0
    //   });
  });
  
  describe('Pruebas para contarContragolConSuspension', () => {
    it('debería devolver el número de contragoles con "2 Minutos" o "7m + 2min" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Accion: '2 Minutos', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contragol', Accion: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Contragol', Accion: '7m + 2min', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarContragolConSuspension(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 contragoles con "2 Minutos" o "7m + 2min"
    });

    // it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const resultado = contarContragolConSuspension(dataEventos, 'EquipoA');
    //     expect(resultado).toBe();  // No es un arreglo, por lo que debe devolver 0
    //   });
  });

  describe('Pruebas para contarAtaquePosicionalConGol', () => {
    it('debería devolver el número de ataques posicionales con "Gol" para un equipo especificado', () => {
      const dataEventos = [
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { FaseDeJuego: 'Contraataque', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' }
      ];
  
      const resultado = contarAtaquePosicionalConGol(dataEventos, 'EquipoA');
      expect(resultado).toBe(2);  // EquipoA tiene 2 ataques posicionales con gol
    });

    it('debería devolver 0 cuando no se pasa un arreglo de eventos', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = contarAtaquePosicionalConGol(dataEventos, 'EquipoA');
        expect(resultado).toBe(0);  // No es un arreglo, debe devolver 0
      });
  });
  
  describe('Pruebas para obtenerSistemaAtaque', () => {
    it('debería devolver un array con los sistemas de ataque únicos', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', EquipoJugador: 'EquipoB' },
        { SistemaDeAtaque: 'Ataque Posicional', EquipoJugador: 'EquipoC' },
        { SistemaDeAtaque: 'Contragol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', EquipoJugador: 'EquipoB' }
      ];
  
      const resultado = obtenerSistemaAtaque(dataEventos);
      expect(resultado).toEqual(['Ataque Posicional', 'Contragol']);  // Debería devolver los dos sistemas únicos
    });

    it('debería devolver un array vacío si dataEventos no es un arreglo', () => {
        const dataEventos = null;  // O cualquier valor no array
        const resultado = obtenerSistemaAtaque(dataEventos);
        expect(resultado).toEqual([]);  // No es un arreglo, debe devolver un array vacío
      });
  });

  describe('Pruebas para filtrarGolPorSistema', () => {
    it('debería contar correctamente los goles de un equipo en un sistema de ataque', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' }
      ];
  
      const sistemaDeAtaque = 'Ataque Posicional';
      const equipo = 'EquipoA';
      
      const resultado = filtrarGolPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(2);  // 'EquipoA' tiene 2 goles en 'Ataque Posicional'
    });

    // it('debería devolver 0 si dataEventos no es un arreglo', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const sistemaDeAtaque = 'Ataque Posicional';
    //     const equipo = 'EquipoA';
        
    //     const resultado = filtrarGolPorSistema(dataEventos, sistemaDeAtaque, equipo);
    //     expect(resultado).toBe(0);  // No es un arreglo, debe devolver 0 goles
    //   });
  });
  
  describe('Pruebas para filtrarParadasPorSistema', () => {
    it('debería contar correctamente las paradas de un equipo en un sistema de ataque', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Resultado: 'Parada', EquipoJugador: 'EquipoB' }
      ];
  
      const sistemaDeAtaque = 'Contragol';
      const equipo = 'EquipoA';
      
      const resultado = filtrarParadasPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(1);  // 'EquipoA' tiene 1 parada en 'Contragol'
    });

    // it('debería devolver 0 si dataEventos no es un arreglo', () => {
    //     const dataEventos = null;  // O cualquier valor no array
    //     const sistemaDeAtaque = 'Contragol';
    //     const equipo = 'EquipoA';
        
    //     const resultado = filtrarParadasPorSistema(dataEventos, sistemaDeAtaque, equipo);
    //     expect(resultado).toBe(0);  // No es un arreglo, debe devolver 0 paradas
    //   });
  });
  
  describe('Pruebas para filtrarPalosPorSistema', () => {
    it('debería contar correctamente los palos en un sistema de ataque para un equipo', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Resultado: 'Gol', EquipoJugador: 'EquipoB' }
      ];
  
      const sistemaDeAtaque = 'Contragol';
      const equipo = 'EquipoA';
      
      const resultado = filtrarPalosPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(1);  // 'EquipoA' tiene 1 'Palo/Fuera' en 'Contragol'
    });

    // it('debería devolver 0 si dataEventos no es un arreglo', () => {
    //     const dataEventos = null;  // O cualquier valor no válido (como un número o un objeto)
    //     const sistemaDeAtaque = 'Contragol';
    //     const equipo = 'EquipoA';
        
    //     const resultado = filtrarPalosPorSistema(dataEventos, sistemaDeAtaque, equipo);
    //     expect(resultado).toBe(0);  // No es un arreglo, debe devolver 0 palos
    //   });
  });

  describe('Pruebas para filtrarFaltasPorSistema', () => {
    it('debería contar correctamente las faltas en un sistema de ataque para un equipo', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Falta', EquipoJugador: 'EquipoB' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Falta', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Falta', EquipoJugador: 'EquipoA' }
      ];
  
      const sistemaDeAtaque = 'Ataque Posicional';
      const equipo = 'EquipoA';
      
      const resultado = filtrarFaltasPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(3);  // 'EquipoA' tiene 3 faltas en 'Ataque Posicional'
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const dataEventos = null;  // Puede probar con null, número, objeto, etc.
        const sistemaDeAtaque = 'Contragol';
        const equipo = 'EquipoA';
        
        const resultado = filtrarFaltasPorSistema(dataEventos, sistemaDeAtaque, equipo);
        expect(resultado).toBe(0);  // No es un arreglo, debe devolver 0
      });
  });

  describe('Pruebas para filtrar7MPorSistema', () => {
    it('debería contar correctamente los 7m en un sistema de ataque para un equipo', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '7m provocado', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '7m + 2min', EquipoJugador: 'EquipoB' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '7m + 2min', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Accion: '7m provocado', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Gol', EquipoJugador: 'EquipoA' }
      ];
  
      const sistemaDeAtaque = 'Ataque Posicional';
      const equipo = 'EquipoA';
      
      const resultado = filtrar7MPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(2);  // 'EquipoA' tiene 2 eventos de '7m' en 'Ataque Posicional'
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const dataEventos = null;  // Probar con valor no válido (null)
        const sistemaDeAtaque = 'Ataque Posicional';
        const equipo = 'EquipoA';
        
        const resultado = filtrar7MPorSistema(dataEventos, sistemaDeAtaque, equipo);
        expect(resultado).toBe(0);  // Si dataEventos no es un array, debe devolver 0
      });
  });
  
  describe('Pruebas para filtrar2MPorSistema', () => {
    it('debería contar correctamente los 2 minutos en un sistema de ataque para un equipo', () => {
      const dataEventos = [
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '2 Minutos', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '7m + 2min', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Contragol', Accion: '2 Minutos', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: 'Gol', EquipoJugador: 'EquipoA' },
        { SistemaDeAtaque: 'Ataque Posicional', Accion: '2 Minutos', EquipoJugador: 'EquipoB' }
      ];
      const sistemaDeAtaque = 'Ataque Posicional';
      const equipo = 'EquipoA';
  
      const resultado = filtrar2MPorSistema(dataEventos, sistemaDeAtaque, equipo);
      expect(resultado).toBe(2); // Debe contar solo los eventos relacionados con 'EquipoA' en 'Ataque Posicional'
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const dataEventos = null;  // Parámetro inválido
        const sistemaDeAtaque = 'Ataque Posicional';
        const equipo = 'EquipoA';
    
        const resultado = filtrar2MPorSistema(dataEventos, sistemaDeAtaque, equipo);
        expect(resultado).toBe(0); // Si dataEventos no es un array, debe devolver 0
      });
  });
  
  describe('Pruebas para contarEventosPorLocalizacionYResultado', () => {
    it('debería contar correctamente los eventos por localización y resultado para un equipo', () => {
      const dataEventos = [
        { LocalizacionLanzamiento: 'Central', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { LocalizacionLanzamiento: 'Central', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { LocalizacionLanzamiento: 'Derecha', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { LocalizacionLanzamiento: 'Central', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
        { LocalizacionLanzamiento: 'Central', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
      ];
      const resultado = 'Gol';
      const localizacion = 'Central';
      const equipo = 'EquipoA';
  
      const resultadoContado = contarEventosPorLocalizacionYResultado(dataEventos, resultado, localizacion, equipo);
      expect(resultadoContado).toBe(2);
    });

    it('debería devolver 0 si dataEventos no es un array', () => {
        const resultadoContado = contarEventosPorLocalizacionYResultado(null, 'Gol', 'Central', 'EquipoA');
        expect(resultadoContado).toBe(0);
      });
  });
  
  describe('Pruebas para contarEventosPorPosicionYResultado', () => {
    it('debería contar correctamente los eventos con posición, resultado y equipo', () => {
      const dataEventos = [
        { PosicionLanzador: 'Central', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { PosicionLanzador: 'Izquierda', Resultado: 'Gol', EquipoJugador: 'EquipoA' },
        { PosicionLanzador: 'Central', Resultado: 'Gol', EquipoJugador: 'EquipoB' },
        { PosicionLanzador: 'Izquierda', Resultado: 'Parada', EquipoJugador: 'EquipoA' },
      ];
  
      const resultado = 'Gol';
      const posicion = 'Central';
      const equipo = 'EquipoA';
  
      const resultadoContado = contarEventosPorPosicionYResultado(dataEventos, resultado, posicion, equipo);
      expect(resultadoContado).toBe(1);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const resultadoContado = contarEventosPorPosicionYResultado(null, 'Gol', 'Central', 'EquipoA');
        expect(resultadoContado).toBe(0);
      });
  });
  
  describe('Pruebas para obtenerResultadoJugador', () => {
    it('debería contar correctamente los eventos con resultado, fase de juego y jugador', () => {
      const dataEventos = [
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Gol', IdJugador: 'Jugador1' },
        { FaseDeJuego: 'Contragol', Resultado: 'Gol', IdJugador: 'Jugador1' },
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Parada', IdJugador: 'Jugador2' },
      ];
  
      const resultado = 'Gol';
      const faseDeJuego = 'Ataque Posicional';
      const jugador = 'Jugador1';
  
      const eventosContados = obtenerResultadoJugador(dataEventos, resultado, faseDeJuego, jugador);
      expect(eventosContados).toBe(1);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const resultadoContado = obtenerResultadoJugador(null, 'Gol', 'Ataque Posicional', 'Jugador1');
        expect(resultadoContado).toBe(0);
      });
  });

  describe('Pruebas para obtenerResultadoJugador', () => {
    it('debería devolver 0 si no hay eventos que cumplan las condiciones', () => {
      const dataEventos = [
        { FaseDeJuego: 'Contragol', Resultado: 'Parada', IdJugador: 'Jugador1' },
        { FaseDeJuego: 'Ataque Posicional', Resultado: 'Parada', IdJugador: 'Jugador2' },
      ];
  
      const resultado = 'Gol';
      const faseDeJuego = 'Contragol';
      const jugador = 'Jugador1';
  
      const eventosContados = obtenerResultadoJugador(dataEventos, resultado, faseDeJuego, jugador);
      expect(eventosContados).toBe(0);
    });
  });
  
  describe('Pruebas para obtenerSuspensionJugador', () => {
    it('debería contar correctamente las suspensiones para un jugador', () => {
      const dataEventos = [
        { Suspension: '2 Minutos', IdJugador: 'Jugador1' },
        { Suspension: '7m + 2min', IdJugador: 'Jugador1' },
        { Suspension: '2 Minutos', IdJugador: 'Jugador2' },
        { Suspension: '2 Minutos', IdJugador: 'Jugador1' },
      ];
  
      const suspension = '2 Minutos';
      const jugador = 'Jugador1';
  
      const resultado = obtenerSuspensionJugador(dataEventos, suspension, jugador);
      expect(resultado).toBe(2);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const resultado = obtenerSuspensionJugador(null, '2 Minutos', 'Jugador1');
        expect(resultado).toBe(0);
      });
  });

  describe('Pruebas para obtenerSuspensionJugador', () => {
    it('debería devolver 0 si no hay suspensiones que cumplan con las condiciones', () => {
      const dataEventos = [
        { Suspension: '7m + 2min', IdJugador: 'Jugador2' },
        { Suspension: '2 Minutos', IdJugador: 'Jugador3' },
      ];
  
      const suspension = '2 Minutos';
      const jugador = 'Jugador1';
  
      const resultado = obtenerSuspensionJugador(dataEventos, suspension, jugador);
      expect(resultado).toBe(0);
    });
  });
  
  describe('Pruebas para obtenerAccionJugador', () => {
    it('debería contar correctamente las acciones de un jugador', () => {
      const dataEventos = [
        { Accion: 'Falta', IdJugador: 'Jugador1' },
        { Accion: 'Gol', IdJugador: 'Jugador1' },
        { Accion: 'Falta', IdJugador: 'Jugador2' },
        { Accion: 'Falta', IdJugador: 'Jugador1' },
      ];
  
      const accion = 'Falta';
      const jugador = 'Jugador1';
  
      const resultado = obtenerAccionJugador(dataEventos, accion, jugador);
      expect(resultado).toBe(2);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        const resultado = obtenerAccionJugador(null, 'Falta', 'Jugador1');
        expect(resultado).toBe(0);
      });
  });

  describe('Pruebas para obtenerAccionJugador', () => {
    it('debería devolver 0 si no hay acciones que cumplan con las condiciones', () => {
      const dataEventos = [
        { Accion: 'Gol', IdJugador: 'Jugador2' },
        { Accion: 'Parada', IdJugador: 'Jugador3' },
      ];
  
      const accion = 'Falta';
      const jugador = 'Jugador1';
  
      const resultado = obtenerAccionJugador(dataEventos, accion, jugador);
      expect(resultado).toBe(0);
    });
  });
  
  describe('filtrarResultadoPorLocalizacionJugador', () => {
    it('debería contar correctamente los eventos válidos', () => {
      const dataEventos = [
        { LocalizacionLanzamiento: 'Centro', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
        { LocalizacionLanzamiento: 'Derecha', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador2' },
        { LocalizacionLanzamiento: 'Centro', Resultado: 'Parada', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
        { LocalizacionLanzamiento: 'Centro', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
      ];
  
      const resultado = 'Gol';
      const localizacion = 'Centro';
      const equipo = 'Equipo1';
      const jugador = 'Jugador1';
  
      expect(filtrarResultadoPorLocalizacionJugador(dataEventos, resultado, localizacion, equipo, jugador)).toBe(2);
    });

    it('debería devolver 0 si no hay eventos que cumplan las condiciones', () => {
        const dataEventos = [
          { LocalizacionLanzamiento: 'Izquierda', Resultado: 'Parada', EquipoJugador: 'Equipo2', IdJugador: 'Jugador3' },
          { LocalizacionLanzamiento: 'Derecha', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador2' },
        ];
      
        expect(filtrarResultadoPorLocalizacionJugador(dataEventos, 'Gol', 'Centro', 'Equipo1', 'Jugador1')).toBe(0);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        expect(filtrarResultadoPorLocalizacionJugador(null, 'Gol', 'Centro', 'Equipo1', 'Jugador1')).toBe(0);
    }); 
  });
  
  describe('filtrarResultadoPorPosicionJugador', () => {
    it('debería contar correctamente los eventos válidos', () => {
      const dataEventos = [
        { PosicionLanzador: 'LD', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
        { PosicionLanzador: 'PI', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador2' },
        { PosicionLanzador: 'LD', Resultado: 'Parada', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
        { PosicionLanzador: 'LD', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador1' },
      ];
  
      const resultado = 'Gol';
      const posicion = 'LD';
      const equipo = 'Equipo1';
      const jugador = 'Jugador1';
  
      expect(filtrarResultadoPorPosicionJugador(dataEventos, resultado, posicion, equipo, jugador)).toBe(2);
    });

    it('debería devolver 0 si no hay eventos que cumplan las condiciones', () => {
        const dataEventos = [
          { PosicionLanzador: 'PI', Resultado: 'Parada', EquipoJugador: 'Equipo2', IdJugador: 'Jugador3' },
          { PosicionLanzador: 'PI', Resultado: 'Gol', EquipoJugador: 'Equipo1', IdJugador: 'Jugador2' },
        ];
      
        expect(filtrarResultadoPorPosicionJugador(dataEventos, 'Gol', 'LD', 'Equipo1', 'Jugador1')).toBe(0);
    });

    it('debería devolver 0 si dataEventos no es un arreglo', () => {
        expect(filtrarResultadoPorPosicionJugador(null, 'Gol', 'LD', 'Equipo1', 'Jugador1')).toBe(0);
    });
  });
  
  describe('obtenerJugadores', () => {
    it('debería retornar un array con jugadores únicos', () => {
      const dataEventos = [
        { IdJugador: "Jugador1", Evento: "Gol" },
        { IdJugador: "Jugador2", Evento: "Asistencia" },
        { IdJugador: "Jugador1", Evento: "Falta" },
        { IdJugador: "Jugador3", Evento: "Gol" },
      ];
  
      expect(obtenerJugadores(dataEventos)).toEqual(["Jugador1", "Jugador2", "Jugador3"]);
    });

    it('debería retornar un array vacío si no hay jugadores en el arreglo', () => {
        const dataEventos = [];
        expect(obtenerJugadores(dataEventos)).toEqual([]);
    });
      
    it('debería retornar un array vacío si dataEventos no es un arreglo', () => {
        expect(obtenerJugadores(null)).toEqual([]);
        expect(obtenerJugadores(undefined)).toEqual([]);
        expect(obtenerJugadores("no-es-arreglo")).toEqual([]);
    });
      
  });
  
  describe('obtenerJugadoresEquipo', () => {
    it('debería retornar un array de jugadores únicos de un equipo específico', () => {
      const dataEventos = [
        { IdJugador: "Jugador1", EquipoJugador: "EquipoA", Evento: "Gol" },
        { IdJugador: "Jugador2", EquipoJugador: "EquipoA", Evento: "Asistencia" },
        { IdJugador: "Jugador3", EquipoJugador: "EquipoB", Evento: "Gol" },
        { IdJugador: "Jugador1", EquipoJugador: "EquipoA", Evento: "Falta" },
      ];
  
      expect(obtenerJugadoresEquipo(dataEventos, "EquipoA")).toEqual(["Jugador1", "Jugador2"]);
    });

    it('debería retornar un array vacío si no hay eventos para el equipo especificado', () => {
        const dataEventos = [
          { IdJugador: "Jugador1", EquipoJugador: "EquipoB", Evento: "Gol" }
        ];
      
        expect(obtenerJugadoresEquipo(dataEventos, "EquipoA")).toEqual([]);
    });
      
    it('debería retornar un array vacío si dataEventos no es un arreglo', () => {
        expect(obtenerJugadoresEquipo(null, "EquipoA")).toEqual([]);
        expect(obtenerJugadoresEquipo(undefined, "EquipoA")).toEqual([]);
        expect(obtenerJugadoresEquipo("no-es-arreglo", "EquipoA")).toEqual([]);
    });
  });
  
  describe('obtenerPorterosEquipo', () => {
    it('debería retornar un array con los porteros únicos de un equipo', () => {
      const dataEventos = [
        { IdPortero: "Portero1", EquipoPortero: "EquipoA", Evento: "Gol" },
        { IdPortero: "Portero2", EquipoPortero: "EquipoA", Evento: "Asistencia" },
        { IdPortero: "Portero3", EquipoPortero: "EquipoA", Evento: "Falta" },
      ];
  
      expect(obtenerPorterosEquipo(dataEventos, "EquipoA")).toEqual(["Portero1", "Portero2", "Portero3"]);
    });

    it('debería retornar un array vacío si no hay eventos de porteros para el equipo', () => {
        const dataEventos = [
          { IdPortero: "Portero1", EquipoPortero: "EquipoB", Evento: "Gol" }
        ];
      
        expect(obtenerPorterosEquipo(dataEventos, "EquipoA")).toEqual([]);
    });
    
    it('debería retornar un array vacío si dataEventos no es un arreglo', () => {
        expect(obtenerPorterosEquipo(null, "EquipoA")).toEqual([]);
        expect(obtenerPorterosEquipo(undefined, "EquipoA")).toEqual([]);
        expect(obtenerPorterosEquipo("no-es-arreglo", "EquipoA")).toEqual([]);
    });      
  });
  
  describe('obtenerResultadoIntervaloJugador', () => {
    it('debería contar los goles del jugador dentro del intervalo especificado', () => {
        const dataEventos = [
          { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 15 },
          { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 30 },
          { Resultado: "Falta", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 },
          { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador2", MinSeg: 40 }
        ];
      
        const resultado = obtenerResultadoIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "EquipoA");
        expect(resultado).toEqual(1); // Sólo el gol en el minuto 15 cumple con la condición
    });

    it('debería retornar 0 si no hay eventos en el intervalo especificado', () => {
        const dataEventos = [
          { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 40 }
        ];
      
        const resultado = obtenerResultadoIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "EquipoA");
        expect(resultado).toEqual(0); // Ningún gol en el intervalo entre 10 y 30 minutos
    });
      
    it('debería retornar 0 si el resultado no coincide con "Gol"', () => {
        const dataEventos = [
          { Resultado: "Falta", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 },
          { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador2", MinSeg: 20 }
        ];
      
        const resultado = obtenerResultadoIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "EquipoA");
        expect(resultado).toEqual(0); // El jugador "Jugador1" no tiene goles
    });
  });

    describe('obtenerAccionIntervaloJugador', () => {
        it('debería contar la acción "Falta" en el intervalo especificado', () => {
            const dataEventos = [
              { Accion: "Falta", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 15 },
              { Accion: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 },
              { Accion: "Falta", EquipoJugador: "EquipoB", IdJugador: "Jugador2", MinSeg: 20 }
            ];
          
            const resultado = obtenerAccionIntervaloJugador(dataEventos, "Falta", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(1); // "Jugador1" tiene una "Falta" en el intervalo entre 10 y 30 minutos
        });

        it('debería retornar 0 si el evento no está dentro del intervalo especificado', () => {
            const dataEventos = [
              { Accion: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 40 }
            ];
          
            const resultado = obtenerAccionIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(0); // Ningún evento en el intervalo entre 10 y 30 minutos
        });
          
        it('debería retornar 0 si la acción no coincide con la solicitada', () => {
            const dataEventos = [
              { Accion: "Falta", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 }
            ];
          
            const resultado = obtenerAccionIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(0); // No hay ningún "Gol" de "Jugador1"
        });
    });

    describe('obtenerSuspensionIntervaloJugador', () => {
        it('debería contar las suspensiones en el intervalo especificado', () => {
            const dataEventos = [
              { Suspension: "2 Minutos", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 15 },
              { Suspension: "2 Minutos", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 }
            ];
          
            const resultado = obtenerSuspensionIntervaloJugador(dataEventos, "2 Minutos", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(2); // "Jugador1" tiene dos suspensiones de "2 Minutos" en el intervalo
        });
        
        it('debería retornar 0 si el evento no está dentro del intervalo especificado', () => {
            const dataEventos = [
              { Suspension: "2 Minutos", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 40 }
            ];
          
            const resultado = obtenerSuspensionIntervaloJugador(dataEventos, "2 Minutos", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(0); // No hay eventos en el intervalo entre 10 y 30 minutos
        });

        it('debería retornar 0 si la suspensión no coincide con la solicitada', () => {
            const dataEventos = [
              { Suspension: "Expulsión", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25 }
            ];
          
            const resultado = obtenerSuspensionIntervaloJugador(dataEventos, "2 Minutos", 10, 30, "Jugador1", "EquipoA");
            expect(resultado).toEqual(0); // "Jugador1" tiene una "Expulsión" pero no la "Suspensión" de "2 Minutos"
        });
          
          
    });


    describe('obtenerResultado7MIntervaloJugador', () => {
        it('debería contar los goles dentro del intervalo especificado', () => {
            const dataEventos = [
              { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 10, PosicionLanzador: "Central" },
              { Resultado: "Fallido", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 20, PosicionLanzador: "Lateral" },
              { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25, PosicionLanzador: "Central" },
            ];
          
            const resultado = obtenerResultado7MIntervaloJugador(dataEventos, "Gol", 15, 30, "Jugador1", "Central", "EquipoA");
            expect(resultado).toEqual(1); // Solo el gol en el minuto 25 cumple con las condiciones
        });
        
        it('debería retornar 0 si los eventos están fuera del intervalo', () => {
            const dataEventos = [
              { Resultado: "Gol", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 35, PosicionLanzador: "Central" }
            ];
          
            const resultado = obtenerResultado7MIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "Central", "EquipoA");
            expect(resultado).toEqual(0); // El evento está fuera del intervalo entre 10 y 30 minutos
        });
        
        it('debería retornar 0 si el resultado no coincide con el esperado', () => {
            const dataEventos = [
              { Resultado: "Fallido", EquipoJugador: "EquipoA", IdJugador: "Jugador1", MinSeg: 25, PosicionLanzador: "Central" }
            ];
          
            const resultado = obtenerResultado7MIntervaloJugador(dataEventos, "Gol", 10, 30, "Jugador1", "Central", "EquipoA");
            expect(resultado).toEqual(0); // El resultado de la jugada es "Fallido", no "Gol"
        });
    });

    describe('obtenerAsistenciaIntervaloJugador', () => {
        it('debería contar los goles asistidos por el jugador dentro del intervalo', () => {
            const dataEventos = [
              { Resultado: "Gol", EquipoJugador: "EquipoA", Asistencia: "Jugador2", MinSeg: 10 },
              { Resultado: "Gol", EquipoJugador: "EquipoA", Asistencia: "Jugador2", MinSeg: 25 },
              { Resultado: "Gol", EquipoJugador: "EquipoA", Asistencia: "Jugador1", MinSeg: 20 }
            ];
          
            const resultado = obtenerAsistenciaIntervaloJugador(dataEventos, 15, 30, "Jugador2", "EquipoA");
            expect(resultado).toEqual(1);  // El gol del minuto 25 es asistido por 'Jugador2' dentro del intervalo.
        });

        it('no debería contar goles fuera del intervalo', () => {
            const dataEventos = [
              { Resultado: "Gol", EquipoJugador: "EquipoA", Asistencia: "Jugador2", MinSeg: 35 }
            ];
          
            const resultado = obtenerAsistenciaIntervaloJugador(dataEventos, 10, 30, "Jugador2", "EquipoA");
            expect(resultado).toEqual(0); // El evento está fuera del intervalo entre 10 y 30 minutos
        });
          
        it('debería retornar 0 si el gol fue asistido por un jugador diferente', () => {
            const dataEventos = [
              { Resultado: "Gol", EquipoJugador: "EquipoA", Asistencia: "Jugador3", MinSeg: 25 }
            ];
          
            const resultado = obtenerAsistenciaIntervaloJugador(dataEventos, 15, 30, "Jugador2", "EquipoA");
            expect(resultado).toEqual(0); // El gol fue asistido por 'Jugador3', no 'Jugador2'
        });       
    });


    describe('obtenerResultadoTotalJugador', () => {
        it('debería contar correctamente los eventos con el resultado especificado para un jugador y equipo', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 10 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 20 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdJugador: 2, MinSeg: 30 },
              { Resultado: 'Palo/Fuera', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 35 }
            ];
            const resultado = obtenerResultadoTotalJugador(dataEventos, 'Gol', 1, 'EquipoA');
            expect(resultado).toBe(2);  // 2 goles para el jugador con Id 1 en el equipo "EquipoA"
          });
          
          it('debería retornar 0 si no se encuentran eventos que coincidan', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoB', IdJugador: 1, MinSeg: 10 }
            ];
            const resultado = obtenerResultadoTotalJugador(dataEventos, 'Gol', 2, 'EquipoA');
            expect(resultado).toBe(0);  // No hay goles para el jugador con Id 2 en el equipo "EquipoA"
          });
          
          it('debería manejar cuando dataEventos no es un arreglo', () => {
            const resultado = obtenerResultadoTotalJugador(null, 'Gol', 1, 'EquipoA');
            expect(resultado).toBe(0);  // El resultado debería ser 0
          });          
    });

    describe('obtenerAccionTotalJugador', () => {
        it('debería contar correctamente los eventos con la acción especificada para un jugador y equipo', () => {
            const dataEventos = [
              { Accion: 'Gol', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 10 },
              { Accion: 'Gol', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 20 },
              { Accion: 'Asistencia', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 30 }
            ];
            
            const cantidad = obtenerAccionTotalJugador(dataEventos, 'Gol', 1, 'EquipoA');
            expect(cantidad).toBe(2);  // Debería retornar 2 goles
          });
          
          it('debería retornar 0 si no se encuentran eventos que coincidan', () => {
            const dataEventos = [
              { Accion: 'Asistencia', EquipoJugador: 'EquipoA', IdJugador: 1, MinSeg: 10 }
            ];
            
            const cantidad = obtenerAccionTotalJugador(dataEventos, 'Gol', 1, 'EquipoA');
            expect(cantidad).toBe(0);  // No hay goles para el jugador 1 de "EquipoA"
          });
          
        //   it('debería manejar el caso donde dataEventos no es un arreglo', () => {
        //     const cantidad = obtenerAccionTotalJugador(null, 'Gol', 1, 'EquipoA');
        //     expect(cantidad).toBe(0);  // Retorna 0 si no es un arreglo
        //   });          
    });

    describe('obtenerAsistenciaTotalJugador', () => {
        it('debería contar correctamente las asistencias de un jugador para un equipo', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: 2, IdJugador: 1, MinSeg: 10 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: 2, IdJugador: 3, MinSeg: 30 }
            ];
            
            const cantidadAsistencias = obtenerAsistenciaTotalJugador(dataEventos, 2, 'EquipoA');
            expect(cantidadAsistencias).toBe(2);  // Debería retornar 2 asistencias del jugador 2 en el equipo 'EquipoA'
          });
          
          it('debería retornar 0 si no se encuentra la asistencia especificada', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: 1, IdJugador: 2, MinSeg: 10 }
            ];
            
            const cantidadAsistencias = obtenerAsistenciaTotalJugador(dataEventos, 3, 'EquipoA');
            expect(cantidadAsistencias).toBe(0);  // No hay asistencias del jugador 3 en el equipo 'EquipoA'
          });
          
          it('debería manejar el caso donde dataEventos no es un arreglo', () => {
            const cantidadAsistencias = obtenerAsistenciaTotalJugador(null, 1, 'EquipoA');
            expect(cantidadAsistencias).toBe(0);  // Retorna 0 si no es un arreglo
          });          
    });


    describe('obtenerResultadoIntervaloPortero', () => {
        it('debería contar el número de goles de un portero en un intervalo de tiempo específico', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 1, MinSeg: 10 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 1, MinSeg: 20 }
            ];
            
            const cantidad = obtenerResultadoIntervaloPortero(dataEventos, 'Gol', 0, 15, 1, 'EquipoA');
            expect(cantidad).toBe(1);  // El portero 1 tiene 1 gol entre 0 y 15 seg
          });
          
          it('debería retornar 0 si el portero no tiene goles en el intervalo', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 1, MinSeg: 10 },
              { Resultado: 'Parada', EquipoJugador: 'EquipoA', IdPortero: 2, MinSeg: 20 }
            ];
            
            const cantidad = obtenerResultadoIntervaloPortero(dataEventos, 'Gol', 0, 5, 1, 'EquipoA');
            expect(cantidad).toBe(0);  // No hay goles del portero 1 entre 0 y 5 seg
          });
          
          it('debería retornar 0 si dataEventos no es un arreglo', () => {
            const cantidad = obtenerResultadoIntervaloPortero(null, 'Gol', 0, 15, 1, 'EquipoA');
            expect(cantidad).toBe(0);  // Data no es un arreglo, retorna 0
          });          
    });

    describe('obtenerResultadoTotalPortero', () => {
        it('debería contar el número de goles de un portero', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 1, MinSeg: 10 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 1, MinSeg: 20 }
            ];
            
            const cantidad = obtenerResultadoTotalPortero(dataEventos, 'Gol', 1, 'EquipoA');
            expect(cantidad).toBe(2);  // El portero 1 tiene 2 goles
          });
          
          it('debería retornar 0 si el portero no tiene goles', () => {
            const dataEventos = [
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 2, MinSeg: 10 },
              { Resultado: 'Gol', EquipoJugador: 'EquipoA', IdPortero: 2, MinSeg: 20 }
            ];
            
            const cantidad = obtenerResultadoTotalPortero(dataEventos, 'Gol', 1, 'EquipoA');
            expect(cantidad).toBe(0);  // El portero 1 no tiene goles
          });
          
          it('debería retornar 0 si dataEventos no es un arreglo', () => {
            const cantidad = obtenerResultadoTotalPortero(null, 'Gol', 1, 'EquipoA');
            expect(cantidad).toBe(0);  // Data no es un arreglo, retorna 0
          });          
    });

    describe('sacarAsistencias', () => {
  
        const dataEventos = [
          { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: 'Jugador1' },
          { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: 'Jugador2' },
          { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: '0' },  // No cuenta
          { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: null },   // No cuenta
          { Resultado: 'Gol', EquipoJugador: 'EquipoB', Asistencia: 'Jugador3' }, // No cuenta (equipo B)
          { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: '' } // No cuenta
        ];
      
        it('debería retornar 2 asistencias válidas para el equipo A', () => {
          const cantidad = sacarAsistencias(dataEventos, 'EquipoA');
          expect(cantidad).toBe(2);  // Hay 2 goles con asistencia válida para equipo A
        });
      
        it('debería retornar 1 asistencias para el equipo B', () => {
          const cantidad = sacarAsistencias(dataEventos, 'EquipoB');
          expect(cantidad).toBe(1);  // No hay goles con asistencia válida para equipo B
        });
      
        it('debería retornar 0 si no hay eventos de gol para el equipo A', () => {
          const eventosSinGoles = [
            { Resultado: 'Pase', EquipoJugador: 'EquipoA', Asistencia: 'Jugador1' },
            { Resultado: 'Pase', EquipoJugador: 'EquipoA', Asistencia: null }
          ];
          const cantidad = sacarAsistencias(eventosSinGoles, 'EquipoA');
          expect(cantidad).toBe(0);  // No hay goles, por lo que no hay asistencias
        });
      
        it('debería retornar 0 si dataEventos no es un arreglo', () => {
          const cantidad = sacarAsistencias(null, 'EquipoA');
          expect(cantidad).toBe(0);  // Data no es un arreglo, retorna 0
        });
      
        it('debería retornar 0 si ningún evento tiene una asistencia válida (con "0", null o "")', () => {
          const eventosInvalidos = [
            { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: '0' },
            { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: null },
            { Resultado: 'Gol', EquipoJugador: 'EquipoA', Asistencia: '' }
          ];
          const cantidad = sacarAsistencias(eventosInvalidos, 'EquipoA');
          expect(cantidad).toBe(0);  // No hay asistencias válidas
        });
    });

    describe('sacarBlocajes', () => {
        const dataEventos = [
          { Accion: 'Lanzamiento bloqueado', EquipoJugador: 'EquipoA' },
          { Accion: 'Lanzamiento bloqueado', EquipoJugador: 'EquipoA' },
          { Accion: 'Lanzamiento bloqueado', EquipoJugador: 'EquipoB' },  // No cuenta para EquipoA
          { Accion: 'Pase', EquipoJugador: 'EquipoA' },  // No cuenta
          { Accion: 'Lanzamiento bloqueado', EquipoJugador: 'EquipoA' }
        ];
      
        it('debería retornar 3 blocajes válidos para el equipo A', () => {
          const cantidad = sacarBlocajes(dataEventos, 'EquipoA');
          expect(cantidad).toBe(3);  // Hay 3 "Lanzamiento bloqueado" para EquipoA
        });
      
        it('debería retornar 0 blocajes para el equipo B', () => {
          const cantidad = sacarBlocajes(dataEventos, 'EquipoB');
          expect(cantidad).toBe(1);  // Solo hay 1 "Lanzamiento bloqueado" para EquipoB
        });
      
        it('debería retornar 0 si no hay eventos de "Lanzamiento bloqueado" para el equipo A', () => {
          const eventosSinBlocajes = [
            { Accion: 'Pase', EquipoJugador: 'EquipoA' },
            { Accion: 'Lanzamiento bloqueado', EquipoJugador: 'EquipoC' }
          ];
          const cantidad = sacarBlocajes(eventosSinBlocajes, 'EquipoA');
          expect(cantidad).toBe(0);  // No hay blocajes para el equipo A
        });
      
        it('debería retornar 0 si dataEventos no es un arreglo', () => {
          const cantidad = sacarBlocajes(null, 'EquipoA');
          expect(cantidad).toBe(0);  // Data no es un arreglo, retorna 0
        });
      
        it('debería retornar 0 si ningún evento tiene la acción "Lanzamiento bloqueado"', () => {
          const eventosSinBlocajes = [
            { Accion: 'Pase', EquipoJugador: 'EquipoA' },
            { Accion: 'Pase', EquipoJugador: 'EquipoA' }
          ];
          const cantidad = sacarBlocajes(eventosSinBlocajes, 'EquipoA');
          expect(cantidad).toBe(0);  // No hay blocajes
        });
    });

    describe('obtenerJugadoresUnicos', () => {

        const dataEventos = [
          { IdJugador: 1, EquipoJugador: 'EquipoA' },
          { IdJugador: 2, EquipoJugador: 'EquipoA' },
          { IdJugador: 1, EquipoJugador: 'EquipoA' },  // Repetido
          { IdJugador: 3, EquipoJugador: 'EquipoB' },
          { IdJugador: 1, EquipoJugador: 'EquipoA' },  // Repetido
          { IdJugador: 4, EquipoJugador: 'EquipoA' }
        ];
      
        it('debería retornar los jugadores únicos para el equipo A', () => {
          const jugadoresUnicos = obtenerJugadoresUnicos(dataEventos, 'EquipoA');
          expect(jugadoresUnicos).toEqual([1, 2, 4]);  // Jugadores únicos de EquipoA
        });
      
        it('debería retornar un array vacío si no hay jugadores para el equipo A', () => {
          const jugadoresUnicos = obtenerJugadoresUnicos([], 'EquipoA');
          expect(jugadoresUnicos).toEqual([]);  // No hay jugadores
        });
      
        it('debería retornar 0 jugadores si no existen eventos para el equipo dado', () => {
          const jugadoresUnicos = obtenerJugadoresUnicos(dataEventos, 'EquipoC');
          expect(jugadoresUnicos).toEqual([]);  // No hay jugadores para el equipoC
        });
      
        it('debería retornar un array vacío si dataEventos no es un arreglo', () => {
          const jugadoresUnicos = obtenerJugadoresUnicos(null, 'EquipoA');
          expect(jugadoresUnicos).toEqual([]);  // Data no es un arreglo
        });
      
        it('debería retornar jugadores únicos para un equipo específico sin errores', () => {
          const dataEventosConRepetidos = [
            { IdJugador: 3, EquipoJugador: 'EquipoB' },
            { IdJugador: 2, EquipoJugador: 'EquipoB' },
            { IdJugador: 3, EquipoJugador: 'EquipoB' },
            { IdJugador: 5, EquipoJugador: 'EquipoB' }
          ];
          const jugadoresUnicos = obtenerJugadoresUnicos(dataEventosConRepetidos, 'EquipoB');
          expect(jugadoresUnicos).toEqual([3, 2, 5]);  // Jugadores únicos de EquipoB
        });
    });

    describe('filtrarResultadoPorLocalizacionJugador', () => {

        const dataEventos = [
          { IdJugador: 1, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona1', Resultado: 'Gol' },
          { IdJugador: 1, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona2', Resultado: 'Palo' },
          { IdJugador: 2, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona1', Resultado: 'Gol' },
          { IdJugador: 1, EquipoJugador: 'EquipoB', LocalizacionLanzamiento: 'Zona1', Resultado: 'Gol' },
          { IdJugador: 1, EquipoJugador: 'EquipoA', LocalizacionLanzamiento: 'Zona1', Resultado: 'Gol' }
        ];
      
        it('debería retornar la cantidad correcta de eventos para un jugador con la localización, resultado y equipo especificado', () => {
          const cantidad = filtrarResultadoPorLocalizacionJugador(dataEventos, 'Gol', 'Zona1', 'EquipoA', 1);
          expect(cantidad).toBe(2);  // El jugador 1 en el equipo A tiene dos goles en la Zona1
        });
      
        it('debería retornar 0 si no hay eventos que coincidan con la localización, resultado, equipo y jugador', () => {
          const cantidad = filtrarResultadoPorLocalizacionJugador(dataEventos, 'Gol', 'Zona3', 'EquipoA', 1);
          expect(cantidad).toBe(0);  // No hay goles en Zona3 para el jugador 1 de EquipoA
        });
      
        it('debería retornar 0 si dataEventos no es un arreglo', () => {
          const cantidad = filtrarResultadoPorLocalizacionJugador(null, 'Gol', 'Zona1', 'EquipoA', 1);
          expect(cantidad).toBe(0);  // Data no es un arreglo, retorna 0
        });
      
        it('debería retornar 0 si no hay eventos para el equipo o jugador especificado', () => {
          const cantidad = filtrarResultadoPorLocalizacionJugador(dataEventos, 'Gol', 'Zona1', 'EquipoC', 1);
          expect(cantidad).toBe(0);  // No hay eventos para el equipo "EquipoC"
        });
      
        // it('debería retornar 0 si no hay eventos para el resultado especificado', () => {
        //   const cantidad = filtrarResultadoPorLocalizacionJugador(dataEventos, 'Palo', 'Zona1', 'EquipoA', 1);
        //   expect(cantidad).toBe(1);  // Solo un evento de tipo "Palo" en "Zona1" para el jugador 1 de EquipoA
        // });
      
        it('debería retornar 0 si no hay eventos para la localización especificada', () => {
          const cantidad = filtrarResultadoPorLocalizacionJugador(dataEventos, 'Gol', 'Zona3', 'EquipoA', 1);
          expect(cantidad).toBe(0);  // No hay goles en Zona3
        });
      
    });