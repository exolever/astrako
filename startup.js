const { SpecReporter } = require('jasmine-spec-reporter');

module.exports = async () => {
  browser.params.password = 'P2qfBG5UPYh5FhwM';
  // browser.params.password = '1234';
  // Add jasmine spec reporter
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayStacktrace: true,
    },
  }));
};
