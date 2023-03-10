class RegistrationPage {
    
    openRegistrationPage(){
        cy.log('Open registration page');
        cy.visit('/#/register');
        this.getButtonPopupWelcomeFalse().click();
        this.getButtonPopupCookieTrue().click();
    }

    getButtonPopupWelcomeFalse(){
        return cy.get('[aria-label="Close Welcome Banner"]');
    }

    getButtonPopupCookieTrue(){
        return cy.get('[aria-label="dismiss cookie message"]');
    }
    
    getEmail(){
        return cy.get('#emailControl');
    }

    getPassword(){
        return cy.get('#passwordControl');
    }
    
    getRepeatPassword(){
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestionDropdown(){
        return cy.get('#mat-select-0');
    }

    getSecurityQuestion(){
        return cy.get('#mat-option-1');
    }
    getSecurityAnswer(){
        return cy.get('#securityAnswerControl');
    }
    
    getSubmitButton(){
        return cy.get('#registerButton');
    }

    getErrorMessage(){
        return cy.get('mat-error.ng-star-inserted');
    }
    

    submitRegistrationform(user) {
        cy.log('**Заповнення форми**');
        this.getEmail().type(user.email).should('have.value', user.email);
        this.getPassword().type(user.password).should('have.value', user.password);
        this.getRepeatPassword().type(user.password).should('have.value', user.password);
        this.getSecurityQuestionDropdown().click();
        this.getSecurityQuestion().click();
        this.getSecurityAnswer().type(user.securityAnswer).should('have.value', user.securityAnswer);
    }

    clickSubmitButton(){
        this.getSubmitButton().click();
    }
    
    verifyRedirectToLoginPage(){
        cy.location().should((loc) => {
            expect(loc.href).to.eq('https://juice-shop-sanitarskyi.herokuapp.com/#/login');
          })
    }
   
    checkErrorForInvalidData(){
        this.getSubmitButton().should('be.disabled');
        this.getErrorMessage().should('be.visible');
    }
}

export default new RegistrationPage();