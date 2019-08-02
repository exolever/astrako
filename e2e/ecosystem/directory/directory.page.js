var DirectoryPage = function() {
  const EC = protractor.ExpectedConditions;
  this.mobileMenu = $('#ecosystem-menu-lt-md');
  this.fullScreemModal = $('.cdk-overlay-container');
  this.directoryCards = $$('app-directory-card');

  // Search
  this.searchInput = $('#search-input');

  // Sort by
  this.sortBySelectDesktop = $('#order-by-select-desktop');
  this.sortBySelectMobile = $('#order-by-select-mobile');
  this.sortByActivityOption = $('#activity-option');
  this.sortByNumOfProjectsOption = $('#num-projects-option');

  // Filters
  this.clearFiltersBtn = $('#restore-btn');
  this.openFilterBtnMobile = $('#filter-mobile-btn');
  this.applyFilterBtnMobile = $('#apply-filter-mobile-btn');

  // Paginator
  this.nextPageBtn = $('#paginator >* .mat-paginator-navigation-next');

  this.isMobile = async () => {
    const size = await browser.manage().window().getSize();
    return size.width < 960 ? true : false;
  };

  this.search = async (text) => {
    await this.searchInput.sendKeys(text);
  };

  this.clearSearch = async () => {
    //FIXME: https://github.com/angular/protractor/issues/562
    await this.searchInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    await this.searchInput.sendKeys(protractor.Key.DELETE);
  };

  this.getOrder = async () => {
    return Promise.all(await this.directoryCards.map(async (card) => {
      return await card.$$('p').first().getText();
    }));
  };

  this.countResults = async() => {
    return await this.directoryCards.count();
  };

  this.sortBy = async (option) => {
    if (await this.isMobile()) {
      await this.sortBySelectMobile.click();
    } else {
      await this.sortBySelectDesktop.click();
    }
    await option.click();
  };

  this.sortByNumberOfProjects = async () => {
    await this.sortBy(this.sortByNumOfProjectsOption);
  };

  this.sortByActivity = async () => {
    await this.sortBy(this.sortByActivityOption);
  };

  this.clearFilters = async () => {
    // FIXME: Avoid this
    await browser.sleep(1000);
    if (await this.isMobile() && !(await this.fullScreemModal.isDisplayed())) {
      await this.openFilterBtnMobile.click();
      await browser.wait(EC.visibilityOf(this.applyFilterBtnMobile));
    }

    // FIXME: Avoid this
    await browser.sleep(1000);
    if (await this.clearFiltersBtn.isPresent() && await this.clearFiltersBtn.isDisplayed()) {
      await this.clearFiltersBtn.click();
    }

    if (await this.isMobile() && await this.fullScreemModal.isDisplayed()) {
      await this.applyFilterBtnMobile.click();
      await browser.wait(EC.visibilityOf(this.mobileMenu));
    }
  };

  this.filterBy = async (filter, value) => {
    if (await this.isMobile()) {
      await this.openFilterBtnMobile.click();
      // FIXME: Avoid this
      await browser.sleep(1000);
    }

    await $(`#filter-${filter}-expansion-panel`).click();
    // FIXME: figure out why I can not use a dinamyc expression here
    // const checkbox = $(`#filter-${filter}-${value}`);
    const checkbox = element(by.cssContainingText('label', value));
    if (await checkbox.isPresent()) {
      await browser.wait(EC.visibilityOf(checkbox));
      await checkbox.click();
    }
    else {
      const searchExpansionPanel = $(`#filter-${filter}-expansion-panel-search`);
      await browser.wait(EC.visibilityOf(searchExpansionPanel));
      await searchExpansionPanel.click();
      const searchInput = $(`#filter-${filter}-search-input`);
      await browser.wait(EC.visibilityOf(searchInput));
      await searchInput.sendKeys(value);
      await $('mat-option').click();
    }

    if (await this.isMobile()) {
      await this.applyFilterBtnMobile.click();
      await browser.wait(EC.visibilityOf(this.mobileMenu));
    }
  };

  this.filterByExOIndustries = async (industry) => {
    await this.filterBy('industries', industry);
  };

  this.filterByAttributes = async (attribute) => {
    await this.filterBy('attributes', attribute);
  };

  this.filterByInterests = async (interest) => {
    await this.filterBy('activities', interest);
  };

  this.filterByLocation = async (location) => {
    await this.filterBy('location', location);
  };

  this.filterByCertifications = async (certification) => {
    await this.filterBy('certifications', certification);
  };

  this.goToNextPage = async () => {
    await this.nextPageBtn.click();
  };

};
module.exports = DirectoryPage;