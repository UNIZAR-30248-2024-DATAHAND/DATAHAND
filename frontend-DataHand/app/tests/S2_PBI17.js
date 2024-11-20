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

        const editarPerfilButton = await driver.findElement(By.xpath("//button[.//img[@alt='Editar perfil']]"));
        await editarPerfilButton.click();

        await driver.sleep(2000);

        // Esperar a que el campo "nombreCompleto" esté visible
        const nombreCompletoInput = await driver.wait(until.elementLocated(By.id('nombreCompleto')), 5000);

        // Borrar el valor existente (si es necesario) y escribir el nuevo valor
        await nombreCompletoInput.clear(); // Limpiar el campo
        await nombreCompletoInput.sendKeys('Jaime Chuletaa'); // Escribir el nuevo valor
        
        // Esperar a que el botón "Guardar Cambios" esté visible y luego hacer clic
        const guardarButton = await driver.wait(until.elementLocated(By.css('input[type="submit"][value="Guardar Cambios"]')), 5000);
        await guardarButton.click(); // Hacer clic en el botón "Guardar Cambios"

        console.log("PBI17 exitosamente.");
        await driver.sleep(2000);


    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
