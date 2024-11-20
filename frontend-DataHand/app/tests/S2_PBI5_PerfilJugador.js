const { Builder, By, until } = require('selenium-webdriver');

(async function testPlayerProfile() {
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

        // Esperar a que el botón "jugador" esté visible
        const playerButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Jugador')]")), // Selector por texto
            5000
        );

        // Hacer clic en el botón "jugador"
        await playerButton.click();

        // Verificar la redirección al perfil de jugador
        await driver.wait(until.urlIs('http://localhost:3000/profile/2'), 5000);

        // Esperar a que el botón para activar el sidebar esté visible
        const toggleSidebarButton = await driver.wait(
            until.elementLocated(By.xpath("//div[.//img[@src='/images/icon_right_arrow.svg']]")), // Selector por el atributo src
            5000
        );

        // Esperar 1 segundo
        await driver.sleep(1000);

        // Hacer clic en el botón de toggle para mostrar el sidebar
        await toggleSidebarButton.click();

        // Verificar que la cabecera "Perfil jugador" esté presente
        const header = await driver.wait(
            until.elementLocated(By.css('h1.text-5xl.font-bold.mb-4.text-white')),
            5000
        );
        const headerText = await header.getText();
        if (headerText === 'Perfil Jugador') {
            console.log('Cabecera "Perfil Jugador" verificada correctamente.');
        } else {
            console.error('La cabecera no es la esperada. Se encontró: ' + headerText);
        }

        // Verificar que el div con "Partido-82" y los botones esté presente
        const partidoElement = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-82')]")),
            5000
        );

        // Verificar que el texto sea "Partido-82"
        const partidoText = await partidoElement.getText();
        if (partidoText === 'Partido-82') {
            console.log('El div con "Partido-82" está presente en la página.');
        } else {
            console.error('No se encontró el partido esperado. Se encontró: ' + partidoText);
        }

        // Verificar que el botón "Ver" esté presente
        const buttonVer = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class, 'flex justify-between items-center p-2 border-b border-gray-400 mb-2 bg-gray-300 rounded')]//p[contains(text(), 'Partido-82')]/following-sibling::div//button[contains(text(), 'Ver')]")),
            5000
        );

        console.log('El botón "Ver" está presente para "Partido-82".');

        console.log('Prueba exitosa: Perfil jugador con historial de partidos.');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
