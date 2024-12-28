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

        // Verificar el encabezado "Media de estadísticas por partido" usando XPath
        const statsHeader = await driver.wait(
            until.elementLocated(By.xpath("//h2[contains(@class, 'text-[4vw]') and contains(@class, 'sm:text-2xl') and contains(@class, 'font-semibold') and contains(@class, 'text-orange-500')]")),
            5000 // Espera hasta que el encabezado esté disponible
        );
        const statsHeaderText = await statsHeader.getText();

        // Verificar que el texto sea "Media de estadísticas por partido"
        if (statsHeaderText === 'Media de estadísticas por partido') {
            console.log('Encabezado verificado correctamente: Media de estadísticas por partido');
        } else {
            console.error('El encabezado es incorrecto. Texto encontrado:', statsHeaderText);
        }

        console.log('Prueba exitosa: Perfil del entrenador y sección de estadísticas verificada');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
