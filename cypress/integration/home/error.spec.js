/// <reference types="cypress" />

import { TokenService } from '../../../src/app/services/token.service';


describe("Testing error page", () => {

    it('it properly displays an error message query param', () => {
        cy.visit('http://localhost:4200/error?error=testing this error message');
        expect(cy.contains("testing this error message"));
    })
    it('displays default error message when none is given', () => {
        cy.visit('http://localhost:4200/error');
        expect(cy.contains("Unknown Error"))
    })

})