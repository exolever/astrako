/*describe('compare example screen', () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("https://angular-5sbdat.stackblitz.io/");
  });

  it('should compare login page with a baseline', async () => {
    await browser.sleep(3000);
    await element.all(by.css('button')).get(0).click();
    expect(await browser.imageComparison.checkFullPageScreen('test')).toEqual(0);
  });
});*/

// https://exolever.github.io/website-exponentialorgs/
// https://exponentialorgs.com/
describe('compare example screen', () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("https://fixingcivilization.org");
  });

  it('should compare web page with a baseline', async () => {
    await browser.sleep(3000);
    expect(await browser.imageComparison.checkFullPageScreen('fixing-civilization')).toEqual(0);
  });
});

