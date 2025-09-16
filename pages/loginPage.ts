import { Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('.error');
  }


  async goto() {
    const baseUrl = process.env.BASE_URL!;
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/overview/);
    await expect(this.page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  }

  async assertLoginFailed(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async clickRegisterLink() {
    await this.page.click('text=Register');
  }

  async clickLogOutButton() {
    await this.page.click('text=Log Out');
  }

}
