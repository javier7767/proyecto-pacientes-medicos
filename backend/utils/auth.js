// backend/utils/auth.js

/**
 * Simula la lógica de autenticación de un usuario.
 * @param {string} username - El nombre de usuario.
 * @param {string} password - La contraseña.
 * @param {string} role - El rol del usuario ('user' o 'admin').
 * @returns {object|null} Un objeto con un mensaje y token si las credenciales son válidas, de lo contrario null.
 */
function loginUser(username, password, role) {
  if (username === 'testuser' && password === 'password123' && role === 'user') {
    return { message: 'Login exitoso', token: 'fake-jwt-token-for-user' };
  } else if (username === 'admin' && password === 'admin123' && role === 'admin') {
    return { message: 'Login de administrador exitoso', token: 'fake-jwt-token-for-admin' };
  }
  return null; // Credenciales inválidas
}

/**
 * Simula la lógica de registro de un nuevo usuario.
 * @param {string} username - El nombre de usuario a registrar.
 * @param {string} password - La contraseña a registrar.
 * @returns {object|null} Un objeto con un mensaje de éxito, o null si el usuario ya existe o los datos son inválidos.
 */
function registerUser(username, password) {
  // Aquí iría la lógica real para guardar en la base de datos y verificar si el usuario ya existe.
  // Por ahora, simulamos un usuario existente y validación básica.
  if (username === 'existinguser') {
    return { success: false, message: 'El usuario ya existe' };
  } else if (!username || !password) {
    return { success: false, message: 'Usuario y contraseña son requeridos' };
  }
  return { success: true, message: 'Usuario registrado exitosamente' };
}

module.exports = {
  loginUser,
  registerUser
};
