import { Page, expect } from '@playwright/test';


export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertOnRegisterPage() {
    await expect(this.page).toHaveURL(/register.htm/);
    await expect(this.page.getByRole('heading', { name: /Signing up is easy!/i })).toBeVisible();
  }

  async register(user: {
    firstName: string;
    lastName?: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    if (user.firstName) await this.page.fill('input[name="customer.firstName"]', user.firstName);
    if (user.lastName) await this.page.fill('input[name="customer.lastName"]', user.lastName);
    await this.page.fill('input[name="customer.address.street"]', user.street);
    await this.page.fill('input[name="customer.address.city"]', user.city);
    await this.page.fill('input[name="customer.address.state"]', user.state);
    await this.page.fill('input[name="customer.address.zipCode"]', user.zip);
    await this.page.fill('input[name="customer.phoneNumber"]', user.phone);
    await this.page.fill('input[name="customer.ssn"]', user.ssn);
    await this.page.fill('input[name="customer.username"]', user.username);
    await this.page.fill('input[name="customer.password"]', user.password);
    await this.page.fill('input[name="repeatedPassword"]', user.confirmPassword);
    await this.page.click('input[value="Register"]');
  }

  async assertRegisterSuccess(username: string) {
    await expect(this.page.getByRole('heading', { name: /Welcome/i })).toBeVisible();
    await expect(this.page.getByText(username)).toBeVisible();
  }

  async assertRegisterFailed(message: string) {
    const error = this.page.locator('.error');
    await expect(error).toBeVisible();
    await expect(error).toContainText(message);
  }

  generateUniqueUsername(prefix = 'user'): string {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  
}
