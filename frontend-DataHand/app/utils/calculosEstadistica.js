
export const contarEventos = (dataEventos) => {
  // Verifica que dataEventos es un vector y luego cuenta la longitud
  console.log('Datos de eventos:', dataEventos);

  if (Array.isArray(dataEventos)) {
    console.log('Num eventos:', dataEventos.length);
    return dataEventos.length;  
  } else {
    console.error('dataEventos no es un vector');
    return 0;  
  }
};

export const contarGoles = (dataEventos, equipo) => {  
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos cuyo campo 'Resultado' sea igual a "gol"
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol' && evento.EquipoJugador === equipo);
    return eventosGol.length;  // Devuelve el número de goles
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarLanzamientosTotal = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por cada tipo y cuenta cuántos hay de cada uno
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol' && evento.EquipoJugador === equipo);
    const eventosParada = dataEventos.filter(evento => evento.Resultado === 'Parada' && evento.EquipoJugador === equipo);
    const eventosPaloFuera = dataEventos.filter(evento => evento.Resultado === 'Palo/Fuera' && evento.EquipoJugador === equipo);
    
    // Devuelve la suma total de todos los eventos
    const totalEventos = eventosGol.length + eventosParada.length + eventosPaloFuera.length;
    return totalEventos;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarPerdidasDeBalon = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la acción es "Perdida de balon"
    const eventosPerdidaDeBalon = dataEventos.filter(evento => evento.Resultado === 'Perdida de balon' && evento.EquipoJugador === equipo);
    
    // Devuelve la cantidad de eventos con esa acción
    return eventosPerdidaDeBalon.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarLanzamientosYPerdidas = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por cada tipo y cuenta cuántos hay de cada uno
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol' && evento.EquipoJugador === equipo);
    const eventosParada = dataEventos.filter(evento => evento.Resultado === 'Parada' && evento.EquipoJugador === equipo);
    const eventosPaloFuera = dataEventos.filter(evento => evento.Resultado === 'Palo/Fuera' && evento.EquipoJugador === equipo);
    const eventosPerdidaDeBalon = dataEventos.filter(evento => evento.Resultado === 'Perdida de balon' && evento.EquipoJugador === equipo);
    
    // Devuelve la suma total de todos los eventos
    const totalEventos = eventosGol.length + eventosParada.length + eventosPaloFuera.length + eventosPerdidaDeBalon.length;
    return totalEventos;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarAtaquePosicional = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Ataque Posicional"
    const eventosAtaquePosicional = dataEventos.filter(evento => evento.FaseDeJuego === 'Ataque Posicional' && evento.EquipoJugador === equipo);
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosAtaquePosicional.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragol = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol"
    const eventosContragol = dataEventos.filter(evento => evento.FaseDeJuego === 'Contragol' && evento.EquipoJugador === equipo);
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosContragol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataque = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque"
    const eventosContrataque = dataEventos.filter(evento => evento.FaseDeJuego === 'Contrataque' && evento.EquipoJugador === equipo);
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosContrataque.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConGol = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Gol' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConParada = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Parada' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConPalo = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Palo/Fuera' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConFalta = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Accion === 'Falta' && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};


export const contarContrataqueCon7M = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' &&  (evento.Accion === '7m provocado' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const contarContrataqueConSuspension = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && (evento.Accion === '2 Minutos' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};


export const contarContragolConGol = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Gol' && evento.EquipoJugador === equipo
    ); 
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConParada = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Parada' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConPalo = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Palo/Fuera' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConFalta = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Accion === 'Falta' && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};


export const contarContragolCon7M = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' &&  (evento.Accion === '7m provocado' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const contarContragolConSuspension = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && (evento.Accion === '2 Minutos' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const contarAtaquePosicionalConGol = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Ataque Posicional" y el resultado es "Gol"
    const eventosAtaquePosicionalGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Ataque Posicional' && evento.Resultado === 'Gol' && evento.EquipoJugador === equipo
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosAtaquePosicionalGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

