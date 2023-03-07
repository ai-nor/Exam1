class AccountName {
    
    openSearchPage(){
        cy.log('Open search page');
        cy.visit('/#/search');
        this.getButtonPopupTrue().click();
    }

    getButtonPopupTrue(){
        return cy.get('mat-dialog-container [mattooltipposition="above"]');
    }
    
    
    
    // getSubmitButton(){
    //     return cy.get('#registerButton');
    // }
    

    // submitRegistrationform(user) {
    //     cy.log('**Заповнення форми**');
    //     this.getEmail().type(user.email).should('have.value', user.email);
    //     this.getPassword().type(user.password).should('have.value', user.password);
    //     this.getRepeatPassword().type(user.password).should('have.value', user.password);
    //     this.getSecurityQuestionDropdown().click();
    //     this.getSecurityQuestion().click();
    //     this.getSecurityAnswer().type(user.securityAnswer).should('have.value', user.securityAnswer);
    //     this.getSubmitButton().click();
    // }

    // verifyRedirectToLoginPage(){
    //     cy.location().should((loc) => {
    //         expect(loc.href).to.eq('https://juice-shop-sanitarskyi.herokuapp.com/#/login');
    //       })
    // }
   
}

export default new AccountName();