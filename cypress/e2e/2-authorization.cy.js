///<reference types="cypress"/>
import * as user from '../fixtures/user.json';
import AuthorizationPage from '../support/pages/AuthorizationPage';

describe('Authorization new user', () => {
  
  it('Submit authorization form for user', () => {
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
  })

  
})