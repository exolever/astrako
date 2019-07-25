var LoginPage = require('../public/login/login.page');
var EcosystemNavbarPage = require('../ecosystem-navbar.page');
var AvatarMenuPage = require('../avatar-menu.page');
var EcosystemOpportunityPage = require('../ecosystem/opportunities/opportunity.page');
var ProfilePage = require('../ecosystem/profile/profile.page');
const imageComparison = require('../imageComparison');

describe('Compare Ecosystem screens', () => {

  var login = new LoginPage();
  var ecosystemNavbar = new EcosystemNavbarPage();
  var avatarMenu = new AvatarMenuPage();
  var ecosystemOpportunity = new EcosystemOpportunityPage();
  var profile = new ProfilePage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await login.login('nainalavrova@example.com');
  });

  afterAll(async () => {
    await avatarMenu.logout();
  });

  it('should compare circles with a baseline', async () => {
    // FIXME: Waiting for the react components, it takes several seconds, so wait until it's done.
    await browser.sleep(10000);
    expect(await imageComparison('circles')).toEqual(0);
  });

  it('should compare directory with a baseline', async () => {
    await ecosystemNavbar.goToDirectory();
    expect(await imageComparison('ecosystem-directory', $$('img'))).toEqual(0);
  });

  it('should compare member profile with a baseline', async () => {
    await element(by.cssContainingText('p', 'Philip Robson')).click();
    expect(await imageComparison('ecosystem-member-profile')).toEqual(0);
  });

  it('should compare member connect with a baseline', async () => {
    await element.all(by.tagName('button')).first().click();
    expect(await imageComparison('ecosystem-member-connect')).toEqual(0);

    await element.all(by.tagName('button')).get(2).click();
    await browser.navigate().back();
  });

  it('should compare media library with a baseline', async () => {
    await ecosystemNavbar.goToMediaLibrary();
    expect(await imageComparison('media-library', $$('.thumbnail-video'))).toEqual(0);
  });

  it('should compare opportunities with a baseline', async () => {
    await ecosystemNavbar.goToOpportunities();
    expect(await imageComparison('opportunities')).toEqual(0);
  });

  it('should compare ticket detail with a baseline', async () => {
    await element.all(by.className('mat-card-content')).first().click();
    expect(await imageComparison('ticket-detail')).toEqual(0);

    await ecosystemNavbar.goToOpportunities();
  });

  it('should compare opportunity detail with a baseline', async () => {
    await element.all(by.className('mat-card-content')).get(1).click();
    expect(await imageComparison('opportunity-detail')).toEqual(0);
  });

  it('should compare opportunity application with a baseline', async () => {
    await ecosystemOpportunity.apply();
    expect(await imageComparison('opportunity-application')).toEqual(0);

    // UPDATE
    await element.all(by.css('button')).get(4).click();
    await ecosystemNavbar.goToOpportunities();
  });

  it('should compare opportunities delivery manager with a baseline', async () => {
    await element.all(by.className('mat-tab-label')).get(1).click();
    expect(await imageComparison('opportunities-deliver-manager')).toEqual(0);
  });

  it('should compare opportunity delivery manager detail with a baseline', async () => {
    await element.all(by.className('mat-card-content')).first().click();
    expect(await imageComparison('opportunity-deliver-manager-detail')).toEqual(0);
  });

  it('should compare opportunity delivery manager selecting applicant with a baseline', async () => {
    await element.all(by.css('button')).get(2).click();
    const EC = protractor.ExpectedConditions;
    const e = element.all(by.className('mat-menu-panel')).first();
    await browser.wait(EC.visibilityOf(e));
    await element.all(by.css('button')).get(6).click();

    expect(await imageComparison('opportunity-deliver-manager-selecting-applicant')).toEqual(0);
    await element.all(by.css('button')).get(6).click();
  });

  it('should compare opportunity delivery manager discarding applicant with a baseline', async () => {
    await element.all(by.css('button')).get(2).click();
    const EC = protractor.ExpectedConditions;
    const e = element.all(by.className('mat-menu-panel')).first();
    await browser.wait(EC.visibilityOf(e));
    await element.all(by.css('button')).get(7).click();

    expect(await imageComparison('opportunity-deliver-manager-discarding-applicant')).toEqual(0);
    await element.all(by.css('button')).get(6).click();
  });

  it('should compare opportunity delivery manager closing confirmation with a baseline', async () => {
    await element.all(by.css('button')).get(1).click();
    expect(await imageComparison('opportunity-deliver-manager-closing-confirmation')).toEqual(0);

    await element.all(by.css('button')).get(6).click();
  });

  it('should compare my jobs with a baseline', async () => {
    await ecosystemNavbar.goToMyJobs();
    expect(await imageComparison('my-jobs')).toEqual(0);
  });

  describe('Compare Swarm Session screens', function(){

    beforeAll(async () => {
      await ecosystemNavbar.goToMyJobs();
    });

    beforeEach(async () => {
      await element.all(by.className('mat-button')).first().click();
      let tabs = await browser.getAllWindowHandles();
      await browser.switchTo().window(tabs[1]);
      // FIXME: Find out the reason of this
      browser.waitForAngularEnabled(false);
    });

    afterEach(async () => {
      await browser.close();
      let tabs = await browser.getAllWindowHandles();
      await browser.switchTo().window(tabs[0]);
      browser.waitForAngularEnabled(true);
    });

    it('should compare swarm with a baseline', async () => {
      // FIXME: wait for the modal the first time
      const EC = protractor.ExpectedConditions;
      const e = element.all(by.tagName('mat-dialog-container')).first();
      await browser.wait(EC.visibilityOf(e));
      await element.all(by.css('button')).get(2).click();
      expect(await imageComparison('swarm')).toEqual(0);
    });

    it('should compare swarm question detail with a baseline', async () => {
      // FIXME: delete this EC
      await browser.sleep(2000);
      const EC = protractor.ExpectedConditions;
      const questionTitle = element.all(by.css('h3')).get(1);
      await browser.wait(EC.visibilityOf(questionTitle));
      await questionTitle.click();
      expect(await imageComparison('swarm-question-detail')).toEqual(0);
    });

  });

  describe('Compare Account Settings screens', function(){

    beforeAll(async () => {
      await avatarMenu.goToAccountSettings();
    });

    it('should compare account settings with a baseline', async () => {
      expect(await imageComparison('account-settings')).toEqual(0);
    });

  });

  describe('Compare Profile screens', function(){

    beforeAll(async () => {
      await avatarMenu.goToProfile();
    });

    it('should compare profile with a baseline', async () => {
      expect(await imageComparison('profile', $$('img'))).toEqual(0);
    });

    it('should compare share profile with a baseline', async () => {
      await element.all(by.className('mat-flat-button')).first().click();
      expect(await imageComparison('profile-share-profile')).toEqual(0);

      await element.all(by.className('mat-primary')).get(20).click();
      const EC = protractor.ExpectedConditions;
      await browser.wait(EC.visibilityOf(element.all(by.className('mat-primary')).first()));

      // TODO: Remove this line
      await $$('button').get(1).click();
    });

    it('should compare profile personal information with a baseline', async () => {
      //await profile.goToPersonalInformation();
      await element.all(by.className('summary')).first().click();
      expect(await imageComparison('profile-personal-information')).toEqual(0);
    });

    it('should compare profile about you with a baseline', async () => {
      // await profile.goToAboutMe();
      await element.all(by.className('about-you')).first().click();
      expect(await imageComparison('profile-about-you')).toEqual(0);
    });

    it('should compare profile your purpose with a baseline', async () => {
      await element.all(by.className('your-purpose')).first().click();
      expect(await imageComparison('profile-your-purpose')).toEqual(0);
    });

    it('should compare profile desired activities with a baseline', async () => {
      await element.all(by.className('activities')).first().click();
      expect(await imageComparison('profile-desired-activities')).toEqual(0);
    });

    it('should compare profile core communities with a baseline', async () => {
      await element.all(by.className('pillars')).first().click();
      expect(await imageComparison('profile-core-communities')).toEqual(0);
    });

    it('should compare profile areas of expertise with a baseline', async () => {
      await element.all(by.className('skills')).first().click();
      expect(await imageComparison('profile-areas-of-expertise')).toEqual(0);
    });

  });

});
