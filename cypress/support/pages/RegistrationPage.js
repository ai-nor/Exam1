class RegistrationPage {
    
    openRegistrationPage(){
        cy.log('Open registration page')
        cy.visit('/#/register');
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
        return cy.get('#mat-select-value-3');
    }

    getSecurityAnswer(){
        return cy.get('#securityAnswerControl');
    }
    
    getSubmitButton(){
        return cy.get('#registerButton');
    }
    

    submitRegistrationform(user) {
        cy.log('**Заповнення форми**');
        this.getEmail().type(user.email).should('have.value', user.email);
        this.getPassword().type(user.password).should('have.value', user.password);
        this.getRepeatPassword().type(user.password).should('have.value', user.password);
        this.getSecurityQuestionDropdown().select(user.securityQuestion).should('have.value','user.securityQuestion');
        this.getSecurityAnswer().type(user.securityAnswer).should('have.value', user.securityAnswer);
        this.submitRegistrationform().click();
    }
   
}

export default new RegistrationPage();