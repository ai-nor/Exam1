///<reference types="cypress"/>
import * as user from '../fixtures/user.json';
import RegistrationPage from '../support/pages/RegistrationPage';
import { faker } from '@faker-js/faker';

user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.animal.cat().name;

describe('Registration new user', () => {
  
  it('Submit registration form for user', () => {
    RegistrationPage.openRegistrationPage();
    RegistrationPage.submitRegistrationform(user);
  })
})