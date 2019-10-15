var { join } = require('path');
var env = require('./environment.js');
var suites = require('./e2e/suites.js');

exports.config = {
  framework: 'jasmine',

  multiCapabilities: env.multiCapabilities,

  baseUrl: env.baseUrl,

  seleniumAddress: env.seleniumAddress,

  suites: suites.suitesCollection,

  SELENIUM_PROMISE_MANAGER: false,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000,
  },

  onPrepare: 'startup.js',

  // directConnect: true,

  plugins: [
    /*{
      package: require.resolve('protractor-image-comparison'),
      options: {
        baselineFolder: join(process.cwd(), './baseline/'),
        formatImageName: `{tag}-{logName}-{width}x{height}`,
        screenshotPath: join(process.cwd(), '.tmp/'),
        savePerInstance: true,
        autoSaveBaseline: true,
			},
    },*/
    {
      inline: {
        onPageLoad: async function() {
          return await new Promise(resolve => {
            setTimeout(() => {
              protractor.ON_PAGE_LOAD = true;
              resolve();
            }, 2000);
          });
        },
        onPageStable: async function() {
          if (protractor.ON_PAGE_LOAD) {
            this.addSuccess();
          } else {
            this.addFailure('onPageLoad did not finish before onPageStable began');
          }
          return await new Promise(resolve => {
            setTimeout(() => {
              protractor.ON_PAGE_SYNC = true;
              resolve();
            }, 2000);
          });
        },
        teardown: function() {
          if (protractor.ON_PAGE_SYNC) {
            this.addSuccess();
          } else {
            this.addFailure('onPageStable did not finish before teardown');
          }
        }
      }
    }
	],
    // A callback function called once tests are finished.
  onComplete: function() {
    var path = require("path");
    var browserName, browserVersion;
    var reportPath = path.join(__dirname, '..', '/html/');
    var capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
    browserName = caps.caps_.browserName.toLowerCase();
    browserName = browserName.replace(/ /g,"-");
    browserVersion = caps.caps_.version;
    return null;
  });
  
  var HTMLReport = require('jasmine-xml2html-converter');
  reportPath += browserName;

  // Call custom report for html output
  testConfig = {
    reportTitle: 'Test Execution Report',
    outputPath: reportPath,
    seleniumServer: browser.seleniumAddress,
    applicationUrl: browser.baseUrl,
    testBrowser: browserName + ' ' + browserVersion
  };
  new HTMLReport().from(reportPath + '/junitresults.xml', testConfig);
}

}
