'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Input1.module.css';
import styles2 from '../styles/Button1.module.css';
import styles3 from '../styles/Card1.module.css';
import styles4 from '../styles/Checkbox1.module.css';
import UsuarioCreado from '../components/UsuarioCreado'; // Importa la modal

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {

  const [usuarioCreado, setUsuarioCreado] = useState(null);
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

  const [equipos, setEquipos] = useState([]); // Estado para los equipos filtrados
  const [mensaje, setMensaje] = useState('');

  // Obtener equipos desde la API
  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await fetch('/api/users/equipos'); // Asegúrate de que esta ruta sea la correcta
        if (response.ok) {
          const data = await response.json();
          // Filtrar los equipos cuyo entrenador es "No asignado"
          const equiposFiltrados = data.filter(equipo => equipo.entrenador === 'No asignado');
          setEquipos(equiposFiltrados);
        } else {
          setMensaje('Error al obtener los equipos');
        }
      } catch (error) {
        setMensaje('Error al conectar con el servidor.');
      }
    };
    
    fetchEquipos();
  }, []);

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
      club: formData.userType === 'Entrenador' 
      ? (formData.club ? formData.club : 'No asignado') 
      : 'No asignado',
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
        setUsuarioCreado(data.nombreCompleto); // Mostrar el modal con el nombre del usuario        
        // Redirigir al inicio
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
    <div className="relative min-h-screen bg-orange-500 flex flex-col lg:flex-row justify-center items-center overflow-hidden overflow-y-auto">
      {/* Imagen de fondo */}
      <Image
        src="/images/waves_bg_login.svg"
        alt="Background Waves"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full z-0"
      />
  
      {/* Modal para el usuario creado */}
      {usuarioCreado && (
        <UsuarioCreado
          nombre={usuarioCreado}
          onClose={() => {
            setUsuarioCreado(null); // Ocultar el modal
            router.push('/'); // Redirigir al inicio
          }}
        />
      )}

      {/* Sección informativa */}
      <div className="w-full lg:w-1/2 p-8 text-center z-10">  {/* Añadido z-10 */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          DataHand
        </h1>
        <Image src="/images/logo.png" alt="Logo" width={200} height={200} className="mx-auto mb-4" />
        <p className="mb-6 text-gray-100 text-lg">
          Convierte datos en decisiones.
          <br />
          ¡Eleva el rendimiento de tu equipo en cada jugada!
        </p>
      </div>
  
      {/* Sección del formulario */}
      <div className="w-full lg:w-1/2 max-w-3xl p-6 bg-white bg-opacity-20 rounded-lg shadow-lg z-10">  {/* Añadido z-10 */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Registro de Usuario
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-2" onSubmit={handleSubmit}>
          {/* Campos de entrada */}
          <input type="text" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleInputChange} className={styles.input1} />
          <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleInputChange} className={styles.input1} />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} className={styles.input1} />
          <input type="date" name="birthDate" aria-label="Fecha de nacimiento" value={formData.birthDate} onChange={handleInputChange} className={styles.input1} />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} className={styles.input1} />
          <input type="password" name="confirmPassword" placeholder="Repite contraseña" value={formData.confirmPassword} onChange={handleInputChange} className={styles.input1} />
  
          {/* Switch */}
          <div className="col-span-2 flex justify-center items-center gap-4">
            <span className="text-white">Entrenador</span>
            
            {/* Custom Checkbox */}
            <input
              type="checkbox"
              className={styles4['theme-checkbox']}
              checked={formData.userType === 'Jugador'}
              onChange={toggleUserType}
            />
            
            <span className="text-white">Jugador</span>
          </div>
  
          {/* Imagen de perfil */}
          <div className="col-span-2 flex flex-col items-center">
            <label className="text-white text-lg">Foto de Perfil:</label>
            <div style={{ marginBottom: '10px' }}></div>
            <div
              className={styles3.card}
              onDrop={handleImageDrop} 
              onDragOver={handleDragOver} 
              onClick={() => document.getElementById('imageUpload').click()}
            >
              {/* Fondo de la tarjeta */}
              <div className={styles3.bg}></div>
  
              {/* Blobs animados */}
              <div className={styles3.blob}></div>
  
              {/* Vista previa de la imagen o mensaje */}
              {previewImage ? (
                <img src={previewImage} alt="Vista previa" className="max-h-full max-w-full rounded-md object-cover z-10 " 
                  style={{ width: '90%', height: '90%' }}
                />
              ) : (
                <p className="text-gray-500 text-center z-10">Arrastra o selecciona una imagen</p>
              )}
            </div>
            <div style={{ marginBottom: '10px' }}></div>
            <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          </div>
  
          {/* Campos adicionales */}
          <input
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleInputChange}
              className={styles.input1}
          />

          {/* Condición para mostrar el campo según el tipo de usuario */}
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

          {/* Si el usuario es Entrenador, mostrar lista de equipos */}
          {formData.userType === 'Entrenador' && (
              <select
                name="club"
                value={formData.club}
                onChange={handleInputChange}
                className={styles.input1}
              >
                <option value="">Selecciona un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo._id} value={equipo.nombre}>
                    {equipo.nombre}
                  </option>
                ))}
              </select>
          )}
  
          {/* Botón de registro */}
          <button type="submit" className={`col-span-2 ${styles2['styled-button']}`}>
            Registrarse
          </button>
        </form>
        {mensaje && <p className="text-white text-center mt-4">{mensaje}</p>}
        <p className="text-white text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link href="/" className="text-purple-600 hover:text-white">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}  