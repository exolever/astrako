var DirectoryPage = function() {
  const EC = protractor.ExpectedConditions;

  this.mobileMenu = $('#ecosystem-menu-lt-md');

  this.cards = $$('app-directory-card');
  this.searchInput = $('input');

  this.sortBySelect = $$('mat-select').get(2);
  this.activity = element(by.cssContainingText('mat-option', 'Activity'));
  this.numberOfProjects = element(by.cssContainingText('mat-option', 'Number of projects'));

  this.clearFiltersBtn = $('#restore-btn');

  this.industries = new Map();
  this.industries.set('panel', $$('mat-expansion-panel').get(1));
  this.industries.set('searchMorePanel', $$('mat-expansion-panel').get(2));
  this.industries.set('searchInput', $$('input').get(5));

  this.attributes = new Map();
  this.attributes.set('panel', $$('mat-expansion-panel').get(3));

  this.location = new Map();
  this.location.set('panel', $$('mat-expansion-panel').get(10));
  this.location.set('searchMorePanel', $$('mat-expansion-panel').get(11));
  this.location.set('searchInput', $$('input').get(57));

  this.certifications = new Map();
  this.certifications.set('panel', $$('mat-expansion-panel').get(12));

  this.nextPageBtn = $$('button').get('3');

  this.search = async (text) => {
    await this.searchInput.sendKeys(text);
  };

  this.clearSearch = async () => {
    //FIXME: https://github.com/angular/protractor/issues/562
    await this.searchInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    await this.searchInput.sendKeys(protractor.Key.DELETE);
  };

  this.getOrder = async () => {
    return Promise.all(await this.cards.map(async (card) => {
      return await card.$$('p').first().getText();
    }));
  };

  this.countResults = async() => {
    return await this.cards.count();
  };

  this.sortBy = async (option) => {
    const mobileResolution = await this.mobileMenu.isDisplayed();
    // FIXME: the select's order changes in small resolutions
    if (mobileResolution) {
      this.sortBySelect = $$('mat-select').get(0);
    }
    await this.sortBySelect.click();
    await option.click();
  };

  this.sortByNumberOfProjects = async () => {
    await this.sortBy(this.numberOfProjects);
  };

  this.sortByActivity = async () => {
    await this.sortBy(this.activity);
  };

  this.resetSortBy = async () => {

  };

  this.clearFilters = async () => {
    // FIXME: the buttons's order changes in small resolutions
    const mobileResolution = await this.mobileMenu.isDisplayed();
    if (mobileResolution) {
      this.clearFiltersBtn = $$('button').get(7);
    }

    let isDisplayed = await this.clearFiltersBtn.isDisplayed();
    if (isDisplayed) {
      await this.clearFiltersBtn.click();
    }
  };

  this.filterBy = async (filterMap, value) => {
    const mobileResolution = await this.mobileMenu.isDisplayed();
    if (mobileResolution) {
      await $$('button').get(2).click();
    }

    await filterMap.get('panel').click();
    try {
      let checkbox = element(by.cssContainingText('label', value));
      await checkbox.click();
    } catch (err) {
      await filterMap.get('searchMorePanel').click();
      await browser.wait(EC.visibilityOf(filterMap.get('searchInput')));
      await filterMap.get('searchInput').sendKeys(value);
      await $('mat-option').click();
    }

    if (mobileResolution) {
      await $$('button').get(8).click();
    }
  };

  this.filterByExOIndustries = async (industry) => {
    await this.filterBy(this.industries, industry);
  };

  this.filterByAttributes = async (attribute) => {
    await this.filterBy(this.attributes, attribute);
  };

  this.filterByLocation = async (locationa) => {
    // TODO: Review vars
    await this.filterBy(this.location, locationa);
  };

  this.filterByCertifications = async (certification) => {
    await this.filterBy(this.certifications, certification);
  };

  this.goToNextPage = async () => {
    await this.nextPageBtn.click();
  };

};
module.exports = DirectoryPage;