describe("Testing Add Recipe", () => {
    before(() => {
        Cypress.Cookies.debug(true)
        cy.getCookies();
        cy.request('http://localhost:4200/login');
        cy.get('#GitHub-Button').click();
      });

    it("Adding New Recipe...", () => {
        cy.get('[formcontrolname="ingredients"]').type("1 Cheese stick");
        cy.get('[formcontrolname="instructions"]').type("1.Unwrap\n2.rip off strips\n3.eat, repeat step 2 until finished");
        cy.get('[formcontrolname="recipeName"]').type("Cheese Snack");
        cy.get('[formcontrolname="imageUri"]').type("https://cdn.theatlantic.com/thumbor/jvxMQDj0pRYuYkOHe-yFTPJ-iF0=/0x435:5280x3405/720x405/media/img/mt/2014/11/shutterstock_219722968/original.jpg");
        cy.get('[formcontrolname="cookTime"]').type("0");
        cy.get('[formcontrolname="prepTime"]').type("1");
        cy.get('#submitButton').click();
        cy.visit('http://localhost:4200/viewrecipe/2');
        cy.wait(500);
        expect(cy.contains("3.eat, repeat step 2 until finished"));
    });
    
});