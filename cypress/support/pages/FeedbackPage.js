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

    fillFeedbackForm(user){
        this.getUserEmailField().should('have.text', user.email);
        this.getCommentInput().type('Everyting okey-dockey');
        this.getRating().type({moveToEnd});

        let captureAnswer = eval(parseFloat(this.getCaptchaValue()));
        console.log(captureAnswer);
        this.captureAnswer().type(captureAnswer);
        this.getSubmitButton().click();

    }
}

export default new FeedbackPage();