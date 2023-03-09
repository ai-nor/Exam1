class PaymentsPage {


    getAddNewCardDropdown(){
        return cy.get('#mat-expansion-panel-header-0');
    }

    getPaymentNameField(){
        return cy.get('#mat-input-10');
    }
    
    getPaymentCardNumberField(){
        return cy.get('#mat-input-11');
    }

    getExpiryMonthsDropdown(){
        return cy.get('#mat-input-12');
    }
    
    getExpiryYearsDropdown(){
        return cy.get('#mat-input-13');
    }

    getAddCardSubmitButton(){
        return cy.get('#submitButton');
    }

    getSelectCardRadiobutton(){
        return cy.get('.mat-radio-outer-circle');
    }
    
    getPaymentContinueButton(){
        return cy.get('.nextButton')
    }

    submitAddNewCard(user){
        this.getAddNewCardDropdown().click();
        this.getPaymentNameField().type(user.name);
        this.getPaymentCardNumberField().type(user.cardNumber);
        this.getExpiryMonthsDropdown().select('1');
        this.getExpiryYearsDropdown().select('2080');
        this.getAddCardSubmitButton().click();
        this.getSelectCardRadiobutton().click({force:true});
        this.getPaymentContinueButton().click();
    }


}

export default new PaymentsPage();

