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

        // Esperar a que el botón "Borrar" esté visible
        const borrarButton = await driver.wait(until.elementLocated(By.css('button.bg-red-500.text-white.px-4.py-2.rounded')), 5000);

        // Hacer clic en el botón "Borrar"
        await borrarButton.click();

        await driver.sleep(2000);

        // Esperar y verificar si aparece una alerta
        await driver.wait(until.alertIsPresent(), 5000); // Espera a que la alerta aparezca

        // Cambiar el foco a la alerta y obtener el texto de la alerta
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText(); // Obtener el texto de la alerta
        console.log('Texto de la alerta:', alertText);

        // Aceptar la alerta (si es necesario)
        await alert.dismiss(); // También puedes usar `alert.dismiss()` para rechazarla

        console.log('Prueba exitosa: PBI 11 realizada');


    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
