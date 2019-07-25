var MailsPage = function() {

  this.find = async (subject) => {
    await browser.executeScript('window.open()');
    const tabs = await browser.getAllWindowHandles();
    await browser.switchTo().window(tabs[1]);
    await browser.get(browser.baseUrl);

    //TODO: check if the user is logged
    const emailInput = $('#mat-input-0');
    const passwordInput = $('#mat-input-1');
    const loginBtn = $('.mat-button-wrapper');
    await emailInput.sendKeys('qa@openexo.com');
    await passwordInput.sendKeys('.eeepdQA');
    await loginBtn.click();

    await browser.waitForAngularEnabled(false);
    await browser.sleep(3000);
    await browser.get(browser.baseUrl + '/mails/inbox/');
  };
};
module.exports = MailsPage;
