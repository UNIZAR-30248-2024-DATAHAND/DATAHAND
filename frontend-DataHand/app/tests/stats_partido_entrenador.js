const { Builder, By, until } = require('selenium-webdriver');

(async function testPlayerProfile() {
    // Inicializar el controlador para Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de inicio de Next.js
        await driver.get('http://localhost:3000'); // Cambia la URL según tu configuración

        // Espera hasta que los campos estén disponibles
        await driver.wait(until.elementLocated(By.css('input[placeholder="Correo electrónico"]')), 10000);

        // Localiza el campo de correo electrónico por el atributo placeholder y escribe el correo
        await driver.findElement(By.css('input[placeholder="Correo electrónico"]')).sendKeys('carlos.perez@example.com');

        // Localiza el campo de contraseña por el atributo placeholder y escribe la contraseña
        await driver.findElement(By.css('input[placeholder="Contraseña"]')).sendKeys('1234ab');

        // Esperar a que el botón "Iniciar Sesión" esté visible
        await driver.wait(until.elementLocated(By.css('button')), 5000);

        // Hacer clic en el botón "Iniciar Sesión"
        const loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        // Verificar que el texto 'PERFIL JUGADOR' está presente
        const perfilTitle = await driver.wait(
            until.elementLocated(By.css('h1 span span.letters')),
            10000 // Incrementa el tiempo de espera
        );
        const titleText = await perfilTitle.getText();
        if (titleText.includes('PERFIL ENTRENADOR')) {
            console.log('Título del perfil verificado correctamente: PERFIL ENTRENADOR');
        } else {
            console.error('El título del perfil es incorrecto. Texto encontrado:', titleText);
        }

        // Verificar que el div con "Partido-100" y los botones esté presente
        const partidoElement = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-100')]")),
            5000
        );

        // Verificar que el texto sea "Partido-100"
        const partidoText = await partidoElement.getText();
        if (partidoText === 'Partido-100') {
            console.log('El div con "Partido-100" está presente en la página.');
        } else {
            console.error('No se encontró el partido esperado. Se encontró: ' + partidoText);
        }

        // Verificar que el botón "Ver" esté presente
        const buttonVer = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-100')]/following-sibling::div//button[contains(text(), 'Ver')]")),
            5000
        );

        console.log('El botón "Ver" está presente para "Partido-100".');

        // Hacer clic en el botón "Ver"
        await buttonVer.click();


        await driver.wait(until.urlIs('http://localhost:3000/statsGen/Partido-100'), 5000);

        console.log('Prueba completada.');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
