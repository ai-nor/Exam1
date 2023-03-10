///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import * as product from '../fixtures/product.json';
import { faker } from '@faker-js/faker';
import {searchProductByName} from '../support/helper';
import RegistrationPage from '../support/pages/RegistrationPage';
import AuthorizationPage from '../support/pages/AuthorizationPage';
import AccountPage from '../support/pages/AccountPage';
import BasketPage from '../support/pages/BasketPage';
import CheckoutPage from '../support/pages/CheckoutPage';
import PaymentsPage from '../support/pages/PaymentsPage';

user.email = faker.internet.email();
user.password = faker.internet.password();

describe('Order product', () => {
  
  it('Registration new user with valid data', () => {
    cy.log('Registration new user');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.clickSubmitButton();
    RegistrationPage.verifyRedirectToLoginPage();

  })
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