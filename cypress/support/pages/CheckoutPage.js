class CheckoutPage {
    
    openRegistrationPage(){
        cy.log('Open checkout page');
        cy.visit('#/address/select');

    }

    openNewAddressPage(){
        cy.visit('#/address/create');
    }

    getAddAddress(){
        return cy.get('[aria-label="Add a new address"]');
    }

    getCounrtyField(){
        return cy.get('[placeholder="Please provide a country."]');
    }
    
    getNameField(){
        return cy.get('#mat-input-4');
    }

    getMobPhoneField(){
        return cy.get('#mat-input-5');
    }
    
    getZipCodeField(){
        return cy.get('#mat-input-6');
    }

    getAddressField(){
        return cy.get('#address');
    }

    getCityField(){
        return cy.get('#mat-input-8');
    }
    getStateField(){
        return cy.get('#mat-input-9');
    }
    
    getSubmitButton(){
        return cy.get('#submitButton');
    }

    getSelectAddressButton(){
        return cy.get('.mat-radio-outer-circle');
    }

    getNextButton(){
        return cy.get('.btn-next');
    }
    
    getDeviveryOptionRadiobutton(){
        return cy.get('[class="mat-radio-outer-circle"]');
    }

    getNextButtonDelivery(){
        return cy.get('.nextButton');
    }

    getPlaceOrderButton(){
        return cy.get('#checkoutButton')
    }

    getConfirmationText(){
        return (cy.get('.confirmation').eq(0));
    }

    addNewAddress(user) {
        cy.log('*Заповнення форми адреси*');
        this.getCounrtyField().type(user.country).should('have.value', user.country);
        this.getNameField().type(user.name).should('have.value', user.name);
        this.getMobPhoneField().type(user.mobNumber).should('have.value', user.mobNumber);
        this.getZipCodeField().type(user.zipCode).should('have.value', user.zipCode);
        this.getAddressField().type(user.address).should('have.value', user.address);
        this.getCityField().type(user.city).should('have.value', user.city);
        this.getSubmitButton().click();
    }

    selectAddress(){
        this.getSelectAddressButton().eq(0).click({force:true});
        this.getNextButton().click();
    }
    
    selectDelivery(){
        this.getDeviveryOptionRadiobutton().eq(0).click({force:true});
        this.getNextButtonDelivery().click();
    }
   
    checkErrorForInvalidData(){
        this.getSubmitButton().should('be.disabled');
        this.getErrorMessage().should('be.visible');
    }

    placeTheOrder(){
        this.getPlaceOrderButton().click();
        cy.location().should((loc) => {
            expect(loc.href).to.contain('#/order-completion/');
          })
        this.getConfirmationText().should('have.text','Thank you for your purchase!')

    }

}

export default new CheckoutPage();

