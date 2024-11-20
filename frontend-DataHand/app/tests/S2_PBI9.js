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

        await driver.sleep(2000);

        // Esperar a que el botón "Ver" esté visible
        const verButton = await driver.wait(until.elementLocated(By.css('button.bg-green-500.text-white.px-4.py-2.rounded')), 5000);

        // Hacer clic en el botón "Ver"
        await verButton.click();

        await driver.sleep(2000);

        // Esperar a que el botón esté visible
        const vistaGeneralButton = await driver.wait(until.elementLocated(By.id('radix-:r0:-trigger-vista-general')), 5000);
        
        // Hacer clic en el botón si se encuentra
        if (vistaGeneralButton) {
            console.log("Test logrado: El botón ver fue pulsado.");
            console.log('Prueba exitosa: PBI 9 realizada');
        } else {
            console.log("El botón ver no fue encontrado.");
        }


    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
