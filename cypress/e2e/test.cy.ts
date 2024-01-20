require('cypress-drag-drop');

describe('Application', () => {
  beforeEach(() => {
    let email = 'qqq@qqq.qqq';
    let password = 'qqq111';
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid=email]').type(`${email}`);
    cy.get('[data-testid=password]').type(`${password}{enter}`);
    cy.intercept('GET', 'ingredients', {fixture: "ingredients.json"})
    cy.intercept('POST', 'auth/login', {fixture: "login.json"}).as('postLogin')
    cy.viewport(1980, 1080);
    
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken')
  })

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('should login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid=email]').type(`${'qqq@qqq.qqq'}`);
    cy.get('[data-testid=password]').type(`${'qqq111'}{enter}`);
  })

  it('should open detail and close', () => {
    cy.get('[data-testid=ingredient]').first().click();
    cy.get('[data-testid=close-modal]').should('exist').should('be.visible').click();
  })

  it('should dnd', () => {
    cy.get('[data-testid=ingredient]').drag('[data-testid=dnd-place]');
    cy.get('[data-testid=create-order]').click();
    cy.wait(20000);
    cy.get('[data-testid=close-modal]').scrollIntoView().should('exist').should('be.visible').click();

  })
})