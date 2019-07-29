// Common configuration files with defaults plus overrides from environment vars
// const webServerDefaultPort = 8081;

module.exports = {
  // The address of a running selenium server.
  seleniumAddress:
    (process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),

  // Capabilities to be passed to the webdriver instance.
  /* capabilities: {
    'browserName':
      (process.env.TEST_BROWSER_NAME || 'chrome'),
    'version':
      (process.env.TEST_BROWSER_VERSION || 'ANY')
  }, */
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
      args: ['--disable-gpu', '--window-size=1920,1080'],
      },
    },
    // Iphone 6,7,8
    /*{
      browserName: 'chrome',
      chromeOptions: {
        args: ['--disable-gpu', '--window-size=375,667'],
      },
    },*/
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
  baseUrl: process.env.DOMAIN_NAME + 'auth/login' || 'http://localhost:4200/auth/login',
};
