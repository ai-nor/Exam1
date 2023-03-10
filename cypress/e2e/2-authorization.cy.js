///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';
import AuthorizationPage from '../support/pages/AuthorizationPage';

user.email = Cypress.env('env_userEmail'); 
user.password = Cypress.env('env_userPassword');

// user.email = Cypress.env("envUserEmail"); 
// user.password = Cypress.env("envUserPassword");

describe('Authorization new user', () => {
  
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

