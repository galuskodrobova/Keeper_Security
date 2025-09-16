import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { credentials } from '../fixtures/credentials';
import { messages } from '../fixtures/messages';
import { registerNewUser } from '../helper/registrationHelper';
import { registerUserData } from '../fixtures/testData';

/**
 * I create a new user every time because the demo site deletes old users
 */

test.describe('Parabank Login & Registration', () => {

  test('Login with newly registered user', async ({ page }) => {
    const pm = new PageManager(page);
    const { username, password } = await registerNewUser(page);

    await pm.onLoginPage().clickLogOutButton();
    await pm.onLoginPage().goto();
    await pm.onLoginPage().login(username, password);
    await pm.onLoginPage().assertLoginSuccess();
  });


  test('Login with blank username and password', async ({ page }) => {
    const pm = new PageManager(page);
  
    await pm.onLoginPage().goto();
    await pm.onLoginPage().login('', '');
    await pm.onLoginPage().assertLoginFailed(messages.loginBlankError);
  });


  test('Register with valid data', async ({ page }) => {
    const pm = new PageManager(page);
    const uniqueUser = `user_${Date.now()}`; 

    await pm.onLoginPage().goto();
    await pm.onLoginPage().clickRegisterLink();
    await pm.onRegisterPage().assertOnRegisterPage();

    await pm.onRegisterPage().register({
      ...registerUserData,
      username: uniqueUser,
      password: credentials.valid.password,
      confirmPassword: credentials.valid.password,
    });

    await pm.onRegisterPage().assertRegisterSuccess(messages.registerSuccess(uniqueUser));
  });


  test('Register and login', async ({ page }) => {
    const pm = new PageManager(page);
    const uniqueUser = `user_${Date.now()}`;
  
    await pm.onLoginPage().goto();
    await pm.onLoginPage().clickRegisterLink();
    await pm.onRegisterPage().assertOnRegisterPage();
  
    await pm.onRegisterPage().register({
      ...registerUserData,     
      username: uniqueUser,    
      password: credentials.valid.password,
      confirmPassword: credentials.valid.password,
    });
  
    await pm.onRegisterPage().assertRegisterSuccess(messages.registerSuccess(uniqueUser));

    await pm.onLoginPage().clickLogOutButton();
    await pm.onLoginPage().goto();
    await pm.onLoginPage().login(uniqueUser, credentials.valid.password);
    await pm.onLoginPage().assertLoginSuccess();
  });


  test('Register with mismatched passwords', async ({ page }) => {
    const pm = new PageManager(page);
  
    await pm.onLoginPage().goto();
    await pm.onLoginPage().clickRegisterLink();
    await pm.onRegisterPage().assertOnRegisterPage();
  
    await pm.onRegisterPage().register({
      ...registerUserData,
      username: `user_${Date.now()}`, 
      password: credentials.valid.password,
      confirmPassword: credentials.invalid.password,
    });
  
    await pm.onRegisterPage().assertRegisterFailed(messages.passwordMismatch);
  });

});
