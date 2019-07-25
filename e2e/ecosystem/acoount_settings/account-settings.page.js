var AccountSettingsPage = function() {

  this.passwordInput = $('input');

  this.changePassword = async (password) => {
    await this.passwordInput.sendKeys(password);
    // This button is hidden until the input has any value
    await element.all(by.css('button')).get(1).click();
    // Snackbar is shown once the operation is completed
    await element.all(by.className('mat-button')).get(1).click();
  };

};
module.exports = AccountSettingsPage;