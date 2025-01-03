const { Builder, By, until } = require('selenium-webdriver');

(async function testCoachProfile() {
    // Inicializar el controlador para Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de inicio de Next.js
        await driver.get('http://localhost:3000'); // Cambia la URL según tu configuración

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Esperar a que el botón "Iniciar Sesión" esté visible
        await driver.wait(until.elementLocated(By.css('button')), 5000);

        // Espera hasta que los campos estén disponibles
        await driver.wait(until.elementLocated(By.css('input[placeholder="Correo electrónico"]')), 10000);

        // Localiza el campo de correo electrónico por el atributo placeholder y escribe el correo
        await driver.findElement(By.css('input[placeholder="Correo electrónico"]')).sendKeys('carlos.perez@example.com');

        // Localiza el campo de contraseña por el atributo placeholder y escribe la contraseña
        await driver.findElement(By.css('input[placeholder="Contraseña"]')).sendKeys('1234ab');

        // Localiza el botón de envío por su clase y haz clic en él
        const loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Verificar la redirección al perfil de entrenador
        await driver.wait(until.urlIs('http://localhost:3000/profile/1'), 5000);

        // Esperar a que el botón para activar el sidebar esté visible
        const toggleSidebarButton = await driver.wait(
            until.elementLocated(By.xpath("//div[.//img[@src='/images/icon_right_arrow.svg']]")), // Selector por el atributo src
            5000
        );

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Hacer clic en el botón de toggle para mostrar el sidebar
        await toggleSidebarButton.click();

        // Verificar que el div con "Partido-81" y los botones esté presente
        const partidoElement = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-100')]")),
            5000
        );

        // Verificar que el texto sea "Partido-81"
        const partidoText = await partidoElement.getText();
        if (partidoText === 'Partido-100') {
            console.log('El div con "Partido-81" está presente en la página.');
        } else {
            console.error('No se encontró el partido esperado. Se encontró: ' + partidoText);
        }

        // Verificar que los botones estén presentes (Editar, Borrar, Ver)
        const buttons = await driver.findElements(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-100')]/following-sibling::div//button"));
        if (buttons.length === 3) {
            console.log('Los tres botones (Editar, Borrar, Ver) están presentes para "Partido-100".');
        } else {
            console.error('No se encontraron los tres botones. Número de botones encontrados: ' + buttons.length);
        }

        console.log('Prueba exitosa: Perfil entrenador con historial de partidos');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
