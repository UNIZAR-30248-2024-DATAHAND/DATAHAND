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

        // Verificar que la cabecera "Perfil Entrenador" esté presente
        const header = await driver.wait(until.elementLocated(By.xpath("//h1[contains(@class, 'titulo-personalizado')]//span[contains(text(), 'PERFIL ENTRENADOR')]")), 5000);

        const coachInfoContainer = await driver.wait(
            until.elementLocated(By.css('p.text-orange-500')),
            5000  // Tiempo de espera en milisegundos
        );
        const name = await coachInfoContainer.getText();
        

        // Verificar que el nombre del entrenador sea correcto
        if (name === 'Juanjo Ruiz') {
            console.log('Información del entrenador verificada correctamente.');
        } else {
            console.error('La información del entrenador es incorrecta. Nombre encontrado:', name);
        }

        console.log('Prueba exitosa: Perfil del entrenador verificado');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
