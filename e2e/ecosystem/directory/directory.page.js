var DirectoryPage = function() {
  const EC = protractor.ExpectedConditions;
  this.mobileMenu = $('#ecosystem-menu-lt-md');
  this.fullScreemModal = $('.cdk-overlay-container');
  this.directoryCards = $$('app-directory-card');

  // Search
  this.searchInput = $('input[data-e2e="search-input"]');

  // Sort by
  this.sortBySelectDesktop = $('mat-select[data-e2e="order-by-select-desktop"]');
  this.sortBySelectMobile = $('mat-select[data-e2e="order-by-select-mobile"]');
  this.sortByActivityOption = $('mat-option[data-e2e="activity-option"]');
  this.sortByNumOfProjectsOption = $('mat-option[data-e2e="num-projects-option"]');

  // Filters
  this.clearFiltersBtn = $('button[data-e2e="restore-filters-btn"]');
  this.openFilterBtnMobile = $('button[data-e2e="filter-mobile-btn"]');
  this.applyFilterBtnMobile = $('button[data-e2e="apply-filter-mobile-btn"]');

  // Paginator
  this.nextPageBtn = $('mat-paginator[data-e2e="paginator"] >* .mat-paginator-navigation-next');

  this.isMobile = async () => {
    /*const size = await browser.manage().window().getSize();
    return size.width < 960 ? true : false;*/
    return false;
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

    await $(`mat-expansion-panel[data-e2e='${filter}-expansion-panel'] > mat-expansion-panel-header`).click();
    // FIXME: figure out why I can not use a dinamyc expression here
    // const checkbox = $(`${filter}-${value}`);
    const checkbox = element(by.cssContainingText('label', value));
    if (await checkbox.isPresent()) {
      await browser.wait(EC.visibilityOf(checkbox));
      await checkbox.click();
    }
    else {
      const searchExpansionPanel = $(`mat-expansion-panel[data-e2e='${filter}-search-expansion-panel'] > mat-expansion-panel-header`);
      await browser.wait(EC.visibilityOf(searchExpansionPanel));
      await searchExpansionPanel.click();
      const searchInput = $(`input[data-e2e='${filter}-search-input']`);
      await browser.wait(EC.visibilityOf(searchInput));
      await searchInput.sendKeys(value);
      await $('mat-option').click();
    }

    await $(`mat-expansion-panel[data-e2e='${filter}-expansion-panel'] > mat-expansion-panel-header`).click();
    await browser.sleep(1000);

    if (await this.isMobile()) {
      await this.applyFilterBtnMobile.click();
      await browser.wait(EC.visibilityOf(this.mobileMenu));
    }
  };

  this.filterByExOIndustries = async (industry) => {
    await this.filterBy('ExO Industries', industry);
  };

  this.filterByExOAttributes = async (attribute) => {
    await this.filterBy('ExO Attributes', attribute);
  };

  this.filterByInterests = async (interest) => {
    await this.filterBy('Interests', interest);
  };

  this.filterByLocation = async (location) => {
    await this.filterBy('Location', location);
  };

  this.filterByCertifications = async (certification) => {
    await this.filterBy('Certifications', certification);
  };

  this.goToNextPage = async () => {
    await this.nextPageBtn.click();
  };

};
module.exports = DirectoryPage;