//HAY QUE MODIFCAR ESTO PARA METERLE EQUIPO TO DO
export const obtenerSistemaAtaque = (dataEventos) => {
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Utilizamos un Set para obtener solo los valores únicos de SistemaDeJuego
    const valoresUnicos = new Set(dataEventos.map(evento => evento.SistemaDeAtaque));
    return [...valoresUnicos]; // Convertimos el Set a un array
  } else {
    console.error('dataEventos no es un arreglo');
    return [];  // Retorna un array vacío si no es un arreglo
  }
};


export const filtrarGolPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincide con 'sistemaDeAtaque' y el 'Resultado' sea 'Gol'
    const eventosGol = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Gol' && evento.EquipoJugador === equipo
    );
    
    return eventosGol.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const filtrarParadasPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Parada'
    const eventosParada = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Parada' && evento.EquipoJugador === equipo
    );
    
    return eventosParada.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const filtrarPalosPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Palo/Fuera' && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const filtrarFaltasPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeAtaque' coincida con 'sistemaDeAtaque' y la 'Accion' sea 'Falta'
    const eventosFalta = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Accion === 'Falta' && evento.EquipoJugador === equipo
    );
    
    return eventosFalta.length;  // Devuelve la cantidad de eventos que cumplen las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un array, devuelve 0
  }
};



export const filtrar7MPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeAtaque' coincida con 'sistemaDeAtaque' y la acción sea '7m provocado' o '7m + 2min'
    const eventos7m = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && (evento.Accion === '7m provocado' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventos7m.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};


export const filtrar2MPorSistema = (dataEventos, sistemaDeAtaque, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeAtaque' coincida con 'sistemaDeAtaque' y la acción sea '2 Minutos' o '7m + 2min'
    const eventos2Min = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && (evento.Accion === '2 Minutos' || evento.Accion === '7m + 2min') && evento.EquipoJugador === equipo
    );
    
    return eventos2Min.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};

export const contarEventosPorLocalizacionYResultado = (dataEventos, resultado, localizacion, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por localización, resultado y equipo
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.LocalizacionLanzamiento === localizacion && evento.Resultado === resultado && evento.EquipoJugador === equipo
    );
    
    return eventosFiltrados.length; // Devuelve el conteo de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0; // Si dataEventos no es un array, devuelve 0
  }
};


export const contarEventosPorPosicionYResultado = (dataEventos, resultado, posicion, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos según la posición, resultado y equipo
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.PosicionLanzador === posicion && evento.Resultado === resultado && evento.EquipoJugador === equipo
    );
    
    // Devuelve el número de eventos filtrados
    return eventosFiltrados.length;
  } else {
    console.error('dataEventos no es un arreglo');
    return 0; // Si dataEventos no es un arreglo, devuelve 0
  }
};


export const obtenerResultadoJugador = (dataEventos, resultado, faseDeJuego, jugador) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos que coincidan con la fase de juego, resultado y el jugador
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.FaseDeJuego === faseDeJuego &&
      evento.Resultado === resultado &&
      evento.IdJugador === jugador
    );
    
    // Devuelve la cantidad de eventos que cumplen con las condiciones
    return eventosFiltrados.length;
  } else {
    console.error('dataEventos no es un arreglo');
    return 0; // Devuelve 0 si dataEventos no es un array
  }
};

export const obtenerSuspensionJugador = (dataEventos, suspension, jugador) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la suspensión y el jugador coincidan
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.Suspension === suspension && evento.IdJugador === jugador
    );
    
    // Devuelve la cantidad de eventos que cumplen las condiciones
    return eventosFiltrados.length;
  } else {
    console.error('dataEventos no es un arreglo');
    return 0; // Devuelve 0 si dataEventos no es un array
  }
};


export const obtenerAccionJugador = (dataEventos, accion, jugador) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la acción y el jugador coincidan
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.Accion === accion && evento.IdJugador === jugador
    );
    
    // Devuelve la cantidad de eventos que cumplen las condiciones
    return eventosFiltrados.length;
  } else {
    console.error('dataEventos no es un arreglo');
    return 0; // Devuelve 0 si dataEventos no es un array
  }
};


export const filtrarResultadoPorLocalizacionJugador = (dataEventos, resultado, localizacion, equipo, jugador) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la localización, resultado, equipo y jugador coincidan
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.LocalizacionLanzamiento === localizacion && 
      evento.Resultado === resultado && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador
    );

    return eventosFiltrados.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};


