var ProjectNavbarPage = function() {
  const mobileMenu = $('#sidenav-toggle');

  const directory = element(by.cssContainingText('h3', 'Directory'));
  const mediaLibrary = element(by.cssContainingText('h3', 'Media Library'));
  const teamCommunication = element(by.cssContainingText('h3', 'Team Communication'));
  const askTheEcosystem = element(by.cssContainingText('h3', 'Ask the Ecosystem'));
  const advisorRequests = element(by.cssContainingText('h3', 'Advisor Requests'));
  const swarmSessions = element(by.cssContainingText('h3', 'Swarm Sessions'));

  this.goTo = async (link) => {
    const mobileResolution = await mobileMenu.isPresent();
    if (mobileResolution) {
      await mobileMenu.click();
    }
    await this.scrollToIfNotDisplayed(link);
    await link.click();

    // FIXME: patch to manage media library link
    // We have to close the menu
    if (mobileResolution && link !== mediaLibrary) {
      await mobileMenu.click();
    }
  };

  this.scrollToIfNotDisplayed = async (link) => {
    const isDisplayed = await link.isDisplayed();
    if (!isDisplayed) {
      await browser.executeScript('window.scrollTo(arguments[0].scrollIntoView(false));', link);
    }
  };

  this.goToDirectory = async () => {
    await this.goTo(directory);
  };

  this.goToMediaLibrary = async () => {
    await this.goTo(mediaLibrary);
  };

  this.goToTeamCommunication = async () => {
    await this.goTo(teamCommunication);
  };

  this.goToAskTheEcosystem = async () => {
    await this.goTo(askTheEcosystem);
  };

  this.goToAdvisorRequests = async () => {
    await this.goTo(advisorRequests);
  };

  this.goToSwarmSessions = async () => {
    await this.goTo(swarmSessions);
  };

};
module.exports = ProjectNavbarPage;
