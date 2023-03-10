///<reference types="cypress"/>

import RegistrationPage from '../support/pages/RegistrationPage';
import FeedbackPage from '../support/pages/FeedbackPage';
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'


describe('Fill the feedback form', () => {
  
  it('Fill in the feedback form', () => {
    cy.log('Fill in the feedback form');
    // AuthorizationPage.openAuthorizationPage();
    // AuthorizationPage.submitAuthorizationForm(user);
    // AuthorizationPage.clickLoginButton();
    // AuthorizationPage.verifyRedirectToSearchPage(user);
    FeedbackPage.openFeedbackPage();
    RegistrationPage.getButtonPopupWelcomeFalse().click();
    RegistrationPage.getButtonPopupCookieTrue().click();
    FeedbackPage.getUserEmailField().should('be.disabled');
    FeedbackPage.getCommentInput().type('Everyting okey-dockey');
    FeedbackPage.getRating().type('{moveToEnd}');
    let captureAnswer;
    FeedbackPage.getCaptchaValue().then(function($elem) {
      let captureQuestion = $elem.text();
      captureAnswer = evaluate(captureQuestion);
      console.log(captureAnswer);
      })
    console.log('captcha' + captureAnswer);
    FeedbackPage.getCaptchaAnswerField().type(captureAnswer);
    FeedbackPage.getSubmitButton().click();

  })

})

