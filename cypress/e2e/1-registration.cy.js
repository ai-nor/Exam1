///<reference types="cypress"/>

import * as user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';
import RegistrationPage from '../support/pages/RegistrationPage';
import AuthorizationPage from '../support/pages/AuthorizationPage';
import AccountPage from '../support/pages/AccountPage';

user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.animal.cat();

describe('Registration new user', () => {

  
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
  