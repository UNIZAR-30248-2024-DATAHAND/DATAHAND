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

        // Hacer clic en el botón de toggle para mostrar el sidebar
        await toggleSidebarButton.click();

        // Verificar que la cabecera "Perfil Entrenador" esté presente
        const header = await driver.wait(
            until.elementLocated(By.css('h1.text-5xl.font-bold.mb-4.text-white')),
            5000
        );
        const headerText = await header.getText();
        if (headerText === 'Perfil Entrenador') {
            console.log('Cabecera "Perfil Entrenador" verificada correctamente.');
        } else {
            console.error('La cabecera no es la esperada. Se encontró: ' + headerText);
        }

        // Verificar la cabecera "Estadísticas"
        const statsHeader = await driver.wait(
            until.elementLocated(By.css('h2.text-3xl.font-semibold.text-orange-500')),  // Selector CSS para el h2
            5000
        );
        const statsHeaderText = await statsHeader.getText();

        // Verificar que el texto del encabezado sea "Estadísticas"
        if (statsHeaderText === 'Estadísticas') {
            console.log('Cabecera "Estadísticas" verificada correctamente.');
        } else {
            console.error('La cabecera "Estadísticas" no es la esperada. Se encontró:', statsHeaderText);
        }

        console.log('Prueba exitosa: Perfil del entrenador y sección de estadísticas verificada');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
