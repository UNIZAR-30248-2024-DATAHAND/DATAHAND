import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="relative h-screen flex bg-orange-500 justify-center overflow-hidden">
      {/* Fondo de olas */}
      <Image
        src="/images/waves_bg_login.svg" // Ruta del archivo SVG
        alt="Background Waves"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 transition duration-300 ease-in-out delay-150"
      />

      {/* Contenedor de la izquierda */}
      <div className="relative z-10 flex flex-col items-center justify-center w-1/2 p-8">
        <h1 className="text-6xl font-bold mb-4 text-white">DataHand</h1>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="mb-4"
        />
        <p className="mb-6 text-gray-200 text-center text-xl">
          Convierte datos en decisiones.<br />¡Eleva el rendimiento de tu equipo en cada jugada!
        </p>
      </div>


      {/* Contenedor de la derecha */}
      <div className="relative z-10 flex items-center justify-center w-1/2 p-8">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border p-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2"
            />
            <Link href="/home">
              <button className="bg-blue-500 text-white p-2 rounded w-full">
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
