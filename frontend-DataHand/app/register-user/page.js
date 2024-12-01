'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Input1.module.css';
import styles2 from '../styles/Button1.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    userType: 'Entrenador', // Valor inicial del switch
    profilePicture: null,
    country: '',
    position: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleUserType = () => {
    setFormData({
      ...formData,
      userType: formData.userType === 'Entrenador' ? 'Jugador' : 'Entrenador',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }
  
    // Creamos los atributos según el tipo de usuario
    const atributos = formData.userType === 'Entrenador' 
      ? { goles: 0, asistencias: 0, efectividad: 0, blocajes: 0, recuperaciones: 0 } 
      : { goles: 5, asistencias: 5, efectividad: 5, blocajes: 5, recuperaciones: 5 };
  
    // Creamos el objeto de datos para enviar
    const userData = {
      nombreCompleto: `${formData.firstName} ${formData.lastName}`,
      correoElectronico: formData.email,
      contrasena: formData.password,
      fechaNacimiento: formData.birthDate,
      fotoPerfil: previewImage, // La URI de la imagen de perfil
      club: "No seleccionado", // Valor por defecto
      pais: formData.country,
      tipoUsuario: formData.userType === 'Entrenador' ? 'entrenador' : 'jugador', // Asignamos el tipo de usuario
      posicion: formData.userType === 'Entrenador' ? 'NA' : formData.position,
      atributos: atributos, // Los atributos
      historialPartidos: [], // Historial vacío
    };
  
    try {
      const response = await fetch('/api/users/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Enviamos los datos del usuario
      });
  
      if (response.ok) {
        const data = await response.json();
        // Mostrar la alerta con el nombre del usuario creado
        alert(`Registro exitoso. El usuario ${data.nombreCompleto} se ha creado correctamente.`);
        
        // Redirigir al inicio
        window.location.href = "/"; // Redirige a la página de inicio
      } else {
        const data = await response.json();
        setMensaje(data.message || 'Error al registrar usuario.');
      }
    } catch (err) {
      setMensaje('Error al conectar con el servidor.');
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="relative h-screen flex bg-orange-500 justify-center overflow-hidden">
      <Image
        src="/images/waves_bg_login.svg"
        alt="Background Waves"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 transition duration-300 ease-in-out delay-150"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-1/2 p-8">
        <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          DataHand
        </h1>
        <Image src="/images/logo.png" alt="Logo" width={280} height={280} className="mb-4" />
        <p className="mb-6 text-gray-100 text-center text-lg" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Convierte datos en decisiones.
          <br />
          ¡Eleva el rendimiento de tu equipo en cada jugada!
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center w-1/2 p-8">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Registro de Usuario
          </h2>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Primera fila */}
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleInputChange}
              className={styles.input1}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleInputChange}
              className={styles.input1}
            />
            {/* Segunda fila */}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input1}
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Fecha de nacimiento"
              value={formData.birthDate}
              onChange={handleInputChange}
              className={styles.input1}
            />
            {/* Tercera fila */}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input1}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repite contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={styles.input1}
            />
            {/* Switch centrado */}
            <div className="col-span-2 flex justify-center items-center gap-4 relative">
            <span className="text-white">Entrenador</span>
            <div className="relative w-20 h-8 bg-gray-300 rounded-full p-1 flex items-center">
                {/* Fondo deslizante */}
                <div
                className={`absolute top-1 left-1 w-8 h-6 bg-white rounded-full transition-transform duration-300 ${
                    formData.userType === 'Jugador' ? 'transform translate-x-10' : ''
                }`}
                ></div>
                {/* Botón invisible para alternar */}
                <button
                type="button"
                onClick={toggleUserType}
                className="absolute w-full h-full bg-transparent focus:outline-none"
                aria-label={`Seleccionado: ${formData.userType}`}
                ></button>
            </div>
            <span className="text-white">Jugador</span>
            </div>
            {/* Campo de imagen */}
            <div className="col-span-2 flex flex-col items-center gap-2">
            <label className="text-white text-lg mb-2">Foto de Perfil:</label>
            <div
                className="w-full max-w-xs h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100"
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('imageUpload').click()}
            >
                {previewImage ? (
                <img
                    src={previewImage}
                    alt="Vista previa"
                    className="max-h-full max-w-full rounded-md object-cover"
                />
                ) : (
                <p className="text-gray-500 text-center">
                    Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                )}
            </div>
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
            />
            </div>
            {/* Última fila */}
            <input
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleInputChange}
              className={styles.input1}
            />
            {/* Selección de posición */}
            {formData.userType === 'Jugador' && (
            <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={styles.input1}
            >
                <option value="">Selecciona una posición</option>
                <option value="EI">Extremo Izquierdo</option>
                <option value="ED">Extremo Derecho</option>
                <option value="LI">Lateral Izquierdo</option>
                <option value="LD">Lateral Derecho</option>
                <option value="CE">Central</option>
                <option value="PV">Pivote</option>
                <option value="PO">Portero</option>
            </select>
            )}
                        <button type="submit" className={`col-span-2 ${styles2['styled-button']}`}>
              Registrarse
            </button>
          </form>
          {mensaje && <p className="text-white text-center mt-6">{mensaje}</p>}
          <p className="text-white text-center mt-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/" className="text-purple-600 hover:text-white transition">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
