// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 5001; // Usa process.env.PORT para flexibilidad en Docker

// app.use(cors()); // Habilita CORS
// app.use(express.json()); // Habilita el parsing de JSON para las peticiones

// app.get('/', (req, res) => {
//   res.send('¡Hola desde el Backend de Node.js!');
// });

// app.get('/api/saludo', (req, res) => {
//   res.json({ message: '¡Saludos desde el API del Backend!' });
// });

// app.listen(port, () => {
//   console.log(`Backend corriendo en el puerto ${port}`);
//   console.log(`URL del API para el frontend: ${process.env.REACT_APP_API_URL}`);
// }); 




// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 5001; // Usa process.env.PORT para flexibilidad en Docker

// app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
// app.use(express.json()); // Habilita el parsing de JSON para las peticiones (importante para leer datos del formulario)

// // Ruta de prueba para la raíz (GET)
// app.get('/', (req, res) => {
//   res.send('¡Hola desde el Backend de Node.js!');
// });

// // Ruta de prueba para el API (GET)
// app.get('/api/saludo', (req, res) => {
//   res.json({ message: '¡Saludos desde el API del Backend!' });
// });

// // NUEVA RUTA: Maneja las peticiones POST para el login
// app.post('/api/login', (req, res) => {
//   // Extrae el username, password y role del cuerpo de la petición JSON
//   // El frontend envía estos datos cuando el usuario intenta iniciar sesión
//   const { username, password, role } = req.body;

//   console.log(`Intento de login: Usuario=${username}, Rol=${role}, Contraseña=${password}`);

//   // *** lógica real para verificar el usuario y la contraseña en una base de datos ***
//   //  lógica simple de ejemplo:
//   if (username === 'testuser' && password === 'password123' && role === 'user') {
//     // Si las credenciales son válidas, envía una respuesta de éxito
//     res.status(200).json({ message: 'Login exitoso', token: 'fake-jwt-token-for-user' });
//   } else if (username === 'admin' && password === 'admin123' && role === 'admin') {
//     res.status(200).json({ message: 'Login de administrador exitoso', token: 'fake-jwt-token-for-admin' });
//   }
//   else {
//     // Si las credenciales no son válidas, envía una respuesta de error
//     res.status(401).json({ message: 'Credenciales inválidas' });
//   }
// });

// // NUEVA RUTA: Maneja las peticiones POST para el registro
// app.post('/api/register', (req, res) => {
//   // Extrae el username y password del cuerpo de la petición JSON
//   const { username, password } = req.body;

//   console.log(`Intento de registro: Usuario=${username}, Contraseña=${password}`);

//   // *** lógica real para guardar el nuevo usuario en una base de datos ***
//   // Por ahora, simplemente simulamos un registro exitoso o fallido
//   if (username === 'existinguser') {
//     // Simula que el usuario ya existe
//     res.status(409).json({ message: 'El usuario ya existe' }); // 409 Conflict
//   } else if (!username || !password) {
//     res.status(400).json({ message: 'Usuario y contraseña son requeridos' }); // 400 Bad Request
//   }
//   else {
//     // Simula un registro exitoso
//     res.status(201).json({ message: 'Usuario registrado exitosamente' }); // 201 Created
//   }
// });


// // Inicia el servidor para que escuche las peticiones en el puerto definido
// app.listen(port, () => {
//   console.log(`Backend corriendo en el puerto ${port}`);
//   // La variable REACT_APP_API_URL es para el frontend, el backend no la usa directamente.
//   // Por eso mostrará 'undefined' si no está configurada en el entorno del backend.
//   console.log(`URL del API para el frontend: ${process.env.REACT_APP_API_URL}`);
// });




const express = require('express');
const cors = require('cors'); // Necesitas instalar 'cors': npm install cors
const app = express();
const port = process.env.PORT || 5001;

// --- Simulación de "Base de Datos" en memoria ---
// Array para almacenar pacientes. Se perderá al reiniciar el servidor.
const patients = [];
let patientIdCounter = 1; // Contador para asignar IDs únicos a los pacientes

