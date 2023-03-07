class AuthorizationPage {
    
    openAuthorizationPage(){
        cy.log('Open authorization page')
        cy.visit('#/login');
        this.getButtonPopupTrue().click();
    }

    getButtonPopupTrue(){
        return cy.get('[mattooltipposition="above"]');
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
    
    openForgotPasswordPage(){
        cy.log('Open forgot password page')
        cy.visit('#/login');
        cy.getForgotPasswordLink().click();
    }

    submitAuthorizationForm(user) {
        cy.log('**Заповнення форми авторизації**');
        this.getEmail().type(user.email).should('have.value', user.email);
        this.getPassword().type(user.password).should('have.value', user.password);
        this.getSubmitButton().click();
    }

    verifyRedirectToSearchPage(){
        cy.location().should((loc) => {
            expect(loc.href).to.eq('https://juice-shop-sanitarskyi.herokuapp.com/#/search');
          })
    }

    
   
}

export default new AuthorizationPage();