import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
            <h1 className="text-5xl font-bold mb-4 text-white" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Bienvenido a DataHand
            </h1>
            <p className="text-lg text-center text-gray-100 mb-8" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Elige una opción para continuar
            </p>
            <div className="flex flex-col gap-4">
                <Link href="/register-match">
                    <button
                        className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Registrar Partido
                    </button>
                </Link>
                <Link href="/profile-entrenador">
                    <button
                        className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Perfil Entrenador
                    </button>
                </Link>
                <Link href="/profile-jugador">
                    <button
                        className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Perfil Jugador
                    </button>
                </Link>
                <Link href="/">
                    <button
                        className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Salir
                    </button>
                </Link>
            </div>
        </div>
    );
}
