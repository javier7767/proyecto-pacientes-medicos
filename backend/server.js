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




// backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importa mongoose para la conexión a MongoDB
const Patient = require('./models/Patient'); // Importa el modelo de paciente de MongoDB
const { loginUser, registerUser } = require('./utils/auth'); // Importa las funciones de autenticación separadas

const app = express();
const port = process.env.PORT || 5001;

// Configuración de CORS: Permite todas las peticiones (para depuración en Docker)
// ¡ADVERTENCIA! No usar esto en producción, es solo para desarrollo/depuración.
app.use(cors());

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Conexión a MongoDB
// Usa 'mongodb' como host si estás en Docker Compose, 'localhost' si ejecutas el backend fuera de Docker
const mongoDbUri = process.env.NODE_ENV_DB === 'docker' ? 'mongodb://mongodb:27017/pacientes_db' : 'mongodb://localhost:27017/pacientes_db';

mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB de forma exitosa'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// -------------------------------------------------------------------------------------
// RUTAS DE AUTENTICACIÓN (Login y Registro) - Usan las funciones de 'utils/auth.js'
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

  const result = loginUser(username, password, role); // Utiliza la función de loginUser

  if (result) {
    res.status(200).json(result); // Si el login es exitoso, devuelve el mensaje y token
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' }); // Si no, devuelve error 401
  }
});

// Maneja las peticiones POST para el registro
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Intento de registro: Usuario=${username}, Contraseña=${password}`);

  const result = registerUser(username, password); // Utiliza la función de registerUser

  if (result.success) {
    res.status(201).json({ message: result.message }); // Si el registro es exitoso
  } else {
    // Maneja los errores específicos devueltos por registerUser
    if (result.message === 'El usuario ya existe') {
      res.status(409).json({ message: result.message });
    } else if (result.message === 'Usuario y contraseña son requeridos') {
      res.status(400).json({ message: result.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor durante el registro' });
    }
  }
});

// -------------------------------------------------------------------------------------
// RUTAS DE PACIENTES (usando MongoDB)
// -------------------------------------------------------------------------------------

// Ruta para registrar un nuevo paciente (POST /api/patients)
app.post('/api/patients', async (req, res) => {
  try {
    const { name, age, gender, contact } = req.body;

    // Validación básica de datos (puedes añadir más)
    if (!name || !age || isNaN(parseInt(age))) {
      return res.status(400).json({ message: 'Nombre y edad válidos del paciente son requeridos.' });
    }

    // Crea una nueva instancia del modelo Patient de Mongoose
    const newPatient = new Patient({
      name,
      age: parseInt(age),
      gender: gender || 'Otro', // Valor por defecto si no se proporciona
      contact: contact || { phone: '', email: '' }, // Objeto por defecto si no se proporciona
      registeredAt: new Date() // Mongoose guardará esto como un tipo Date
    });

    // Guarda el paciente en la base de datos MongoDB
    const savedPatient = await newPatient.save();
    console.log('Paciente registrado en MongoDB:', savedPatient);

    // Envía una respuesta de éxito con los datos del paciente guardado
    res.status(201).json({
      message: 'Paciente registrado exitosamente',
      patient: savedPatient
    });
  } catch (error) {
    console.error('Error al registrar paciente en MongoDB:', error);
    // Manejo de errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error interno del servidor al registrar paciente' });
  }
});

// Ruta para obtener todos los pacientes (GET /api/patients)
app.get('/api/patients', async (req, res) => {
  try {
    // Obtiene todos los pacientes de la base de datos MongoDB
    const patientsFromDb = await Patient.find({});
    res.status(200).json(patientsFromDb);
  } catch (error) {
    console.error('Error al obtener pacientes de MongoDB:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener pacientes' });
  }
});

// Inicia el servidor de Express
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
  console.log(`URL del API para el frontend: ${process.env.REACT_APP_API_URL || 'No definida en entorno del backend'}`);
});
