var LoginPage = require('./public/login/login.page');

var ResetPasswordPage = require('./reset-password.page');

describe('Reset Password', () => {

  var login = new LoginPage();
  var resetPassword = new ResetPasswordPage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
  });

  it('should reset the password', async () => {
    await login.goToResetYourPassword();
    await resetPassword.resetPassword('alicelagrande@example.com');
  });

});