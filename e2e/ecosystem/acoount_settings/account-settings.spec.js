var AvatarMenuPage = require('./../../avatar-menu.page');
var LoginPage = require('./../../public/login/login.page');
var EcosystemNavbarPage = require('./../../ecosystem-navbar.page');

var AccountSettingsPage = require('./account-settings.page');

describe('Account Settings', () => {

  var public = new LoginPage();
  var avatarMenu = new AvatarMenuPage();
  var ecosystemNavbar = new EcosystemNavbarPage();
  var accountSettings = new AccountSettingsPage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await public.login('nainalavrova@example.com');
  });

  it('should update the password', async () => {
    await avatarMenu.goToAccountSettings();
    await accountSettings.changePassword('12345678');
    await avatarMenu.logout();

    // FIXME: use page objet
    // await public.login('nainalavrova@example.com', '12345678');
    const emailInput = $('#mat-input-6');
    const passwordInput = $('#mat-input-7');
    const loginBtn = $('.mat-button-wrapper');
    await emailInput.sendKeys('nainalavrova@example.com');
    await passwordInput.sendKeys('12345678');
    await loginBtn.click();
    expect(ecosystemNavbar.isDisplayed()).toBeTruthy();
  });

});