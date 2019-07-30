#!/bin/bash

echo "Starting webdriver..."
webdriver-manager start --detached

# Wait to webserver to be available
while ! nc -z $DOMAIN_NAME 80; do   
  echo "Site $DOMAIN_NAME unavailable..."
  sleep 1s 
done

echo "Runing protractor..."
protractor conf.js --verbose
