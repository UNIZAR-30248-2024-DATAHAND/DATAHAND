describe('Login Page Tests', () => {
  it('should navigate to /home when clicking the login button', () => {
    // Visita la página de inicio de sesión
    cy.visit('http://localhost:3000/');

    // Verifica que el botón de "Iniciar Sesión" está visible
    cy.contains('button', 'Iniciar Sesión').should('be.visible');

    // Haz clic en el botón
    cy.contains('button', 'Iniciar Sesión').click();

    // Verifica que la URL cambió a /home
    cy.url().should('include', '/home');
  });
});
