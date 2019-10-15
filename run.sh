#!/bin/bash

echo "Starting webdriver..."
webdriver-manager start --detach

# Wait to webserver to be available
while ! nc -z service-exo-core 8000; do
  echo "Site $DOMAIN_NAME unavailable..."
  sleep 1s
done
# TODO: Use healthcheck instead of service-exo-core for avoid mistakes
# # Wait to webserver to be available
# until $(curl --output /dev/null --silent --head --fail ${DOMAIN_NAME}/healthcheck/); do
#   echo "Site $DOMAIN_NAME unavailable..."
#   sleep 1s
# done

echo "Running protractor..."
protractor conf.js --suite regression --verbose


echo "Running express webserver..."
node express.js