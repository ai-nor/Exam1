///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';
import RegistrationPage from '../support/pages/RegistrationPage';
import AuthorizationPage from '../support/pages/AuthorizationPage';

user.email = faker.internet.email();
user.password = faker.internet.password();

describe('Authorization new user', () => {
  
  it('Registration new user with valid data', () => {
    cy.log('Registration new user');
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
    RegistrationPage.clickSubmitButton();
    RegistrationPage.verifyRedirectToLoginPage();

  })
  
  it('Submit authorization form for user with valid data', () => {
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    AuthorizationPage.clickLoginButton();
    AuthorizationPage.verifyRedirectToSearchPage(user);

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

