

class AccountPage {
    
    openSearchPage(){
        cy.log('Open search page');
        cy.visit('/#/search');
        this.getButtonPopupTrue().click();
    }

    getButtonPopupTrue(){
        return cy.get('mat-dialog-container [mattooltipposition="above"]');
    }
    
    getAccountMenu(){
        return cy.get('#navbarAccount');
    }
    
    getGotoUserProfileMenu(){
        return cy.get('[aria-label="Go to user profile"]');
    }

    getPopupAddingProductToBasketConfirmation(){
        return cy.get('snack-bar-container .mat-simple-snack-bar-content');
    }
    
    getBasketCounter(){
        return cy.get('.mat-button-wrapper .fa-layers-counter');
    }

    getBasketMenu(){
        cy.get('[aria-label="Show the shopping cart"]')
    }

    
    checkUserIsAuthorized(user){
        this.getAccountMenu().click();
        this.getGotoUserProfileMenu().should('contain',`${user.email}`);
    }
   
    addProductToBasketConfirmation(product) {
        cy.log('Підтвердження додавання товару у корзину');
        this.getPopupAddingProductToBasketConfirmation().should('be.visible').and('have.text',`Placed ${product.name} into basket.` );
        this.getBasketCounter().should('have.text', '1');
    }

    verifyRedirectToBasketPage(){
        cy.location().should((loc) => {
            expect(loc.href).to.eq('https://juice-shop-sanitarskyi.herokuapp.com/#/basket');
          })
    }
   
}

export default new AccountPage();