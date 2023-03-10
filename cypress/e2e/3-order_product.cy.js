///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import * as product from '../fixtures/product.json';
import {searchProductByName} from '../support/helper';
import AuthorizationPage from '../support/pages/AuthorizationPage';
import AccountPage from '../support/pages/AccountPage';
import BasketPage from '../support/pages/BasketPage';
import CheckoutPage from '../support/pages/CheckoutPage';
import PaymentsPage from '../support/pages/PaymentsPage';

user.email = Cypress.env('env_userEmail'); 
user.password = Cypress.env('env_userPassword');

describe('Order product', () => {
  
  it('Order a product', () => {
   
    cy.log('Authorization into account')
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AuthorizationPage.verifyRedirectToSearchPage();
    
    cy.log('Search for product')
    searchProductByName(product);

    cy.log('Check product was added')
    AccountPage.addProductToBasketConfirmation(product);
    
    BasketPage.openBasketPage();
    BasketPage.checkProductInBasket(product);

    cy.log('Product order');
    BasketPage.clickCheckoutButton();

    cy.log('Add a new address');
    CheckoutPage.getAddAddress().click();
    CheckoutPage.addNewAddress(user);

    cy.log('Select address and delivery');
    CheckoutPage.selectAddress();
    CheckoutPage.selectDelivery();

    cy.log('Add and select payment card');
    PaymentsPage.submitAddNewCard(user);

    cy.log('Last step confirmation of order');
    CheckoutPage.placeTheOrder();

  })
  
})