export function searchProductByName(product) {
         
cy.get('mat-card.mat-focus-indicator').then((content) => {
    
    if(cy.get(content.find(`[alt='${product}']`).length >0)) {
        cy.get(`[alt='${product}'])`).parents('mat-card').find(`[aria-label="Add to Basket"]`).click();
        }
    else {
        cy.get('[aria-label="Next page"]').click();
        searchProductByName(product);
    }})

}