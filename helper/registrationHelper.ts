import { PageManager } from '../pages/pageManager';
import { registerUserData } from '../fixtures/testData';
import { messages } from '../fixtures/messages';
import { credentials } from '../fixtures/credentials';

export async function registerNewUser(page: any) {
  const pm = new PageManager(page);
  const username = `user_${Date.now()}`;
  const password = credentials.valid.password;

  await pm.onLoginPage().goto();
  await pm.onLoginPage().clickRegisterLink();
  await pm.onRegisterPage().assertOnRegisterPage();

  await pm.onRegisterPage().register({
    ...registerUserData,
    username,
    password,
    confirmPassword: password,
  });

  await pm.onRegisterPage().assertRegisterSuccess(messages.registerSuccess(username));

  return { username, password };
}
