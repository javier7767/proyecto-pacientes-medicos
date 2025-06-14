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



// import React, { useState } from 'react';

// // Componente principal de la aplicación
// function App() {
//   // Estados para el nombre de usuario, la contraseña y los mensajes de la aplicación
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   // URL base del backend, obtenida de las variables de entorno de Docker Compose
//   // Asegúrate de que esta URL sea la correcta para tu backend (http://backend:5001 en el contenedor)
//   const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

//   /**
//    * Maneja el envío del formulario de inicio de sesión.
//    * @param {string} role - El rol con el que se intenta iniciar sesión (ej. 'user', 'admin').
//    */
//   const handleLogin = async (role) => {
//     setMessage('Iniciando sesión...'); // Mensaje de carga

//     try {
//       // Realiza una petición POST al backend
//       // La ruta '/api/login' es un ejemplo, deberás implementarla en tu backend
//       const response = await fetch(`${apiUrl}/api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // Envía el nombre de usuario, la contraseña y el rol en el cuerpo de la petición
//         body: JSON.stringify({ username, password, role }),
//       });

//       // Parsea la respuesta JSON del backend
//       const data = await response.json();

//       // Verifica si la respuesta fue exitosa (código de estado 2xx)
//       if (response.ok) {
//         setMessage(`¡Inicio de sesión exitoso como ${role}! Mensaje: ${data.message}`);
//         // Aquí podrías guardar un token de autenticación, redirigir al usuario, etc.
//         console.log('Login exitoso:', data);
//       } else {
//         // Muestra un mensaje de error si la autenticación falla
//         setMessage(`Error al iniciar sesión como ${role}: ${data.message || 'Credenciales inválidas'}`);
//         console.error('Error de login:', data);
//       }
//     } catch (error) {
//       // Captura y muestra errores de red o del servidor
//       setMessage(`Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo.`);
//       console.error('Error de fetch:', error);
//     }
//   };

//   /**
//    * Maneja el registro de un nuevo usuario.
//    * Este es un ejemplo y requerirá implementación en el backend.
//    */
//   const handleRegister = async () => {
//     setMessage('Registrando usuario...'); // Mensaje de carga

//     try {
//       // Realiza una petición POST al backend para registrar un nuevo usuario
//       // La ruta '/api/register' es un ejemplo, deberás implementarla en tu backend
//       const response = await fetch(`${apiUrl}/api/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(`¡Registro exitoso! Mensaje: ${data.message}`);
//         console.log('Registro exitoso:', data);
//       } else {
//         setMessage(`Error al registrar: ${data.message || 'El usuario ya existe o datos inválidos'}`);
//         console.error('Error de registro:', data);
//       }
//     } catch (error) {
//       setMessage(`Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo.`);
//       console.error('Error de fetch:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar Sesión</h2>

//         {/* Campo de Usuario */}
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
//             Usuario:
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Introduce tu usuario"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         {/* Campo de Contraseña */}
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
//             Contraseña:
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Introduce tu contraseña"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* Botones de Acción */}
//         <div className="flex flex-col space-y-4">
//           <button
//             onClick={() => handleLogin('user')}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Iniciar Sesión
//           </button>
//           <button
//             onClick={handleRegister}
//             className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Registrarse
//           </button>
//         </div>

//         {/* Área de Mensajes */}
//         {message && (
//           <div className="mt-6 p-3 text-center text-sm rounded-lg bg-blue-100 text-blue-800">
//             {message}
//           </div>
//         )}

