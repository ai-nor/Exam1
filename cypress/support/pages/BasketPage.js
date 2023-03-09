
class BasketPage {
    
    openBasketPage(){
        cy.log('Open basket page');
        cy.visit('/#/basket');
    }

    getButtonPopupTrue(){
        return cy.get('mat-dialog-container [mattooltipposition="above"]');
    }
    
    getBasketProductRow(){
        return cy.get('.mat-row.ng-star-inserted');
    }

    getBasketProductName(){
        return cy.get('.mat-cell.mat-column-product');
    }
    
    getBasketProductPrice(){
        return cy.get('.mat-cell.mat-column-price');
    }

    getCheckoutButton(){
        return cy.get('#checkoutButton');
    }

    getDeleteProductIcon(){
        return cy.get('[data-icon="trash-alt"]');
    }

    checkProductInBasket(product){
        this.getBasketProductName().should('contain.text',`${product.name}`);
        this.getBasketProductPrice().should('contain.text',`${product.price}`);
    }
    
    clickCheckoutButton(){
        this.getCheckoutButton().click();

    }

    deleteProductFromBasket(){
        this.getDeleteProductIcon().click();
        this.getBasketProductRow().should('be.empty');
    }
}

export default new BasketPage();