// En lugar de usar "import", usa "require"
const fetch = require('node-fetch');
const React = require('react'); // Este require será global en tus pruebas

// Configurar fetch globalmente para el entorno de pruebas
global.fetch = fetch;
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
process.env.SUPPRESS_JEST_WARNINGS = 'true';

// Para tests de Jest con canvas
import 'jest-canvas-mock';

