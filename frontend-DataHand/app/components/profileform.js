import React, { useState, useEffect } from "react";
import styles2 from "../styles/Input1.module.css"; // Ruta para los estilos de los inputs
import styles3 from '../styles/Card1.module.css';
import { useRouter } from 'next/navigation'; // Importar useRouter
import ActualizacionExito from './ActualizacionExito'; // Asegúrate de importar el componente de la alerta

export default function ProfileForm({ userData, setUserData }) {
  const router = useRouter(); // Crear la instancia del router
  const [previewImage, setPreviewImage] = useState(userData.fotoPerfil);
  const [password, setPassword] = useState(userData.contrasena || "");
  const [confirmPassword, setConfirmPassword] = useState(userData.contrasena || "");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [imageSmall, setImageSmall] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la alerta de éxito

  // Sincroniza el estado con los datos del usuario
  useEffect(() => {
    setPreviewImage(userData.fotoPerfil);
    setPassword(userData.contrasena || "");
    setConfirmPassword(userData.contrasena || "");
  }, [userData.fotoPerfil, userData.contrasena]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordMatchError(value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatchError(value !== password);
  };

  // const handleImageDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
    
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewImage(reader.result); // Establece la vista previa de la imagen
  //       setUserData({ ...userData, fotoPerfil: reader.result }); // Actualiza el usuario con la imagen
  //       setImageSmall(file.size < 500000); // Cambia el estado para reducir el tamaño de la imagen
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await fetch("/api/users/usuarios", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userData.userID,
          nombre: userData.nombreCompleto,
          contrasenia: password,
          foto: userData.fotoPerfil,
          club: userData.club,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Usuario actualizado:", data);
        setShowAlert(true); // Mostrar alerta de éxito antes de redirigir
      } else {
        console.error("Error al actualizar usuario:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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

  const handleAlertClose = () => {
    setShowAlert(false);
    router.push(`../profile/${userData.userID}`); // Redirigir al perfil después de cerrar la alerta
  };

  // const [previewImage, setPreviewImage] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();handleImageDrop
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form} id="profileForm">
        <label style={{ ...styles.label, marginTop: '-5px' }} htmlFor="nombreCompleto" >
          Nombre Completo:
        </label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombreCompleto"
          required
          value={userData.nombreCompleto}
          onChange={handleChange}
          className={styles2.input2}
        />

        <label style={styles.label} htmlFor="contrasena">
          Contraseña:
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          required
          value={password}
          onChange={handlePasswordChange}
          className={styles2.input2}
        />

        <label style={styles.label} htmlFor="confirmarContrasena">
          Repite la Contraseña:
        </label>
        <input
          type="password"
          id="confirmarContrasena"
          name="confirmarContrasena"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles2.input2}
        />
        {passwordMatchError && (
          <p style={styles.errorText}>Las contraseñas no coinciden.</p>
        )}

        <label style={styles.label}>Foto de Perfil:</label>
        <div style={{ marginBottom: '20px' }}></div>
        <div
          className={styles3.card}
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className={styles3.bg}></div>
          <div className={styles3.blob}></div>
          {previewImage ? (
                <img src={previewImage} alt="Vista previa" className="max-h-full max-w-full rounded-md object-cover z-10 " 
                  style={{ width: '90%', height: '90%' }}
                />
              ) : (
                <p className="text-gray-500 text-center z-10">Arrastra o selecciona una imagen</p>
              )}
        </div>

        <label style={styles.label} htmlFor="club">
          Club:
        </label>
        <input
          type="text"
          id="club"
          name="club"
          required
          value={userData.club}
          onChange={handleChange}
          className={styles2.input2}
        />

        <input
          type="submit"
          value="Guardar Cambios"
          style={styles.submit}
        />
      </form>

      {showAlert && (
        <ActualizacionExito
          mensaje="El perfil se ha actualizado correctamente."
          onClose={handleAlertClose}
        />
      )}
    </>
  );
}


const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    backgroundColor: "#f3f3f3",
  },
  form: {
    position: "relative",
    border: "6px solid white",
    padding: "1rem",
    borderRadius: "25px", // Más redondeado
    width: "90%",
    maxWidth: "1300px",
    background: "url('/images/waves_bg_edit_profile.svg') no-repeat center center / cover",
    color: "#000", // Color negro para el texto general
    boxShadow: "none", // Elimina los bordes blancos
  },
  heading: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: "1.5rem",
    fontSize: "2rem",
    color: "#FFF", // Negro para el encabezado
  },
  label: {
    display: "block",
    marginTop: "0.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#FFF", // Negro para las etiquetas
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    marginTop: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "12px", // Más redondeado
    fontSize: "1rem",
    color: "#000", // Negro para el texto
    backgroundColor: "#fff", // Fondo blanco para el campo
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  },
  imageDropZone: {
    marginTop: "1rem",
    width: "100%",
    height: "160px",
    border: "2px dashed #ccc",
    borderRadius: "15px", // Más redondeado
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#555",
    cursor: "pointer",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "15px", // Coincide con la zona de imagen
  },
  submit: {
    backgroundColor: "#f57c00", // Naranja para el botón
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "2rem",
    width: "100%",
    padding: "0.8rem",
    borderRadius: "20px", // Botón con bordes más suaves
    fontWeight: "700",
    fontSize: "1.1rem",
    textTransform: "uppercase",
  },
  submitHover: {
    backgroundColor: "#ff9800", // Un tono más claro de naranja al pasar el cursor
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
};
