const { Builder, By, until } = require('selenium-webdriver');

(async function testLogin() {
    // Inicializar el controlador para Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de inicio de Next.js
        await driver.get('http://localhost:3000'); // Cambia la URL según tu configuración

        // Esperar a que el botón "Iniciar Sesión" esté visible
        await driver.wait(until.elementLocated(By.css('button')), 5000);

        // Hacer clic en el botón "Iniciar Sesión"
        const loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        // Verificar la redirección a "/home"
        await driver.wait(until.urlIs('http://localhost:3000/home'), 5000);

        // Esperar a que el botón "Entrenador" esté visible. Se puede hacer usando la clase del botón o el texto "Entrenador".
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Entrenador']")), 5000);

        // Hacer clic en el botón "Entrenador"
        const entrenadorButton = await driver.findElement(By.xpath("//*[text()='Entrenador']"));
        await entrenadorButton.click();

        // Esperar a que el botón "Registrar Partido" esté visible utilizando el aria-label
        await driver.wait(until.elementLocated(By.css('[aria-label="Registrar partido"]')), 5000);

        // Hacer clic en el botón "Registrar partido"
        const registrarPartidoButton = await driver.findElement(By.css('[aria-label="Registrar partido"]'));
        await registrarPartidoButton.click();

        await driver.sleep(2000);

        // Esperar a que el botón "Estadísticas" esté visible
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Estadísticas']")), 5000);

        // Hacer clic en el botón "Estadísticas"
        const estadisticasButton = await driver.findElement(By.xpath("(//button[text()='Estadísticas'])[2]"));
        await estadisticasButton.click();

        await driver.sleep(2000);

        // Esperar a que el botón "SISTEMA DE JUEGO" esté visible utilizando su id
        const jugadoresButton = await driver.wait(until.elementLocated(By.id('radix-:r0:-trigger-jugadores')), 5000);
        
        // Hacer clic en el botón si se encuentra
        if (jugadoresButton) {
            await jugadoresButton.click(); // Hacer clic en el botón
            await driver.sleep(2000);
            console.log("Test logrado: El botón 'JUGADORES' fue encontrado y clickeado.");
            console.log('Prueba exitosa: PBI 16 realizada');
        } else {
            console.log("El botón 'JUGADORES'' no fue encontrado.");
        }


    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
