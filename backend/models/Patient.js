const mongoose = require('mongoose');

// Define el esquema (estructura) de un paciente
const patientSchema = new mongoose.Schema({
  // Nombre del paciente (requerido)
  name: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio/fin
  },
  // Edad del paciente (requerido)
  age: {
    type: Number,
    required: true,
    min: 0 // La edad no puede ser negativa
  },
  // Género del paciente
  gender: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'], // Solo permite estos valores
    default: 'Otro'
  },
  // Información de contacto del paciente
  contact: {
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true, // Guarda el email en minúsculas
      // Validación básica de formato de email (opcional)
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un email válido']
    }
  },
  // Fecha de registro del paciente (se genera automáticamente)
  registeredAt: {
    type: Date,
    default: Date.now // Establece la fecha actual por defecto
  }
});

// Crea el modelo Patient a partir del esquema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient; // Exporta el modelo para usarlo en server.js