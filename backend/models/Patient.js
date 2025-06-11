// backend/models/Patient.js

const mongoose = require('mongoose');

// Define el esquema para los pacientes
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], default: 'Otro' },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  registeredAt: { type: Date, default: Date.now }
});

// Crea el modelo Patient a partir del esquema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
