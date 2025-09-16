import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { registerNewUser } from '../helper/registrationHelper';

test.describe('Parabank Money Transfer', () => {

  test('Transfer funds between accounts with new user', async ({ page }) => {
    const pm = new PageManager(page);

    // Always register a new user
    const { username, password } = await registerNewUser(page);

    // Login
    await pm.onLoginPage().clickLogOutButton();
    await pm.onLoginPage().goto();
    await pm.onLoginPage().login(username, password);
    await pm.onLoginPage().assertLoginSuccess();

    // Transfer funds
    await pm.onTransferFundsPage().goto();
    await pm.onTransferFundsPage().transfer('5.00');
    await pm.onTransferFundsPage().assertTransferSuccess('$5.00');
  });

});
