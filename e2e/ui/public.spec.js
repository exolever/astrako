var LoginPage = require('../public/login/login.page');
const imageComparison = require('../imageComparison');

describe('compare public screen', () => {

  var login = new LoginPage();

  beforeEach(async () => {
    await browser.get(browser.baseUrl);
  });

  it('should compare login page with a baseline', async () => {
    expect(await imageComparison('login')).toEqual(0);
  });

  it('should compare reset passord page with a baseline', async () => {
    await login.goToResetYourPassword();
    expect(await imageComparison('reset-password')).toEqual(0);
  });

});
