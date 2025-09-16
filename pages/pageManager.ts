import { Page, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { RegisterPage } from './registerPage';
import { TransferFundsPage } from './transferFundsPage';

export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage;
    private readonly registerPage: RegisterPage;
    private readonly transferFundsPage: TransferFundsPage;
  
    constructor(page: Page) {
      this.page = page;
      this.loginPage = new LoginPage(this.page);
      this.registerPage = new RegisterPage(this.page);
      this.transferFundsPage = new TransferFundsPage(page);
    }
    

    onLoginPage(){
        return this.loginPage
    }

    onRegisterPage(){
        return this.registerPage
    }

    onTransferFundsPage() {
      return this.transferFundsPage;
    }

  }