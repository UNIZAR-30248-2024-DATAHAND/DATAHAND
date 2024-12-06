const { exec } = require("child_process");

const tests = [
  "../test/unit/apartados_estadisticas.test.js",
  "../test/unit/crear_partido.test.js",
  "../test/unit/editar_perfil.test.js",
  "../test/unit/estadisticas.test.js",
  "../test/unit/gestion_tiempo.test.js",
  "../test/unit/historico_partidos.test.js",
  "../test/unit/inicio.test.js",
  "../test/unit/pagina_profile.test.js"
];

tests.forEach((test) => {
  exec(`npx jest ${test}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error ejecutando ${test}:\n`, stderr);
    } else {
      console.log(`Resultados de ${test}:\n`, stdout);
    }
  });
});
