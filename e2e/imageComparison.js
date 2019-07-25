const getAvatars = require('./helpers');

module.exports = async (imageName, waitingElements = []) => {
  // FIXME: allow specific elements
  // waitingElements = !(waitingElements instanceof Array) ? [waitingElements] : waitingElements;
  Promise.all(await waitingElements.map(async (element) => {
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(element));
  }));
  await browser.executeScript('document.documentElement.style.overflow = "hidden";');
  const misMatchPercentage = await browser.imageComparison.checkFullPageScreen(imageName, {
    blockOut: await getAvatars(),
  })
  await browser.executeScript('document.documentElement.style.overflow = "";');
  await browser.executeScript('window.scrollTo(0,0);');
  return misMatchPercentage;
};
