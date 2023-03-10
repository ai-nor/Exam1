///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import * as product from '../fixtures/product.json';
import {searchProductByName} from '../support/helper';
import { faker } from '@faker-js/faker';
import RegistrationPage from '../support/pages/RegistrationPage';
import AuthorizationPage from '../support/pages/AuthorizationPage';
import AccountPage from '../support/pages/AccountPage';
import BasketPage from '../support/pages/BasketPage';
import CheckoutPage from '../support/pages/CheckoutPage';
import PaymentsPage from '../support/pages/PaymentsPage';


let email;
let password;

describe('Registration new user', () => {
user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.animal.cat();
  
  it('Registration new user with valid data', () => {
    cy.log('Registration new user');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.clickSubmitButton();
    RegistrationPage.verifyRedirectToLoginPage();
 
    cy.log('Check login registrated user');
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AccountPage.checkUserIsAuthorized(user);

    email = user.email;
    password = user.password;
  })

  it('Registration new user with invalid email', () => {
    user.email = faker.internet.domainName();
    
    cy.log('Registration with invalid data');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user with short password', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(4);
    
    cy.log('Registration with invalid data');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user with long password', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(41);
    
    cy.log('Registration with invalid data');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user without security word', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(12);
    
    cy.log('Registration with invalid data');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.getSecurityAnswer().clear().blur();
    RegistrationPage.checkErrorForInvalidData();
  })
  
})

describe('Authorization new user', () => {
  
  it('Submit authorization form for user with valid data', () => {
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
  })

  it('Submit authorization form for user with empty fields', () => {
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.getSubmitButton().should('be.disabled');
  })

  it('Submit authorization form for user with invalid data', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AuthorizationPage.getErrorMessage().should('be.visible');
  })
  
})

describe('Order product', () => {
  
  it('Order a product', () => {
    user.email = email;
    user.password = password;
   
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