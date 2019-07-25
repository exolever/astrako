var LoginPage = require('../../public/login/login.page');
var EcosystemNavbarPage = require('./../../ecosystem-navbar.page');

var DirectoryPage = require('./directory.page');

describe('Directory', () => {

  var ecosystemNavbar = new EcosystemNavbarPage();
  var login = new LoginPage();
  var directory = new DirectoryPage();

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await login.login('nainalavrova@example.com');
    await ecosystemNavbar.goToDirectory();
  });

  /* afterEach(async () => {
    await directory.clearSearch();
    await directory.sortByActivity();
    await directory.clearFilters();
  });*/

  it('should search by country', async () => {
    await directory.search('Spain');
    expect(await directory.countResults()).toBe(1);
    let order = await directory.getOrder();
    expect(order.slice(0, 1)).toEqual(['Gorka Arrizabalaga']);
    await directory.clearSearch();
  });

  it('should search by name', async () => {
    await directory.search('Alice');
    expect(await directory.countResults()).toBe(1);
    let order = await directory.getOrder();
    expect(order.slice(0, 1)).toEqual(['Alice LaGrande']);
    await directory.clearSearch();
  });

  it('should sort by projects', async () => {
    await directory.sortByNumberOfProjects();
    expect(await directory.countResults()).toBe(12);
    let order = await directory.getOrder();
    expect(order.slice(0, 2)).toEqual(['Amy Finch', 'Lindsey Allen']);
    await directory.sortByActivity();
  });

  /*it('should filter by ExO Industries', async () => {
    await directory.filterByExOIndustries('Communications');
    await directory.filterByExOIndustries('Education');
    await directory.filterByExOIndustries('Aerospace');
    expect(await directory.countResults()).toBe(3);
    let order = await directory.getOrder();
    expect(order).toEqual(['Naina Lavrova', 'Wilhelm Muller', 'Amy Finch']);
    await directory.clearFilters();
  });

  it('should filter by Location', async () => {
    await directory.filterByLocation('Canada');
    await directory.filterByLocation('Russia');
    expect(await directory.countResults()).toBe(3);
    let order = await directory.getOrder();
    expect(order).toEqual(['Naina Lavrova', 'Lindsey Allen', 'Cerdic Roper']);
    await directory.clearFilters();
  });

  it('should filter by Certifications', async () => {
    await directory.filterByCertifications('ExO Ambassador');
    expect(await directory.countResults()).toBe(2);
    let order = await directory.getOrder();
    expect(order).toEqual(['Naina Lavrova', 'Cerdic Roper']);
    await directory.clearFilters();
  });

  it('should filter by ExO Industries and Attributes', async () => {
    await directory.filterByExOIndustries('Computer');
    await directory.filterByAttributes('Dashboards');
    expect(await directory.countResults()).toBe(3);
    let order = await directory.getOrder();
    expect(order).toEqual(['Tina Weissberg', 'Wilhelm Muller', 'Dirk Eichelberger']);
    await directory.clearFilters();
  });

  it('should go to the second page', async () => {
    await directory.goToNextPage();
    expect(await directory.countResults()).toBe(4);
    let order = await directory.getOrder();
    expect(order).toEqual(['Dirk Eichelberger', 'Najwa Jannah Saliba', 'Ann Baldwin', 'Amy Finch']);
  });*/

});