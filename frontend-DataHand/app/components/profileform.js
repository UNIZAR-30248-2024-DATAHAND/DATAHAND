import React, { useState, useEffect } from "react";

export default function ProfileForm({ userData, setUserData }) {
  const [previewImage, setPreviewImage] = useState(userData.fotoPerfil);
  const [password, setPassword] = useState(userData.contrasena || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Si los datos del usuario cambian, actualiza la vista previa de la imagen
  useEffect(() => {
    setPreviewImage(userData.fotoPerfil);
  }, [userData.fotoPerfil]);

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

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setUserData({ ...userData, fotoPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      // Llamada a la función PUT del backend
      const response = await fetch("/api/users/usuarios", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userData.userID, // Reemplaza con el ID real del usuario
          nombre: userData.nombreCompleto,
          contrasenia: password,
          foto: userData.fotoPerfil,
          club: userData.club,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario actualizado:", data);
      } else {
        console.error("Error al actualizar usuario:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} id="profileForm">
      <label style={styles.label} htmlFor="nombreCompleto">
        Nombre Completo:
      </label>
      <input
        type="text"
        id="nombreCompleto"
        name="nombreCompleto"
        required
        value={userData.nombreCompleto}
        onChange={handleChange}
        style={styles.input}
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
        style={styles.input}
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
        style={styles.input}
      />
      {passwordMatchError && (
        <p style={styles.errorText}>Las contraseñas no coinciden.</p>
      )}

      <label style={styles.label}>Foto de Perfil:</label>
      <div
        style={styles.imageDropZone}
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Vista previa"
            style={styles.imagePreview}
          />
        ) : (
          <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
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
        style={styles.input}
      />

      <input
        type="submit"
        value="Guardar Cambios"
        style={{ ...styles.submit }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.submitHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.submit.backgroundColor)}
      />
    </form>
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
    padding: "2rem",
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
    marginTop: "1.5rem",
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
