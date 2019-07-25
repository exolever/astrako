var LoginPage = function() {

  this.emailInput = $('#mat-input-0');
  this.passwordInput = $('#mat-input-1');
  this.loginBtn = $('.mat-button-wrapper');
  this.resetPasswordLink = $('a[href*="/auth/password"]');

  this.login = async (email, password) => {
    if (!password) {
      password = browser.params.password
    }
    await this.emailInput.sendKeys(email);
    await this.passwordInput.sendKeys(password);
    await this.loginBtn.click();
  };

  this.goToResetYourPassword = async () => {
    await this.resetPasswordLink.click();
  };

};
module.exports = LoginPage;