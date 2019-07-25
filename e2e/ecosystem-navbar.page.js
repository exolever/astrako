var EcosystemNavbarPage = function () {
  const EC = protractor.ExpectedConditions;
  const mobileMenu = $('#ecosystem-menu-lt-md');
  const menu = $('mat-toolbar');


  // There are two links, mobile and desktop.
  const circles = $$('a[href*="/ecosystem/circles"]');
  const directory = $$('a[href*="/ecosystem/directory"]');
  const mediaLibrary = $$('a[href*="/ecosystem/media"]');
  const opportunities = $$('a[href*="/ecosystem/opportunities"]');
  const myJobs = $$('a[href*="/ecosystem/jobs"]');

  this.goTo = async (link) => {
    const mobileResolution = await mobileMenu.isDisplayed();
    if (mobileResolution) {
      const mobileLink = link.get(1);
      await mobileMenu.click();
      await browser.wait(EC.elementToBeClickable(mobileLink));
      // FIXME: sleep
      await browser.sleep(2000);
      await mobileLink.click();
    }
    else {
      await browser.sleep(2000);
      await link.first().click();
    }
  };

  this.goToDirectory = async () => {
    await this.goTo(directory);
  };

  this.goToMediaLibrary = async () => {
    await this.goTo(mediaLibrary);
  };

  this.goToOpportunities = async () => {
    await this.goTo(opportunities);
  };

  this.goToMyJobs = async () => {
    await this.goTo(myJobs);
  };

  this.isDisplayed = async() => {
    await menu.isDisplayed();
  };

};
module.exports = EcosystemNavbarPage;
