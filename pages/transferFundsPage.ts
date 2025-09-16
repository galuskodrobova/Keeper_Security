import { Page, expect } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly amountInput;
  readonly fromAccountSelect;
  readonly toAccountSelect;
  readonly transferButton;
  readonly successHeading;
  readonly successMessage;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('select#fromAccountId');
    this.toAccountSelect = page.locator('select#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successHeading = page.locator('h1.title');
    this.successMessage = page.locator('p', { hasText: 'has been transferred' });
  }

  async goto() {
    await this.page.click('text=Transfer Funds');
    await expect(this.page).toHaveURL(/transfer\.htm/);
  }

  async transfer(amount: string, fromIndex = 0, toIndex = 0) {
    await this.amountInput.fill(amount);
    await this.fromAccountSelect.selectOption({ index: fromIndex });
    await this.toAccountSelect.selectOption({ index: toIndex });
    await this.transferButton.click();
  }


  async assertTransferSuccess(amount: string) {
    await expect(this.page.getByRole('heading', { name: 'Transfer Funds' })).toBeVisible();
    await expect(this.successMessage).toContainText(`${amount} has been transferred`);
  }
}
