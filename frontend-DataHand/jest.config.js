module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Procesa archivos .js y .jsx con Babel
        "^.+\\.js$": "babel-jest", // Asegúrate de que babel-jest procese todos los archivos JS
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "@testing-library/jest-dom",
        "<rootDir>/jest.setup.js",
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    globals: {
        __DEV__: true,
    },
    collectCoverage: true, // Activa la cobertura de código
    coverageDirectory: "coverage", // Define el directorio donde se guardará el reporte de cobertura
    coverageReporters: ["text", "html"], // Define el formato de los reportes (texto en consola y HTML)
};
