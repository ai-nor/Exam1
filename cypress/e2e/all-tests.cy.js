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
    cy.log('Регістрація юзера');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.clickSubmitButton();
    RegistrationPage.verifyRedirectToLoginPage();
 
    cy.log('Перевірка логіну зареєстрованого юзера');
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AccountPage.checkUserIsAuthorized(user);

    email = user.email;
    password = user.password;
  })

  it('Registration new user with invalid email', () => {
    user.email = faker.internet.domainName();
    
    cy.log('Спроба регістрації з невалідними даними');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user with short password', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(4);
    
    cy.log('Спроба регістрації з невалідними даними');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user with long password', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(41);
    
    cy.log('Спроба регістрації з невалідними даними');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.checkErrorForInvalidData();
  })

  it('Registration new user without security word', () => {
    user.email = faker.internet.email();
    user.password = faker.internet.password(12);
    
    cy.log('Спроба регістрації з невалідними даними');
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
   
    cy.log('Авторизація в акаунт')
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AuthorizationPage.verifyRedirectToSearchPage();
    
    cy.log('Пошук продукту')
    searchProductByName(product);

    cy.log('Перевірка що продукт додано')
    AccountPage.addProductToBasketConfirmation(product);
    
    BasketPage.openBasketPage();
    BasketPage.checkProductInBasket(product);

    cy.log('Замовлення продукту');
    BasketPage.clickCheckoutButton();

    cy.log('Створення нової адреси');
    CheckoutPage.getAddAddress().click();
    CheckoutPage.addNewAddress(user);

    cy.log('Вибір адреси і доставки');
    CheckoutPage.selectAddress();
    CheckoutPage.selectDelivery();

    cy.log('Вибір оплати і створення карти');
    PaymentsPage.submitAddNewCard(user);

    cy.log('Останній крок оформлення замовлення');
    CheckoutPage.placeTheOrder();

  })
  
})