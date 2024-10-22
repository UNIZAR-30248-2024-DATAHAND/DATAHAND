// utils/generatePartidoId.js
import Counter from '../../models/Counter';

export async function getNextPartidoId() {
  const result = await Counter.findByIdAndUpdate(
    { _id: 'partidoId' }, // _id es un identificador único para este contador (puedes usar 'partidoId')
    { $inc: { seq: 1 } }, // Incrementa el valor secuencial
    { new: true, upsert: true } // Si no existe, lo crea (upsert)
  );
  return result.seq;
}

export async function getNextEventoId() {
  const result = await Counter.findByIdAndUpdate(
    { _id: 'eventoId' }, // _id es un identificador único para este contador (puedes usar 'partidoId')
    { $inc: { seq: 1 } }, // Incrementa el valor secuencial
    { new: true, upsert: true } // Si no existe, lo crea (upsert)
  );
  return result.seq;
}