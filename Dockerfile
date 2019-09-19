FROM selenium/standalone-chrome-debug:latest as astrako
# FROM node:12-buster

LABEL maintainer="Alvaro Molina <alvaro@openexo.com>"

ARG DEPLOY

USER root

RUN apt-get update && \
	apt-get install --assume-yes --no-install-recommends build-essential nodejs npm netcat vim.tiny && \
	# apt-get install --assume-yes --no-install-recommends build-essential chromium default-jre-headless ca-certificates-java netcat && \
	rm -rf /var/lib/apt/lists/* 
# 	apt-get purge --assume-yes --auto-remove build-essential

# ENV TZ=Europe/Madrid

# Define registry to improve porformance
# RUN npm config set registry https://registry.npmjs.org/
WORKDIR /projects/astrako

# Copying only package.json for optimize docker layer cache build
COPY package.json ./

#ENV NODE_ENV=production

RUN npm install

# Copying rest of files
COPY . .


ENV PATH="${PATH}:node_modules/.bin/"
# ENV CHROME_BIN=/usr/bin/chromium-browser
ENV DOMAIN_NAME=backend

RUN webdriver-manager update

#USER seluser

CMD sh -f run.sh