// Configuración de CORS para permitir peticiones desde tu frontend
// En desarrollo, 'http://localhost:3000' es el origen de tu React App
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json()); // Middleware para parsear JSON en las peticiones (importante para leer datos del formulario)

// -------------------------------------------------------------------------------------
// RUTAS DE AUTENTICACIÓN (Login y Registro) - Tus rutas existentes
// -------------------------------------------------------------------------------------

// Ruta de prueba para la raíz (GET)
app.get('/', (req, res) => {
  res.send('¡Hola desde el Backend de Node.js!');
});

// Ruta de prueba para el API (GET)
app.get('/api/saludo', (req, res) => {
  res.json({ message: '¡Saludos desde el API del Backend!' });
});

// Maneja las peticiones POST para el login
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;
  console.log(`Intento de login: Usuario=${username}, Rol=${role}, Contraseña=${password}`);

  if (username === 'testuser' && password === 'password123' && role === 'user') {
    res.status(200).json({ message: 'Login exitoso', token: 'fake-jwt-token-for-user' });
  } else if (username === 'admin' && password === 'admin123' && role === 'admin') {
    res.status(200).json({ message: 'Login de administrador exitoso', token: 'fake-jwt-token-for-admin' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Maneja las peticiones POST para el registro
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Intento de registro: Usuario=${username}, Contraseña=${password}`);

  if (patients.find(p => p.username === username)) { // Verifica si el usuario ya "existe"
    res.status(409).json({ message: 'El usuario ya existe' }); // 409 Conflict
  } else if (!username || !password) {
    res.status(400).json({ message: 'Usuario y contraseña son requeridos' }); // 400 Bad Request
  } else {
    // Simula un registro exitoso y "guarda" el usuario en memoria (solo para pruebas)
    patients.push({ id: patientIdCounter++, username, password, role: 'user' }); // Guarda un usuario simple
    res.status(201).json({ message: 'Usuario registrado exitosamente' }); // 201 Created
  }
});

// -------------------------------------------------------------------------------------
// NUEVAS RUTAS DE PACIENTES (usando el array en memoria)
// -------------------------------------------------------------------------------------

// Ruta para registrar un nuevo paciente (POST /api/patients)
app.post('/api/patients', (req, res) => {
  try {
    const { name, age, gender, contact } = req.body;

    // Validación básica de datos (puedes añadir más)
    if (!name || !age) {
      return res.status(400).json({ message: 'Nombre y edad del paciente son requeridos.' });
    }
    if (isNaN(parseInt(age))) {
      return res.status(400).json({ message: 'La edad debe ser un número válido.' });
    }

    // Crea un "objeto paciente" con un ID único y la fecha de registro
    const newPatient = {
      _id: `patient_${patientIdCounter++}`, // Simula un ID de base de datos
      name,
      age: parseInt(age),
      gender: gender || 'Otro',
      contact: contact || { phone: '', email: '' },
      registeredAt: new Date().toISOString() // Fecha actual en formato ISO
    };

    // "Guarda" el paciente en el array en memoria
    patients.push(newPatient);
    console.log('Paciente registrado (en memoria):', newPatient);

    // Envía una respuesta de éxito con los datos del paciente "guardado"
    res.status(201).json({
      message: 'Paciente registrado exitosamente',
      patient: newPatient // Devuelve el paciente, que incluye su _id
    });
  } catch (error) {
    console.error('Error al registrar paciente:', error);
    res.status(500).json({ message: 'Error interno del servidor al registrar paciente' });
  }
});

// Ruta para obtener todos los pacientes (GET /api/patients)
app.get('/api/patients', (req, res) => {
  try {
    // Devuelve todos los pacientes del array en memoria
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener pacientes' });
  }
});

// Inicia el servidor de Express
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
  console.log(`URL del API para el frontend: ${process.env.REACT_APP_API_URL || 'No definida en entorno del backend'}`);
});