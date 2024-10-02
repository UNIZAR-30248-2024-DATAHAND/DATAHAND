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
                <h1 className="text-5xl font-bold mb-4 text-white">DataHand</h1>
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={250}
                    height={250}
                    className="mb-4"
                />
                <p className="mb-6 text-gray-100 text-center text-lg">
                    Convierte datos en decisiones.<br />¡Eleva el rendimiento de tu equipo en cada jugada!
                </p>
            </div>

            {/* Contenedor de la derecha */}
            <div className="relative z-10 flex items-center justify-center w-1/2 p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-white">Iniciar Sesión</h2>
                    <form className="flex flex-col gap-6">
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            className="bg-transparent border-b-2 border-white text-purple-600 placeholder-gray-200 p-3 focus:outline-none focus:border-purple-600 transition-all duration-300"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="bg-transparent border-b-2 border-white text-purple-600 placeholder-gray-200 p-3 focus:outline-none focus:border-purple-600 transition-all duration-300"
                        />
                        <Link href="/home">
                            <button className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center">
                                Iniciar Sesión
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center">
                                Registrarse
                            </button>
                        </Link>
                    </form>
                    <p className="text-white text-center mt-6">
                        ¿Olvidaste tu contraseña?{" "}
                        <Link href="/forgot-password" className="text-purple-600 hover:text-white transition">
                            Recuperar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
