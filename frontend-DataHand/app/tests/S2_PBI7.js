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

        // Hacer clic en el botón "Iniciar Sesión"
        const loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Verificar la redirección a "/home"
        await driver.wait(until.urlIs('http://localhost:3000/home'), 5000);

        // Esperar a que el botón "Entrenador" esté visible
        const coachButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Entrenador')]")), // Selector por texto
            5000
        );

        // Hacer clic en el botón "Entrenador"
        await coachButton.click();

        // Verificar la redirección al perfil de entrenador
        await driver.wait(until.urlIs('http://localhost:3000/profile/1'), 5000);

        // Esperar a que el botón para activar el sidebar esté visible
        const toggleSidebarButton = await driver.wait(
            until.elementLocated(By.xpath("//div[.//img[@src='/images/icon_right_arrow.svg']]")), // Selector por el atributo src
            5000
        );

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Esperar a que el botón con la imagen "Registrar partido" esté visible
        const registrarPartidoButton = await driver.wait(
            until.elementLocated(By.xpath("//img[@src='/images/icon_plus.svg' and @alt='Registrar partido']")), // Localiza la imagen con alt="Registrar partido"
            5000
        );

        // Hacer clic en el botón que contiene la imagen
        await registrarPartidoButton.click();

        // Esperar 5 segundo
        await driver.sleep(5000);

        // Esperar a que el botón "Iniciar" esté visible
        const iniciarButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Iniciar')]")), // Buscar el botón por el texto
            5000
        );

        // Esperar hasta que la imagen con el alt 'Toggle Sidebar' esté visible
        const buttonTool = await driver.wait(
            until.elementLocated(By.xpath("//img[@alt='Toggle Sidebar']")),
            5000
        );

        // Esperar a que el botón sea visible
        await driver.wait(until.elementIsVisible(buttonTool), 5000);

        // Hacer clic en el botón encontrado
        await buttonTool.click();

        console.log('Botón con "Toggle Sidebar" ha sido encontrado y clickeado correctamente.');

        // Hacer clic en el botón "Iniciar"
        await iniciarButton.click();

        // Esperar 5 segundo
        await driver.sleep(5000);

        // Esperar hasta que el botón que contenga 'Jugador' esté visible
        const button = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Jugador')]")),
            5000
        );

        // Esperar a que el botón sea visible
        await driver.wait(until.elementIsVisible(button), 5000);
    
        // Hacer clic en el botón encontrado
        await button.click();

        console.log('Botón "Jugador 1" encontrado y clickeado correctamente.');
        console.log('Se hizo clic en el botón "Jugador 1" correctamente.');

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Esperar a que el botón "Ataque Posicional" esté visible
        const ataquePosicionalButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Ataque Posicional')]")), // Buscar el botón por el texto
            5000
        );

        // Hacer clic en el botón "Ataque Posicional"
        await ataquePosicionalButton.click();

        console.log('Se hizo clic en el botón "Ataque Posicional" correctamente.');

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Esperar a que el botón "Falta" esté visible
        const faltaButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Falta')]")), // Buscar el botón por el texto
            5000
        );

        // Hacer clic en el botón "Falta"
        await faltaButton.click();

        console.log('Se hizo clic en el botón "Falta" correctamente.');

        // Esperar 5 segundo
        await driver.sleep(5000);

        // Localizar la fila de la tabla que contiene "2" en la primera columna y "Falta" en la segunda
        const tableRow = await driver.wait(
            until.elementLocated(By.xpath("//tr[td[text()='1'] and td[text()='Falta']]")),
            5000
        );

        // Verificar que la fila contiene las celdas correctas
        const cell1 = await tableRow.findElement(By.xpath("./td[1]")); // Primera celda (con el número 2)
        const cell2 = await tableRow.findElement(By.xpath("./td[2]")); // Segunda celda (con la palabra "Falta")
        
        // Obtener el texto de ambas celdas
        const cell1Text = await cell1.getText();
        const cell2Text = await cell2.getText();

        // Verificar que el contenido de las celdas es el esperado
        if (cell1Text === '1' && cell2Text === 'Falta') {
            console.log('La entrada "1" y "Falta" se encontraron correctamente en la tabla.');
        } else {
            console.error('La entrada esperada no coincide. Encontrado:', cell1Text, cell2Text);
        }

        console.log('Prueba exitosa: Se añade un evento y se observa en la tabla de forma correcta.');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
