'use client'; // Marcamos el componente como cliente

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/Input1.module.css'; // Ajusta la ruta según tu estructura
import styles2 from './styles/Button1.module.css'; // Ajusta la ruta según tu estructura
import { useState } from 'react'; // Importamos useState para gestionar el estado
import { useRouter } from 'next/navigation'; // Importamos useRouter desde next/navigation
import { connectDB } from '../lib/db.js';

export default function Login() {
  const router = useRouter(); // Inicializamos el enrutador
  const [mensaje, setMensaje] = useState(''); // Mensaje de éxito o error
  const [nombreUsuario, setNombreUsuario] = useState(''); // Estado para el nombre de usuario
  const [contrasena, setContrasena] = useState(''); // Estado para la contraseña

  //connectDB()

  const registrarUsuario = (e) => {
    e.preventDefault();
    router.push('/register-user'); // Redirige directamente
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
        <h1
          className="text-5xl font-bold mb-4 text-white"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          DataHand
        </h1>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={280}
          height={280}
          className="mb-4"
        />
        <p
          className="mb-6 text-gray-100 text-center text-lg"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Convierte datos en decisiones.
          <br />
          ¡Eleva el rendimiento de tu equipo en cada jugada!
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
              className={styles.input1} // Aplica los estilos del módulo CSS
              // style={{ fontFamily: 'var(--font-geist-mono)' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)} // Actualiza la contraseña
              className={styles.input1} // Aplica los estilos del módulo CSS
              // style={{ fontFamily: 'var(--font-geist-mono)' }}
            />
            <button
              // className="bg-transparent text-white border-2 border-white p-3 rounded-full w-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out text-center"
              // style={{ fontFamily: 'var(--font-geist-sans)' }}
              className={styles2['styled-button']} // Aplica los estilos del módulo CSS para Button1.              
              onClick={redirigirAHome} // Aquí redirigimos sin iniciar sesión
            >
              Iniciar Sesión
              <div className={styles2['inner-button']}>                
                <svg
                  id="Arrow"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  width="30px"
                  className={styles2.icon}                
                >
                  <defs>
                    <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                      <stop style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} offset="0%" />
                      <stop style={{ stopColor: '#AAAAAA', stopOpacity: 1 }} offset="100%" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#iconGradient)"
                    d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
                  />
                </svg>
              </div>
            </button>
            <button
              className={`${styles2['styled-button']}`} // Aplica los estilos del módulo CSS para Button1.            
              onClick={registrarUsuario} // Conectamos la función de registrar usuario
            >
              Registrarse
              <div className={styles2['inner-button']}>            
                <svg
                  id="Arrow"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  width="30px"
                  className={styles2.icon}              
                >
                  <defs>
                    <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                      <stop style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} offset="0%" />
                      <stop style={{ stopColor: '#AAAAAA', stopOpacity: 1 }} offset="100%" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#iconGradient)"
                    d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
                  />
                </svg>
              </div>
            </button>
          </form>
          
          {mensaje && <p className="text-white text-center mt-6">{mensaje}</p>}
          <p
            className="text-white text-center mt-6"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            ¿Olvidaste tu contraseña?{' '}
            <Link
              href="/forgot-password"
              className="text-purple-600 hover:text-white transition"
            >
              Recuperar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
