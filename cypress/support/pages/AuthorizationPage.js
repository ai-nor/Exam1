class AuthorizationPage {
    
    openAuthorizationPage(){
        cy.log('Open authorization page')
        cy.visit('#/login');
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
        return cy.get('#email');
    }

    getPassword(){
        return cy.get('#password');
    }
    
    getForgotPasswordLink(){
        return cy.get('[routerlink="/forgot-password"]');
    }
    
    getSubmitButton(){
        return cy.get('#loginButton');
    }

    getErrorMessage(){
        return cy.get('.error');
    }
    
    openForgotPasswordPage(){
        cy.log('Open forgot password page')
        cy.visit('#/login');
        cy.getForgotPasswordLink().click();
    }

    submitAuthorizationForm(user) {
        cy.log('**Заповнення форми авторизації**');
        this.getEmail().type(user.email).should('have.value', user.email);
        this.getPassword().type(user.password).should('have.value', user.password);
    }

    clickLoginButton(){
        this.getSubmitButton().click();
    }

    verifyRedirectToSearchPage(){
        cy.location().should((loc) => {
            expect(loc.href).to.eq('https://juice-shop-sanitarskyi.herokuapp.com/#/search');
          })
    }

}

export default new AuthorizationPage();