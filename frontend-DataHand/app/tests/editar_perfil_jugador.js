const { Builder, By, until } = require('selenium-webdriver');

(async function testPlayerProfile() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abrir la página de inicio de Next.js
        await driver.get('http://localhost:3000'); // Cambia la URL según tu configuración

        // Espera hasta que los campos estén disponibles
        await driver.wait(until.elementLocated(By.css('input[placeholder="Correo electrónico"]')), 10000);

        // Localiza el campo de correo electrónico por el atributo placeholder y escribe el correo
        await driver.findElement(By.css('input[placeholder="Correo electrónico"]')).sendKeys('juan.lopez@example.com');

        // Localiza el campo de contraseña por el atributo placeholder y escribe la contraseña
        await driver.findElement(By.css('input[placeholder="Contraseña"]')).sendKeys('password123');

        // Esperar a que el botón "Iniciar Sesión" esté visible
        await driver.wait(until.elementLocated(By.css('button')), 5000);

        // Hacer clic en el botón "Iniciar Sesión"
        const loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        // Verificar que el texto 'PERFIL JUGADOR' está presente
        const perfilTitle = await driver.wait(
            until.elementLocated(By.css('h1 span span.letters')),
            10000 // Incrementa el tiempo de espera
        );
        const titleText = await perfilTitle.getText();
        if (titleText.includes('PERFIL JUGADOR')) {
            console.log('Título del perfil verificado correctamente: PERFIL JUGADOR');
        } else {
            console.error('El título del perfil es incorrecto. Texto encontrado:', titleText);
        }

        // Verificar la información del jugador (nombre completo)
        const playerInfoContainer = await driver.wait(
            until.elementLocated(By.xpath("//p[contains(@class, 'font-semibold') and contains(@class, 'text-orange-500')]")),
            5000
        );
        const name = await playerInfoContainer.getText();
        console.log('Contenido de name:', name);

        if (name === 'Carlos Pérez') {
            console.log('Información del jugador verificada correctamente.');
        } else {
            console.error('La información del jugador es incorrecta. Nombre encontrado:', name);
        }

        // Buscar y hacer clic en el botón de la sidebar (se puede identificar por su clase, id o texto)
        const sidebarButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Editar perfil')]")), // Usa el texto del botón de editar
            5000
        );
        await sidebarButton.click();

        console.log('Botón "Editar perfil" clickeado');

        // Verificar si la página de edición de perfil se ha abierto correctamente
        const editProfileTitle = await driver.wait(
            until.elementLocated(By.xpath("//h1[contains(text(), 'Editar Perfil')]")),
            5000 // Tiempo de espera hasta que aparezca el título de la página de edición
        );
        const editProfileText = await editProfileTitle.getText();
        if (editProfileText === 'Editar Perfil') {
            console.log('Página de edición de perfil abierta correctamente');
        } else {
            console.error('No se ha abierto la página de edición de perfil. Texto encontrado:', editProfileText);
        }

        console.log('Prueba exitosa: Perfil del jugador y la edición verificada');
    } catch (error) {
        console.error('Prueba fallida:', error);
    } finally {
        await driver.quit();
    }
})();
