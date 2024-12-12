import React from 'react';

export default function NotificacionAlerta({ mensaje, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          ¡Notificacion!
        </h2>
        <p className="text-gray-700">
          {mensaje}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
