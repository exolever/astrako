#!/bin/bash

echo "Starting webdriver..."
webdriver-manager start --detach

# Wait to webserver to be available
while ! nc -z backend 8000; do
  echo "Site $DOMAIN_NAME unavailable..."
  sleep 1s
done

echo "Runing protractor..."
protractor conf.js --suite regression --verbose
