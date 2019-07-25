const clipboardy = require('clipboardy');

var LoginPage = require('../../public/login/login.page');
var AvatarMenuPage = require('./../../avatar-menu.page');

var ProfilePage = require('./profile.page');

describe('Profile', () => {

  var login = new LoginPage();
  var avatarMenu = new AvatarMenuPage();
  var profile = new ProfilePage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await login.login('nainalavrova@example.com');
    await avatarMenu.goToProfile();
  });

  it('should be displayed', async () => {
    expect(await profile.isDisplayed()).toBeTruthy();
  });

  describe('Share profile', function(){

    afterAll(async () => {
      const tabs = await browser.getAllWindowHandles();
      await browser.switchTo().window(tabs[0]);
    });

    it('should share the profile', async () => {
      await profile.shareProfile();
      await browser.executeScript('window.open()');
      const tabs = await browser.getAllWindowHandles();
      await browser.switchTo().window(tabs[1]);
      let urlFromClipboard= await clipboardy.read();
      await browser.get(urlFromClipboard);
      expect(await profile.isDisplayed()).toBeTruthy();
    });

  });

  describe('Edit profile', function(){

    afterEach(async () => {
      await avatarMenu.goToProfile();
    });

    it('should go to Personal Information', async () => {
      await profile.goToPersonalInformation();
    });

    it('should go to Personal Information', async () => {
      await profile.goToAboutMe();
    });

  });

});