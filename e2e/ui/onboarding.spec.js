var LoginPage = require('../public/login/login.page');
var AvatarMenuPage = require('../avatar-menu.page');
const imageComparison = require('../imageComparison');

describe('compare onboarding screen', () => {

  var login = new LoginPage();
  var avatarMenu = new AvatarMenuPage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await login.login('johndoe@example.com');
  });

  afterAll(async () => {
    await avatarMenu.logout();
  });

  it('should compare agreement with a baseline', async () => {
    expect(await imageComparison('aggrement', $$('.mat-primary'))).toEqual(0);

    await element.all(by.className('mat-primary')).first().click();
  });

  it('should compare onboarding welcome with a baseline', async () => {
    expect(await imageComparison('welcome', $$('.mat-primary'))).toEqual(0);

    await element.all(by.className('mat-primary')).first().click();
    await element.all(by.css('button')).first().click();
  });

  it('should compare onboarding first step with a baseline', async () => {
    browser.waitForAngularEnabled(false);
    const EC = protractor.ExpectedConditions;
    await element.all(by.className('mat-primary')).first().click();
    await element.all(by.css('button')).first().click();

    await element.all(by.id('mat-input-4')).first().sendKeys('Granada, Spain');
    const autocomplete = element.all(by.className('pac-container')).first();
    await browser.wait(EC.visibilityOf(autocomplete));
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(await imageComparison('onboarding-first-step')).toEqual(0);

    await element.all(by.css('button')).first().click();
  });

  it('should compare onboarding second step with a baseline', async () => {
    expect(await imageComparison('onboarding-second-step')).toEqual(0);
  });

  it('should compare onboarding third step with a baseline', async () => {
    await element(by.id('mat-input-5')).sendKeys('Explore the universe beyond our limits');
    await element.all(by.className('mat-primary')).get(4).click();

    expect(await imageComparison('onboarding-third-step')).toEqual(0);
  });

  it('should compare onboarding fourth step with a baseline', async () => {
    await element.all(by.className('mat-primary')).get(3).click();

    expect(await imageComparison('onboarding-fourth-step')).toEqual(0);
  });

  it('should compare onboarding fifth step with a baseline', async () => {
    await element.all(by.className('mat-primary')).get(3).click();
    await element.all(by.className('mat-primary')).get(10).click();

    expect(await imageComparison('onboarding-fifth-step')).toEqual(0);

    await element.all(by.className('mat-primary')).get(3).click();
  });

  it('should compare onboarding walkthrough with a baseline', async () => {
    expect(await imageComparison('onboarding-walkthrough')).toEqual(0);
  });
});
