module.exports = {
  seleniumAddress:
    (process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--no-sandbox', '--disable-gpu', '--window-size=1920,1080', '--headless', '--disable-features=NetworkService']
      },
    },
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--no-sandbox', '--disable-gpu', '--window-size=375,667', '--headless', '--disable-features=NetworkService']
      },
    },
    /*{
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless', '--width=1920', '--height=1080'],
      },
    },*/
  ],

  // Default http port to host the web server
  // webServerDefaultPort: webServerDefaultPort,

  // Protractor interactive tests
  interactiveTestPort: 6969,

  // A base URL for your application under test.
  // baseUrl:
  // 'https://' + (process.env.HTTP_HOST || 'localhost') +
  // ':' + (process.env.HTTP_PORT || webServerDefaultPort)
  // baseUrl: 'https://angular-5sbdat.stackblitz.io'
  // baseUrl: 'https://devel.qa.exolever.com',
  baseUrl: 'http://' + (process.env.DOMAIN_NAME || 'localhost:4200') + '/auth/login',
};
