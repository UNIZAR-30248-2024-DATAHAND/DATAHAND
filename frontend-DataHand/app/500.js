// pages/500.js
import Image from 'next/image';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="relative h-screen flex bg-red-500 justify-center overflow-hidden">
      {/* Fondo de olas */}
      <Image
        src="/images/waves_bg_login.svg"
        alt="Background Waves"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 transition duration-300 ease-in-out delay-150"
      />

      {/* Contenedor central */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 text-center">
        <h1
          className="text-6xl font-bold mb-4 text-white"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          500
        </h1>
        <h2
          className="text-3xl font-semibold mb-6 text-white"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          ¡Ups! Error interno del servidor.
        </h2>
        <p
          className="mb-8 text-gray-100 text-lg"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Algo salió mal en nuestro servidor. Por favor, inténtalo de nuevo más
          tarde.
        </p>
        <Link href="/">
          <button className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full max-w-xs font-semibold hover:bg-white hover:text-red-600 transition duration-300 ease-in-out">
            Volver a la página de inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
