// backend/tests/auth.test.js

// Importa las funciones a probar desde su ubicación CORRECTA
const { loginUser, registerUser } = require('../utils/auth');

describe('Auth Utility - loginUser', () => {
  test('should return a success message and token for valid user credentials', () => {
    const result = loginUser('testuser', 'password123', 'user');
    expect(result).not.toBeNull();
    expect(result.message).toBe('Login exitoso');
    expect(result.token).toBe('fake-jwt-token-for-user');
  });

  test('should return a success message and token for valid admin credentials', () => {
    const result = loginUser('admin', 'admin123', 'admin');
    expect(result).not.toBeNull();
    expect(result.message).toBe('Login de administrador exitoso');
    expect(result.token).toBe('fake-jwt-token-for-admin');
  });

  test('should return null for invalid credentials', () => {
    const result = loginUser('wronguser', 'wrongpassword', 'user');
    expect(result).toBeNull();
  });

  test('should return null for correct username/password but incorrect role', () => {
    const result = loginUser('testuser', 'password123', 'admin'); // user trying to log in as admin
    expect(result).toBeNull();
  });
});

describe('Auth Utility - registerUser', () => {
  test('should return success for valid new user registration', () => {
    const result = registerUser('newuser', 'newpassword');
    expect(result).toEqual({ success: true, message: 'Usuario registrado exitosamente' });
  });

  test('should return error if username already exists', () => {
    const result = registerUser('existinguser', 'somepassword'); // Mock existing user
    expect(result).toEqual({ success: false, message: 'El usuario ya existe' });
  });

  test('should return error if username is missing', () => {
    const result = registerUser('', 'somepassword');
    expect(result).toEqual({ success: false, message: 'Usuario y contraseña son requeridos' });
  });

  test('should return error if password is missing', () => {
    const result = registerUser('someuser', '');
    expect(result).toEqual({ success: false, message: 'Usuario y contraseña son requeridos' });
  });
});