//         {/* Información sobre la URL del Backend */}
//         <div className="mt-8 text-center text-gray-500 text-xs">
//           <p>URL del Backend API (desde contenedor): <strong className="text-gray-700">{apiUrl}</strong></p>
//           <p>Para probar, el backend necesita las rutas `/api/login` y `/api/register`.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css'; // Asegúrate de que este archivo exista en frontend/src/

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  // URL base de tu API Backend
  // *** ¡CAMBIO AQUÍ! Ahora es una cadena vacía para que las peticiones sean relativas ***
  const apiUrl = ''; // Esto hará que las peticiones sean a /api/login, /api/patients, etc.

  // Estados para el formulario de registro de paciente
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Otro');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (currentPage === 'dashboard' && isLoggedIn) {
      fetchPatients();
    }
  }, [currentPage, isLoggedIn]);

  const fetchPatients = async () => {
    try {
      // Las peticiones ahora serán a /api/patients (relativas al host de Nginx)
      const response = await axios.get(`${apiUrl}/api/patients`);
      setPatients(response.data);
      console.log('Pacientes cargados:', response.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
      setMessage('Error al cargar la lista de pacientes.');
    }
  };

  const handleLogin = async (role) => {
    setMessage('Iniciando sesión...');

    try {
      // Las peticiones ahora serán a /api/login (relativas al host de Nginx)
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`¡Inicio de sesión exitoso como ${role}! Mensaje: ${data.message}`);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
        console.log('Login exitoso:', data);
      } else {
        setMessage(`Error al iniciar sesión como ${role}: ${data.message || 'Credenciales inválidas'}`);
        console.error('Error de login:', data);
      }
    } catch (error) {
      setMessage(`Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo.`);
      console.error('Error de fetch:', error);
    }
  };

  const handleRegister = async () => {
    setMessage('Registrando usuario...');

    try {
      // Las peticiones ahora serán a /api/register (relativas al host de Nginx)
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

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setMessage('Registrando paciente...');

    try {
      // Las peticiones ahora serán a /api/patients (relativas al host de Nginx)
      const response = await axios.post(`${apiUrl}/api/patients`, {
        name: patientName,
        age: parseInt(patientAge),
        gender: patientGender,
        contact: {
          phone: patientPhone,
          email: patientEmail,
        },
      });

      if (response.status === 201) {
        setMessage(`Paciente ${response.data.patient.name} registrado exitosamente. ID: ${response.data.patient._id}`);
        setPatientName('');
        setPatientAge('');
        setPatientGender('Otro');
        setPatientPhone('');
        setPatientEmail('');
        fetchPatients();
      } else {
        setMessage(`Error al registrar paciente: ${response.data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      setMessage(`Error de conexión al registrar paciente: ${error.message}.`);
      if (error.response) {
        setMessage(`Error al registrar paciente: ${error.response.data.message || error.message}`);
      }
    }
  };

  // ... (Resto del código de renderizado, es el mismo) ...

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Iniciar Sesión</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleLogin('user')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={handleRegister}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Registrarse
            </button>
          </div>

          {message && (
            <div className="mt-6 p-3 text-center text-sm rounded-lg bg-blue-100 text-blue-800 shadow">
              {message}
            </div>
          )}

          {/* Información sobre la URL del Backend (el texto de localhost:5001 ya no es relevante con el proxy) */}
          <div className="mt-8 text-center text-gray-500 text-xs p-2 bg-gray-50 rounded-lg shadow-inner">
            <p>El frontend se comunica con el backend a través de Nginx Proxy.</p>
            <p>Las credenciales de prueba son:</p>
            <p className="mt-2 text-gray-600">
              * Login exitoso: <code className="font-mono text-gray-700">Usuario=testuser</code>, <code className="font-mono text-gray-700">Contraseña=password123</code><br/>
              * Admin Login: <code className="font-mono text-gray-700">Usuario=admin</code>, <code className="font-mono text-gray-700">Contraseña=admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pacientes</h1>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setUsername('');
            setPassword('');
            setMessage('');
            setCurrentPage('login');
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
        >
          Cerrar Sesión
        </button>
      </header>

      <nav className="mb-6 flex space-x-4">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`py-2 px-4 rounded-lg transition duration-300 ${currentPage === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Registro de Paciente
        </button>
        <button
          onClick={() => setCurrentPage('consulta')}
          className={`py-2 px-4 rounded-lg transition duration-300 ${currentPage === 'consulta' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Consultar Pacientes
        </button>
      </nav>

      {message && (
        <div className="mt-4 p-3 text-center text-sm rounded-lg bg-blue-100 text-blue-800 shadow mb-6">
          {message}
        </div>
      )}

      {currentPage === 'dashboard' && (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Registrar Nuevo Paciente</h2>
          <form onSubmit={handlePatientSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                Nombre Completo:
              </label>
              <input
                type="text"
                id="patientName"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientAge">
                Edad:
              </label>
              <input
                type="number"
                id="patientAge"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientGender">
                Género:
              </label>
              <select
                id="patientGender"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientPhone">
                Teléfono:
              </label>
              <input
                type="tel"
                id="patientPhone"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientEmail">
                Email:
              </label>
              <input
                type="email"
                id="patientEmail"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out shadow-md hover:shadow-lg w-full"
            >
              Registrar Paciente
            </button>
          </form>
        </div>
      )}

      {currentPage === 'consulta' && (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Listado de Pacientes</h2>
          {patients.length === 0 ? (
            <p className="text-center text-gray-500">No hay pacientes registrados aún.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edad
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Género
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registrado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.contact.phone && <div>Tel: {patient.contact.phone}</div>}
                        {patient.contact.email && <div>Email: {patient.contact.email}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(patient.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setMessage(`Generando consulta para ${patient.name} (ID: ${patient._id})...`)}
                          className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-md transition duration-150"
                        >
                          Generar Consulta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
