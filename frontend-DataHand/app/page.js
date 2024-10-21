"use client"; // Marcamos el componente como cliente

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Importamos useState para gestionar el estado
import { useRouter } from 'next/navigation'; // Importamos useRouter desde next/navigation
import { connectDB } from '/lib/db.js'; 

export default function Login() {
  const router = useRouter(); // Inicializamos el enrutador
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error
  const [nombreUsuario, setNombreUsuario] = useState(""); // Estado para el nombre de usuario
  const [contrasena, setContrasena] = useState(""); // Estado para la contraseña

  //connectDB()

  // Función para enviar los datos del usuario para registrar
  const registrarUsuario = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Usuario ficticio que será enviado
    const nuevoUsuario = {
      nombreCompleto: "c",
      correoElectronico: "c@example.com",
      contrasena: "c",
      fechaNacimiento: "1985-11-15T00:00:00.000Z",
      tipoUsuario: "jugador",
      fotoPerfil: "url_a_la_foto_pedro.jpg",
      club: "Club Deportivo Ejemplo",
      pais: "España",
      posicion: "delantero",
      atributos: {
        velocidad: 7,
        fuerza: 8,
        resistencia: 9,
      },
      historialPartidos: [], // Puede estar vacío para este ejemplo
    };

    try {
      // Enviar una solicitud POST a la API para registrar el usuario
      const response = await fetch("/api/users/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Usuario registrado con éxito");
        console.log("Usuario creado:", data);
      } else {
        setMensaje("Error al registrar el usuario");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setMensaje("Error de conexión");
      console.error("Error de conexión:", error);
    }
  };

  // Nueva función para redirigir al home sin iniciar sesión
  const redirigirAHome = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del botón
    router.push('/home'); // Cambia la ruta a /home
  };

  return (
    <div className="relative h-screen flex bg-orange-500 justify-center overflow-hidden">
      {/* Fondo de olas */}
      <Image
        src="/images/waves_bg_login.svg"
        alt="Background Waves"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 transition duration-300 ease-in-out delay-150"
      />

      {/* Contenedor de la izquierda */}
      <div className="relative z-10 flex flex-col items-center justify-center w-1/2 p-8">
        <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>DataHand</h1>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={280}
          height={280}
          className="mb-4"
        />
        <p className="mb-6 text-gray-100 text-center text-lg" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Convierte datos en decisiones.<br />¡Eleva el rendimiento de tu equipo en cada jugada!
        </p>
      </div>

      {/* Contenedor de la derecha */}
      <div className="relative z-10 flex items-center justify-center w-1/2 p-8">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className="text-3xl font-semibold text-center mb-6 text-white"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Iniciar sesión
          </h2>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)} // Actualiza el nombre de usuario
              className="input-field"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)} // Actualiza la contraseña
              className="input-field"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            />
            <button
              className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
              onClick={redirigirAHome} // Aquí redirigimos sin iniciar sesión
            >
              Iniciar Sesión
            </button>
          </form>
          <button
            className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center mt-4"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
            onClick={registrarUsuario} // Conectamos la función de registrar usuario
          >
            Registrarse
          </button>
          {mensaje && (
            <p className="text-white text-center mt-6">
              {mensaje}
            </p>
          )}
          <p className="text-white text-center mt-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
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
