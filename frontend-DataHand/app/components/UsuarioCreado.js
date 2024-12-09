import React from 'react';

export default function UsuarioCreado({ nombre, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-700">
          El usuario <span className="font-bold">{nombre}</span> se ha creado correctamente.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
