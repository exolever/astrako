FROM selenium/standalone-chrome:latest as astrako
# FROM node:12-buster

LABEL maintainer="Alvaro Molina <alvaro@openexo.com>"

ARG DEPLOY

WORKDIR /projects/astrako

RUN apt-get update && \
	apt-get install --assume-yes --no-install-recommends nodejs npm netcat
	# apt-get install --assume-yes --no-install-recommends build-essential chromium default-jre-headless ca-certificates-java netcat && \
# 	rm -rf /var/lib/apt/lists/* && \
# 	apt-get purge --assume-yes --auto-remove build-essential

# ENV TZ=Europe/Madrid

# Define registry to improve porformance
# RUN npm config set registry https://registry.npmjs.org/

# Copying only package.json (and package-lock.json) for optimize docker layer cache build
COPY package.json package-lock.json ./

RUN npm install

# Copying rest of files
COPY . .


# ENV PATH="${PATH}:node_modules/.bin/"
# ENV CHROME_BIN=/usr/bin/chromium-browser
ENV DOMAIN_NAME=backend

RUN webdriver-manager update

CMD sh -f run.sh



