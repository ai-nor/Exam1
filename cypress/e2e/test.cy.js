///<reference types="cypress"/>
import AuthorizationPage from '../support/pages/AuthorizationPage';
import * as user from '../fixtures/user.json';
import * as product from '../fixtures/product.json';


it('test', () => {
    
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);

    // cy.get('button[color="warn"]').click();
    // cy.get('[aria-label="dismiss cookie message"]').click();
    
    function searchProductByName(product) {
         
        cy.get('mat-card.mat-focus-indicator').then((content) => {

            cy.log(cy.get(`[alt="${product}"]`).parents(`mat-card`).find(`[aria-label="Add to Basket"]`));
            console.log(cy.get(content.find(`[alt="${product}"]`)));
            cy.log(cy.get('mat-card.mat-focus-indicator').find(`class="item-name")`).contains('text', `${product}`));

            if(cy.get(content.find(`[alt="${product}"]`).length >0)) {
                cy.get(`[alt="${product}"]`).parents(`mat-card`).find(`[aria-label="Add to Basket"]`).click();
                }
            else {
                cy.get('[aria-label="Next page"]').click();
                searchProductByName(product);
            }})

  }

  searchProductByName("Apple Juice (1000ml)");
})
