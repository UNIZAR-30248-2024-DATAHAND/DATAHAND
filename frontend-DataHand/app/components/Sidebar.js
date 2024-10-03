// app/components/Sidebar.js

"use client"; // Esto marca el componente como Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Sidebar.module.css'; // Para manejar la animación del botón

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-600 to-purple-400 shadow-lg flex flex-col items-center py-6 rounded-r-3xl">
    {/* Logo y título */}
        <div className="flex items-center mb-10">
        <Image src="/images/logo.png" alt="DataHand Logo" width={80} height={80} />
        <h1 className="text-3xl font-bold text-white ml-3">DataHand</h1>
    </div>

    {/* Botón de registrar partido */}
    <div className="mt-6 w-full px-4">
        <Link href="/register-match">
            <button
                className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center flex items-center justify-center" 
                style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                {/* Icono de + */}
                <Image 
                    src="/images/icon_plus.svg" 
                    alt="Registrar partido" 
                    width={30} 
                    height={30} 
                    className="mr-2"
                />
                Registrar partido
            </button>
        </Link>
    </div>

      {/* Aquí puedes agregar más elementos al menú o contenido */}
    </div>
  );
};

export default Sidebar;
