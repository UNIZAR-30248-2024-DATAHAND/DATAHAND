const { Builder, By, until } = require('selenium-webdriver');

(async function testLogin() {
    // Inicializar el controlador para Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de edición de perfil (ajustar la URL según sea necesario)
        await driver.get('http://localhost:3000/editProfile/10'); // Cambia la URL según tu configuración

        // Verificar que la cabecera "EDITAR PERFIL ENTRENADOR" o "EDITAR PERFIL JUGADOR" esté presente
        const header = await driver.wait(until.elementLocated(By.xpath("//h1[contains(@class, 'titulo-personalizado')]")), 5000);
        const headerText = await header.getText();

        if (headerText.includes('EDITAR PERFIL ENTRENADOR')) {
            console.log('Cabecera verificada correctamente: EDITAR PERFIL ENTRENADOR');
        } else if (headerText.includes('EDITAR PERFIL JUGADOR')) {
            console.log('Cabecera verificada correctamente: EDITAR PERFIL JUGADOR');
        } else {
            console.error('Cabecera no encontrada. Texto encontrado:', headerText);
        }

        // Esperar a que el campo "nombreCompleto" esté visible (ajustar el selector según sea necesario)
        const nombreCompletoInput = await driver.wait(until.elementLocated(By.id('nombreCompleto')), 5000); // Reemplaza 'nombreCompleto' por el ID correcto

        // Borrar el valor existente (si es necesario) y escribir el nuevo valor
        await nombreCompletoInput.clear(); // Limpiar el campo
        await nombreCompletoInput.sendKeys('Jaime Chuletaa'); // Escribir el nuevo valor

        // Esperar a que el botón "Guardar Cambios" esté visible y luego hacer clic
        const guardarButton = await driver.wait(until.elementLocated(By.css('input[type="submit"][value="Guardar Cambios"]')), 5000);
        await guardarButton.click(); // Hacer clic en el botón "Guardar Cambios"

        console.log("Editar perfil correcto.");
        await driver.sleep(2000);

    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
