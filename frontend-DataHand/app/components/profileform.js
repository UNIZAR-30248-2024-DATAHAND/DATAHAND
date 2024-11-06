// ProfileForm.js

// Este código define un formulario de edición de perfil en React, estructurado para ocupar un ancho amplio en pantalla (80% del ancho con un máximo de 800px). 
// Al cargar, los campos se rellenan con datos predefinidos, y el texto cambia de color al enfocarse. 
// También maneja el envío del formulario sin recargar la página, registrando los datos ingresados en la consola.


import React, { useEffect, useState } from 'react';

export default function ProfileForm() {
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    id: "123456",
    email: "john.doe@example.com",
    password: "********",
    username: "johndoe"
  });

  useEffect(() => {
    // Populate form with initial data
    const inputs = document.querySelectorAll('input:not([type="submit"])');
    inputs.forEach(input => {
      input.style.color = '#999';
    });
  }, []);

  const handleFocus = (e) => {
    e.target.style.color = '#000';
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(userData);
  };

  return (
    <div style={styles.body}>
      <form onSubmit={handleSubmit} style={styles.form} id="profileForm">
        <h1 style={styles.heading}>Edit Profile</h1>
        
        <label style={styles.label} htmlFor="fullName">Full Name:</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          required 
          value={userData.fullName} 
          onFocus={handleFocus} 
          onChange={handleChange} 
          style={styles.input}
        />
        
        <label style={styles.label} htmlFor="id">ID:</label>
        <input 
          type="text" 
          id="id" 
          name="id" 
          required 
          value={userData.id} 
          onFocus={handleFocus} 
          onChange={handleChange} 
          style={styles.input}
        />

        <label style={styles.label} htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          value={userData.email} 
          onFocus={handleFocus} 
          onChange={handleChange} 
          style={styles.input}
        />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          value={userData.password} 
          onFocus={handleFocus} 
          onChange={handleChange} 
          style={styles.input}
        />

        <label style={styles.label} htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required 
          value={userData.username} 
          onFocus={handleFocus} 
          onChange={handleChange} 
          style={styles.input}
        />

        <input type="submit" value="Save Changes" style={styles.submit} />
      </form>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: '#f0f0f0',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '80%', // Cambiado a 80% para ocupar más espacio horizontal
    maxWidth: '800px', // Limita el ancho máximo a 800px en pantallas grandes
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  label: {
    display: 'block',
    marginTop: '1rem',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submit: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.5rem',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
  },
};