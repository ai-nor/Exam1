export function searchProductByName(product) {
         
    cy.get('mat-card.mat-focus-indicator').then((content) => {

        if(content.find(`[alt="${product.name}"]`).length >0) {
            cy.get(content.find(`[alt="${product.name}"]`).parents(`mat-card`).find(`[aria-label="Add to Basket"]`)).eq(0).click({ force: true });
            }
        else {
            cy.get('[aria-label="Next page"]').click();
            searchProductByName(product);
        }})

}

