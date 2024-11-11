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
};
