"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-orange-500 overflow-hidden">
            <h1 className="text-5xl font-bold mb-4 text-white" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Bienvenido a DataHand
            </h1>
            <p className="text-lg text-center text-gray-100 mb-20" style={{fontFamily: 'var(--font-geist-sans)'}}>
                Elige una opción para continuar
            </p>

            {/* Contenedor de botones Entrenador y Jugador */}
            <div className="grid grid-cols-2 gap-6 w-3/4 mb-10"> {/* Espacio añadido */}
                <Link href="/profile-entrenador">
                    <button
                        className="flex items-center justify-center bg-transparent text-white border-2 border-white py-10 px-5 text-4xl rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center"
                        style={{fontFamily: 'var(--font-geist-sans)'}}>
                        <Image
                            src="/images/bxs-user.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        Entrenador
                    </button>
                </Link>
                <Link href="/profile-jugador">
                    <button
                        className="flex items-center justify-center bg-transparent text-white border-2 border-white py-10 px-5 text-4xl rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center"
                        style={{fontFamily: 'var(--font-geist-sans)'}}>
                        <Image
                            src="/images/bx-user.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        Jugador
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 w-2/4 mb-10"> {/* Espacio añadido */}
                <Link href="/">
                    <button
                        className="flex items-center justify-center bg-transparent text-white border-2 border-white py-10 px-5 text-4xl rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center"
                        style={{fontFamily: 'var(--font-geist-sans)'}}>
                        <Image
                            src="/images/bx-power-off.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        Salir
                    </button>
                </Link>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-gradient {
                    background: linear-gradient(270deg, #ffb835, #8A2BE2);
                    background-size: 400% 400%;
                    animation: gradient 20s ease infinite;
                }
            `}</style>
        </div>
    );
}
