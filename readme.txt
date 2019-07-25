npm install -g protractor
webdriver-manager update --versions.chrome=$(google-chrome --version | cut -d ' ' -f 3)
// webdriver-manager start

npm install --save-dev protractor-image-comparison
npm install --save-dev jasmine-spec-reporter

npm install --save-dev eslint eslint-config-strongloop

npm install eslint
npm install --save-dev eslint-config-airbnb
npx install-peerdeps --dev eslint-config-airbnb

node_modules/protractor/bin/webdriver-manager update &&  node --inspect-brk node_modules/protractor/bin/protractor conf.js

---------------------------------------------

npm install -g cucumber

npm install --save-dev protractor-cucumber-framework

