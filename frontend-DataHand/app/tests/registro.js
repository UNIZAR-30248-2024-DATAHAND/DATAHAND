const { Builder, By, until } = require('selenium-webdriver');

(async function testRegisterButton() {
    // Inicializar el controlador para Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de inicio de Next.js
        await driver.get('http://localhost:3000'); // Cambia la URL según tu configuración

        // Esperar a que el botón "Registrarse" esté visible
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Registrarse')]")), 5000);

        // Hacer clic en el botón "Registrarse"
        const registerButton = await driver.findElement(By.xpath("//button[contains(text(), 'Registrarse')]"));
        await registerButton.click();

        // Verificar la redirección a "/register-user"
        await driver.wait(until.urlIs('http://localhost:3000/register-user'), 5000);

        // Completar el campo de nombre
        await driver.findElement(By.css('input[name="firstName"]')).sendKeys('John');

        // Completar el campo de apellido
        await driver.findElement(By.css('input[name="lastName"]')).sendKeys('Doe');

        // Completar el campo de correo electrónico
        await driver.findElement(By.css('input[name="email"]')).sendKeys('johndoe@example.com');

        // Completar el campo de fecha de nacimiento
        await driver.findElement(By.css('input[name="birthDate"]')).sendKeys('1990-01-01');

        // Completar el campo de contraseña
        await driver.findElement(By.css('input[name="password"]')).sendKeys('password123');

        // Completar el campo de confirmación de contraseña
        await driver.findElement(By.css('input[name="confirmPassword"]')).sendKeys('password123');

        // Cambiar el tipo de usuario a "Jugador" (checkbox)
        const checkbox = await driver.findElement(By.css('input[type="checkbox"]'));
        if (!await checkbox.isSelected()) {
            await checkbox.click();
        }

        // Completar el campo de país
        await driver.findElement(By.css('input[name="country"]')).sendKeys('España');

        // Seleccionar la posición solo si el tipo de usuario es "Jugador"
        await driver.findElement(By.css('select[name="position"]')).sendKeys('EI');

        // Enviar el formulario
        await driver.findElement(By.css('button[type="submit"]')).click();

        console.log('Prueba exitosa: Registro correcto.');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
