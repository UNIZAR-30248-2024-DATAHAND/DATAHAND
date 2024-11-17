
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

export const contarGoles = (dataEventos) => {  
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos cuyo campo 'Resultado' sea igual a "gol"
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol');
    return eventosGol.length;  // Devuelve el número de goles
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarLanzamientosTotal = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por cada tipo y cuenta cuántos hay de cada uno
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol');
    const eventosParada = dataEventos.filter(evento => evento.Resultado === 'Parada');
    const eventosPaloFuera = dataEventos.filter(evento => evento.Resultado === 'Palo/Fuera');
    
    // Devuelve la suma total de todos los eventos
    const totalEventos = eventosGol.length + eventosParada.length + eventosPaloFuera.length;
    return totalEventos;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarPerdidasDeBalon = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la acción es "Perdida de balon"
    const eventosPerdidaDeBalon = dataEventos.filter(evento => evento.Resultado === 'Perdida de balon');
    
    // Devuelve la cantidad de eventos con esa acción
    return eventosPerdidaDeBalon.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarLanzamientosYPerdidas = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos por cada tipo y cuenta cuántos hay de cada uno
    const eventosGol = dataEventos.filter(evento => evento.Resultado === 'Gol');
    const eventosParada = dataEventos.filter(evento => evento.Resultado === 'Parada');
    const eventosPaloFuera = dataEventos.filter(evento => evento.Resultado === 'Palo/Fuera');
    const eventosPerdidaDeBalon = dataEventos.filter(evento => evento.Resultado === 'Perdida de balon');
    
    // Devuelve la suma total de todos los eventos
    const totalEventos = eventosGol.length + eventosParada.length + eventosPaloFuera.length + eventosPerdidaDeBalon.length;
    return totalEventos;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarAtaquePosicional = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Ataque Posicional"
    const eventosAtaquePosicional = dataEventos.filter(evento => evento.FaseDeJuego === 'Ataque Posicional');
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosAtaquePosicional.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragol = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol"
    const eventosContragol = dataEventos.filter(evento => evento.FaseDeJuego === 'Contragol');
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosContragol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataque = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque"
    const eventosContrataque = dataEventos.filter(evento => evento.FaseDeJuego === 'Contrataque');
    
    // Devuelve la cantidad de eventos con esa fase de juego
    return eventosContrataque.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConGol = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Gol'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConParada = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Parada'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContrataqueConPalo = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contrataque" y el resultado es "Gol"
    const eventosContrataqueGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contrataque' && evento.Resultado === 'Palo/Fuera'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContrataqueGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConGol = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Gol'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConParada = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Parada'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarContragolConPalo = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Contragol" y el resultado es "Gol"
    const eventosContragolGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Contragol' && evento.Resultado === 'Palo/Fuera'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosContragolGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

export const contarAtaquePosicionalConGol = (dataEventos) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde la fase de juego es "Ataque Posicional" y el resultado es "Gol"
    const eventosAtaquePosicionalGol = dataEventos.filter(evento => 
      evento.FaseDeJuego === 'Ataque Posicional' && evento.Resultado === 'Gol'
    );
    
    // Devuelve la cantidad de eventos que cumplen ambas condiciones
    return eventosAtaquePosicionalGol.length;
  } else {
    console.error('dataEventos no es un vector');
    return 0;  // Si no es un vector, devuelve 0
  }
};

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


export const filtrarGolPorSistema = (dataEventos, sistemaDeAtaque) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincide con 'sistemaDeAtaque' y el 'Resultado' sea 'Gol'
    const eventosGol = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Gol'
    );
    
    return eventosGol.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const filtrarParadasPorSistema = (dataEventos, sistemaDeAtaque) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Parada'
    const eventosParada = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Parada'
    );
    
    return eventosParada.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};

export const filtrarPalosPorSistema = (dataEventos, sistemaDeAtaque) => {
  if (Array.isArray(dataEventos)) {
    // Filtra los eventos donde el 'SistemaDeJuego' coincida con 'sistemaDeAtaque' y el 'Resultado' sea 'Palo/Fuera'
    const eventosPalo = dataEventos.filter(evento => 
      evento.SistemaDeAtaque === sistemaDeAtaque && evento.Resultado === 'Palo/Fuera'
    );
    
    return eventosPalo.length;  // Devuelve el array de eventos que cumplen con las condiciones
  } else {
    console.error('dataEventos no es un vector');
    return [];  // Si dataEventos no es un array, devuelve un array vacío
  }
};