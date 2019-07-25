var AvatarMenuPage = function() {
  const EC = protractor.ExpectedConditions;

  const avatar = $('.exo-image-shape-circle');
  const profileBtn = $('button[data-e2e="user-profile"]');
  const accountSettingsBtn = $('button[data-e2e="account-settings"]');
  const logoutBtn = $('button[data-e2e="logout"]');

  this.goToUserMenu = async (button) => {
    await avatar.click();
    await browser.wait(EC.visibilityOf(button));
    // FIXME: sleep
    await browser.sleep(2000);
    await button.click();
  };

  this.goToProfile = async () => {
    await this.goToUserMenu(profileBtn);
  };

  this.goToAccountSettings = async () => {
    await this.goToUserMenu(accountSettingsBtn);
  };

  this.logout = async () => {
    await this.goToUserMenu(logoutBtn);
  };

};
module.exports = AvatarMenuPage;