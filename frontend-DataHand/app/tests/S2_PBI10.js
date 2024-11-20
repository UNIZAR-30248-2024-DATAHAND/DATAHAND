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

        // Esperar a que el botón "Editar" esté visible
        const editarButton = await driver.wait(until.elementLocated(By.css('button.bg-blue-500.text-white.px-4.py-2.rounded')), 5000);

        // Hacer clic en el botón "Editar"
        await editarButton.click();

        await driver.sleep(2000);

        // Esperar a que el elemento <h1> esté visible
        const h1Element = await driver.wait(until.elementLocated(By.css('h1.text-5xl.font-bold.mb-4.text-black')), 5000);

        // Verificar si el <h1> es visible
        const isVisible = await h1Element.isDisplayed();

        if (isVisible) {
            // Si el h1 es visible, obtener el texto y hacer log
            const h1Text = await h1Element.getText();
            console.log('Prueba exitosa: PBI 10 realizada');
        } else {
            console.log('El elemento <h1> no está visible');
        }

    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
