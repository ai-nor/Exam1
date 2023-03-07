///<reference types="cypress"/>
import * as product from '../fixtures/product.json';
import AccountPage from '../support/pages/AccountPage';
import {searchProductByName} from '../support/helper';

describe('Order product', () => {
  
  it('Order new product via search on the page', () => {
   
    AuthorizationPage.openAuthorizationPage();
    AuthorizationPage.submitAuthorizationForm(user);
    
    
    AccountPage.openSearchPage();
    searchProductByName(product.name);
  })

  
})