export const filtrarResultadoPorPosicionJugador = (dataEventos, resultado, posicion, equipo, jugador) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos según las condiciones especificadas
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.PosicionLanzador === posicion && 
      evento.Resultado === resultado && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador
    );
    
    return eventosFiltrados.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};


export const obtenerJugadores = (dataEventos) => {
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Obtiene los valores únicos de IdJugador utilizando un Set
    const jugadoresUnicos = new Set(dataEventos.map(evento => evento.IdJugador));
    return Array.from(jugadoresUnicos); // Convierte el Set a un array y lo retorna
  } else {
    console.error("dataEventos no es un arreglo");
    return []; // Retorna un array vacío si no es un arreglo
  }
};


export const obtenerJugadoresEquipo = (dataEventos, equipo) => {
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por equipo y extrae los IdJugador únicos
    const jugadoresUnicos = new Set(
      dataEventos
        .filter(evento => evento.EquipoJugador === equipo) // Filtra eventos por el equipo
        .map(evento => evento.IdJugador) // Obtiene IdJugador de cada evento filtrado
    );
    return Array.from(jugadoresUnicos); // Convierte el Set en un array
  } else {
    console.error("dataEventos no es un arreglo");
    return []; // Retorna un array vacío si la entrada no es válida
  }
};


export const obtenerPorterosEquipo = (dataEventos, equipo) => { 
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por el equipo proporcionado y obtiene los porteros únicos
    const porterosUnicos = new Set(
      dataEventos
        .filter((evento) => evento.EquipoPortero === equipo) // Filtra por equipo pero usando 'EquipoPortero'
        .map((evento) => evento.IdPortero) // Extrae los IdPortero (en vez de 'IdJugador')
    );
    return [...porterosUnicos]; // Convierte el Set a un array y lo retorna
  } else {
    console.error("dataEventos no es un arreglo");
    return []; // Retorna un array vacío si no es un arreglo
  }
};


export const obtenerResultadoIntervaloJugador = (dataEventos, resultado, inicio, fin, jugador, equipo) => {
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el resultado, equipo, jugador y el intervalo de tiempo coinciden
    const eventos = dataEventos.filter(evento => 
      evento.Resultado === resultado && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador && 
      evento.MinSeg >= inicio && 
      evento.MinSeg < fin
    );
    
    return eventos.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};

export const obtenerAccionIntervaloJugador = (dataEventos, accion, inicio, fin, jugador, equipo) => {
  // Verifica si dataEventos es un arreglo
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la acción, el equipo, el jugador y el intervalo de tiempo coincidan
    const eventosAccion = dataEventos.filter(evento => 
      evento.Accion === accion && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador && 
      evento.MinSeg >= inicio && 
      evento.MinSeg < fin
    );
    
    return eventosAccion.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un arreglo, devuelve 0
  }
};


export const obtenerSuspensionIntervaloJugador = (dataEventos, suspension, inicio, fin, jugador, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la suspensión, el equipo, el jugador y el intervalo de tiempo coincidan
    const eventosSuspension = dataEventos.filter(evento => 
      evento.Suspension === suspension && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador && 
      evento.MinSeg >= inicio && 
      evento.MinSeg < fin
    );
    
    return eventosSuspension.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un arreglo, devuelve 0
  }
};


export const obtenerResultado7MIntervaloJugador = (dataEventos, resultado, inicio, fin, jugador, posicion, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el resultado, equipo, jugador, el intervalo y la posición de lanzador coinciden
    const eventos7M = dataEventos.filter(evento => 
      evento.Resultado === resultado && 
      evento.EquipoJugador === equipo && 
      evento.IdJugador === jugador && 
      evento.MinSeg >= inicio && 
      evento.MinSeg < fin && 
      evento.PosicionLanzador === posicion
    );
    
    return eventos7M.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Retorna 0 si dataEventos no es un arreglo
  }
};


