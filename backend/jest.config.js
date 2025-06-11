    // backend/jest.config.js

    module.exports = {
      // Directorios donde Jest buscará archivos de prueba
      testMatch: [
        "<rootDir>/tests/**/*.test.js", // Busca archivos .test.js dentro de la carpeta 'tests'
      ],
      // Directorios que Jest debe ignorar (para no procesar node_modules)
      testPathIgnorePatterns: [
        "/node_modules/",
      ],
      // Recopilar información de cobertura de código
      collectCoverage: true,
      // Directorios de los cuales recopilar cobertura (todo el código en 'utils' por ejemplo)
      collectCoverageFrom: [
        "utils/**/*.js", // Asegúrate de que esto coincide con la ubicación de tus archivos a probar
      ],
      // Umbral mínimo de cobertura (opcional, pero recomendado para CI)
      // Si la cobertura cae por debajo de estos porcentajes, las pruebas fallarán
      coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    };
    