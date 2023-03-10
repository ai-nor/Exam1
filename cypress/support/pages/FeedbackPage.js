class FeedbackPage {


    getUserEmailField(){
        return cy.get('#mat-input-1');
    }

    getCommentInput(){
        return cy.get('#comment');
    }
    
    getRating(){
        return cy.get('#rating');
    }

    getCaptchaValue(){
        return cy.get('#captcha');
    }
    
    getCaptchaAnswerField(){
        return cy.get('#captchaControl');
    }

    getSubmitButton(){
        return cy.get('#submitButton');
    }

    openFeedbackPage(){
        cy.visit('/#/contact');
    }

}

export default new FeedbackPage();