export const obtenerAsistenciaIntervaloJugador = (dataEventos, inicio, fin, jugadorAsistencia, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'Resultado' sea 'Gol', el equipo, el jugador de asistencia y el intervalo de tiempo coincidan
    const eventosGol = dataEventos.filter(evento => 
      evento.Resultado === "Gol" && 
      evento.EquipoJugador === equipo && 
      evento.Asistencia === jugadorAsistencia && 
      evento.MinSeg >= inicio && 
      evento.MinSeg < fin
    );
    
    return eventosGol.length;  // Devuelve el número de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si dataEventos no es un array, retorna 0
  }
};


export const obtenerResultadoTotalJugador = (dataEventos, resultado, jugador, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por el resultado, jugador y equipo
    const eventosResultado = dataEventos.filter(evento => 
      evento.Resultado === resultado && evento.IdJugador === jugador && evento.EquipoJugador === equipo
    );
    
    return eventosResultado.length;  // Devuelve el número de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un array, devuelve 0
  }
};


export const obtenerAccionTotalJugador = (dataEventos, accion, jugador, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.Accion === accion && evento.IdJugador === jugador && evento.EquipoJugador === equipo
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const obtenerAsistenciaTotalJugador = (dataEventos, jugadorAsistencia, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'Resultado' es 'Gol', el 'EquipoJugador' y 'Asistencia' coinciden
    const eventosAsistencia = dataEventos.filter(evento => 
      evento.Resultado === "Gol" && evento.EquipoJugador === equipo && evento.Asistencia === jugadorAsistencia
    );
    
    return eventosAsistencia.length;  // Devuelve la cantidad de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un array, retorna 0
  }
};


export const obtenerResultadoIntervaloPortero = (dataEventos, resultado, inicio, fin, portero, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'Resultado' coincida con el dado y esté dentro del intervalo de tiempo
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.Resultado === resultado && 
      evento.EquipoJugador === equipo && 
      evento.IdPortero === portero && 
      evento.MinSeg >= inicio && evento.MinSeg < fin
    );
    
    return eventosFiltrados.length;  // Devuelve el número de eventos que cumplen las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Retorna 0 si dataEventos no es un arreglo
  }
};


export const obtenerResultadoTotalPortero = (dataEventos, resultado, portero, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'Resultado' coincida con el dado y el portero sea el especificado
    const eventosFiltrados = dataEventos.filter(evento => 
      evento.Resultado === resultado && evento.IdPortero === portero && evento.EquipoJugador === equipo
    );
    
    return eventosFiltrados.length;  // Devuelve el número de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Retorna 0 si dataEventos no es un arreglo
  }
};


export const sacarAsistencias = (dataEventos, equipo) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos cuyo 'Resultado' sea 'Gol' y el 'EquipoJugador' coincida con el equipo dado
    // Asegura que el 'Asistencia' sea diferente de '0' y sea un valor válido
    const eventosGol = dataEventos.filter(evento =>
      evento.Resultado === 'Gol' && 
      evento.EquipoJugador === equipo && 
      evento.Asistencia && 
      evento.Asistencia !== '0' // Verifica que 'Asistencia' sea un valor válido
    );
    
    return eventosGol.length;  // Devuelve la cantidad de asistencias
  } else {
    console.error('dataEventos no es un arreglo');
    return 0;  // Si dataEventos no es un arreglo válido, devuelve 0
  }
};



export const sacarBlocajes = (dataEventos, equipo) => {  
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos cuyo campo 'Resultado' sea igual a "gol"
    const eventosGol = dataEventos.filter(evento => evento.Accion === 'Lanzamiento bloqueado' && evento.EquipoJugador === equipo);
    return eventosGol.length;  // Devuelve el número de goles
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};


export const obtenerJugadoresUnicos = (dataEventos, equipo) => {
  // Verifica que dataEventos sea un arreglo
  if (Array.isArray(dataEventos)) {
    // Utilizamos un Set para obtener solo los valores únicos de IdJugador
    const valoresUnicos = new Set(
      dataEventos
        .filter(evento => evento.EquipoJugador === equipo) // Filtra por equipo
        .map(evento => evento.IdJugador) // Mapea a los IdJugador
    );    return [...valoresUnicos]; // Convertimos el Set a un array
  } else {
    console.error('dataEventos no es un arreglo');
    return [];  // Retorna un array vacío si no es un arreglo
  }
};