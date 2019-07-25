var ResetPasswordPage = function() {

  this.emailInput = $('#mat-input-2');
  this.resetPasswordBtn = $('button');
  this.loginLink = by.css('a[href*="/auth/login"]');

  this.resetPassword = async (email) => {
    await this.emailInput.sendKeys(email);
    await this.resetPasswordBtn.click();
  };

  this.backToLogin = async () => {
    await this.loginLink.click();
  };

};
module.exports = ResetPasswordPage;
