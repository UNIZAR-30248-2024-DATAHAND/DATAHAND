// components/ui/table.js

// Este archivo contiene componentes reutilizables para la creación de tablas en la interfaz de usuario.
// 
// - Table: Componente principal que envuelve el contenido de la tabla y aplica estilos básicos.
// - TableHeader: Componente para definir el encabezado de la tabla, con un fondo gris claro.
// - TableBody: Componente que encapsula el cuerpo de la tabla, permitiendo la división de filas.
// - TableRow: Componente para representar cada fila de la tabla, que acepta clases personalizadas.
// - TableCell: Componente para las celdas de la tabla, que incluye padding y estilos de texto.
// - TableHead: Componente para las celdas del encabezado, que aplica estilos adicionales y mayúsculas.
// 
// Estos componentes son flexibles y permiten construir tablas de manera eficiente y estilizada.

import React from 'react';

// Componente Table
export const Table = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      {children}
    </table>
  );
};

// Componente TableHeader
export const TableHeader = ({ children }) => {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
};

// Componente TableBody
export const TableBody = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
};

// Componente TableRow
export const TableRow = ({ children, className }) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

// Componente TableCell
export const TableCell = ({ children, className }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>
      {children}
    </td>
  );
};

// Componente TableHead
export const TableHead = ({ children, className }) => {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};
