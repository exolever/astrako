var LoginPage = require('../public/login/login.page');
var ProjectNavbarPage = require('../project-navbar.page');
var AvatarMenuPage = require('../avatar-menu.page');
const imageComparison = require('../imageComparison');

describe('compare project screen', () => {

  var login = new LoginPage();
  var avatarMenu = new AvatarMenuPage();
  var projectNavbar = new ProjectNavbarPage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await login.login('johnspencer@example.com');
  });

  afterAll(async () => {
    await avatarMenu.logout();
  });

  it('should compare assignment learn with a baseline', async () => {
    expect(await imageComparison('project-assignment-learn', $$('app-information-block'))).toEqual(0);
  });

  it('should compare assignment learn task with a baseline', async () => {
    await element.all(by.className('mat-primary')).get(1).click();
    expect(await imageComparison('project-assignment-learn-task')).toEqual(0);
    await element.all(by.className('mat-icon')).get(1).click();
  });

  it('should compare assignment deliver with a baseline', async () => {
    await element.all(by.className('mat-tab-link')).get(1).click();
    expect(await imageComparison('project-assignment-deliver')).toEqual(0);
  });

  it('should compare assignment reflect with a baseline', async () => {
    await element.all(by.className('mat-tab-link')).get(2).click();
    expect(await imageComparison('project-assignment-reflect')).toEqual(0);
  });

  it('should compare media-library with a baseline', async () => {
    await projectNavbar.goToMediaLibrary();
    expect(await imageComparison('project-media-library', $$('.thumbnail-video'))).toEqual(0);
  });

  it('should compare directory with a baseline', async () => {
    await projectNavbar.goToDirectory();
    expect(await imageComparison('project-directory')).toEqual(0);
  });

  it('should compare team communication with a baseline', async () => {
    await projectNavbar.goToTeamCommunication();
    expect(await imageComparison('project-team-communication')).toEqual(0);
  });

  it('should compare ask to ecosystem with a baseline', async () => {
    await projectNavbar.goToAskTheEcosystem();
    expect(await imageComparison('project-ask-to-ecosystem')).toEqual(0);
  });

  it('should compare ask to ecosystem new question with a baseline', async () => {
    await element.all(by.tagName('button')).first().click();
    expect(await imageComparison('project-ask-to-ecosystem-new-question')).toEqual(0);
  });

  it('should compare ask to ecosystem question detail with a baseline', async () => {
    await element.all(by.tagName('button')).first().click();
    await element.all(by.css('h3')).get(9).click();
    expect(await imageComparison('project-ask-to-ecosystem-question-detail')).toEqual(0);
  });

  it('should compare advisor requests with a baseline', async () => {
    await projectNavbar.goToAdvisorRequests();
    expect(await imageComparison('project-advisor-requests', $$('app-tickets-list'))).toEqual(0);
  });

  it('should compare advisor request detail with a baseline', async () => {
    await element.all(by.className('information-ticket')).get(1).click();
    expect(await imageComparison('project-advisor-request-detail')).toEqual(0);
  });

  it('should compare swarm with a baseline', async () => {
    // FIXME: Find out the reason of this
    await browser.waitForAngularEnabled(false);

    await projectNavbar.goToSwarmSessions();
    // FIXME: wait for the modal the first time
    const EC = protractor.ExpectedConditions;
    const e = element.all(by.tagName('mat-dialog-container')).first();
    await browser.wait(EC.visibilityOf(e));
    await element.all(by.css('button')).get(4).click();

    expect(await imageComparison('project-swarm')).toEqual(0);
  });

  it('should compare swarm new question with a baseline', async () => {
    await element.all(by.tagName('button')).first().click();
    expect(await imageComparison('project-swarm-new-question')).toEqual(0);
    await element.all(by.tagName('button')).first().click();
  });

  it('should compare swarm question detail with a baseline', async () => {
    const EC = protractor.ExpectedConditions;
    const e = element.all(by.tagName('mat-card')).get(5);
    await browser.wait(EC.visibilityOf(e));
    await element.all(by.css('h3')).get(8).click();
    expect(await imageComparison('project-swarm-question-detail')).toEqual(0);
  });

  it('should compare profile with a baseline', async () => {
    // FIXME: Find out the reason of this
    await avatarMenu.goToProfile();
    await browser.waitForAngularEnabled(true);
    expect(await imageComparison('project-profile')).toEqual(0);
  });

  it('should compare account settings with a baseline', async () => {
    await avatarMenu.goToAccountSettings();
    expect(await imageComparison('project-account-settings')).toEqual(0);
  });
});
