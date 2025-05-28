const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001; // Usa process.env.PORT para flexibilidad en Docker

app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita el parsing de JSON para las peticiones

app.get('/', (req, res) => {
  res.send('¡Hola desde el Backend de Node.js!');
});

app.get('/api/saludo', (req, res) => {
  res.json({ message: '¡Saludos desde el API del Backend!' });
});

app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
  console.log(`URL del API para el frontend: ${process.env.REACT_APP_API_URL}`);
}); 
