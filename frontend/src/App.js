// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';

// Componente principal de la aplicación
function App() {
  // Estados para el nombre de usuario, la contraseña y los mensajes de la aplicación
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // URL base del backend, obtenida de las variables de entorno de Docker Compose
  // Asegúrate de que esta URL sea la correcta para tu backend (http://backend:5001 en el contenedor)
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @param {string} role - El rol con el que se intenta iniciar sesión (ej. 'user', 'admin').
   */
  const handleLogin = async (role) => {
    setMessage('Iniciando sesión...'); // Mensaje de carga

    try {
      // Realiza una petición POST al backend
      // La ruta '/api/login' es un ejemplo, deberás implementarla en tu backend
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envía el nombre de usuario, la contraseña y el rol en el cuerpo de la petición
        body: JSON.stringify({ username, password, role }),
      });

      // Parsea la respuesta JSON del backend
      const data = await response.json();

      // Verifica si la respuesta fue exitosa (código de estado 2xx)
      if (response.ok) {
        setMessage(`¡Inicio de sesión exitoso como ${role}! Mensaje: ${data.message}`);
        // Aquí podrías guardar un token de autenticación, redirigir al usuario, etc.
        console.log('Login exitoso:', data);
      } else {
        // Muestra un mensaje de error si la autenticación falla
        setMessage(`Error al iniciar sesión como ${role}: ${data.message || 'Credenciales inválidas'}`);
        console.error('Error de login:', data);
      }
    } catch (error) {
      // Captura y muestra errores de red o del servidor
      setMessage(`Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo.`);
      console.error('Error de fetch:', error);
    }
  };

  /**
   * Maneja el registro de un nuevo usuario.
   * Este es un ejemplo y requerirá implementación en el backend.
   */
  const handleRegister = async () => {
    setMessage('Registrando usuario...'); // Mensaje de carga

    try {
      // Realiza una petición POST al backend para registrar un nuevo usuario
      // La ruta '/api/register' es un ejemplo, deberás implementarla en tu backend
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`¡Registro exitoso! Mensaje: ${data.message}`);
        console.log('Registro exitoso:', data);
      } else {
        setMessage(`Error al registrar: ${data.message || 'El usuario ya existe o datos inválidos'}`);
        console.error('Error de registro:', data);
      }
    } catch (error) {
      setMessage(`Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo.`);
      console.error('Error de fetch:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar Sesión</h2>

        {/* Campo de Usuario */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleLogin('user')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleRegister}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrarse
          </button>
        </div>

        {/* Área de Mensajes */}
        {message && (
          <div className="mt-6 p-3 text-center text-sm rounded-lg bg-blue-100 text-blue-800">
            {message}
          </div>
        )}

        {/* Información sobre la URL del Backend */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>URL del Backend API (desde contenedor): <strong className="text-gray-700">{apiUrl}</strong></p>
          <p>Para probar, el backend necesita las rutas `/api/login` y `/api/register`.</p>
        </div>
      </div>
    </div>
  );
}

export default App;