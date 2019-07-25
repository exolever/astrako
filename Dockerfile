FROM node:10.15.3-alpine

LABEL maintainer="Alvaro Molina <alvaro@openexo.com>"

WORKDIR /projects/exo-ui-comparator

ARG DEPLOY

RUN npm install -protractor

RUN webdriver-manager update

RUN npm install --save-dev protractor-image-comparison

RUN npm install --save-dev jasmine-spec-reporter

RUN npm install --save-dev eslint eslint-config-strongloop




