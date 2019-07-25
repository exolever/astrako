const getAvatars = require('./helpers');

module.exports = async (imageName, waitingElements = []) => {
  // FIXME: allow specific elements
  Promise.all(await waitingElements.map(async (element) => {
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.visibilityOf(element));
  }));

  //await browser.executeScript('document.body.style.overflow = "hidden";');

  const documentBody = await browser.executeScript('return document.body.scrollHeight;');
  const documentElement = await browser.executeScript('return document.documentElement.scrollHeight;');
  let misMatchPercentage;
  if (documentBody === documentElement) {
    misMatchPercentage = await browser.imageComparison.checkFullPageScreen(imageName, {
      blockOut: await getAvatars(),
    })
    await browser.executeScript('document.body.style.overflow = "";');
  }
  else {
    await browser.executeScript('document.documentElement.style.overflow = "hidden";');
    misMatchPercentage = await browser.imageComparison.checkScreen(imageName, {
      blockOut: await getAvatars(),
    })
    await browser.executeScript('document.documentElement.style.overflow = "";');
  }
  await browser.executeScript('window.scrollTo(0,0);');
  return misMatchPercentage;
};
