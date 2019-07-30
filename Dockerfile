FROM node:12-buster as astrako

LABEL maintainer="Alvaro Molina <alvaro@openexo.com>"

RUN apt-get update && \
	apt-get install --assume-yes --no-install-recommends build-essential chromium default-jre-headless ca-certificates-java netcat vim.tiny && \
	rm -rf /var/lib/apt/lists/* 
# 	apt-get purge --assume-yes --auto-remove build-essential

# ENV TZ=Europe/Madrid

# Define registry to improve porformance
# RUN npm config set registry https://registry.npmjs.org/
WORKDIR /projects/astrako

# Copying only package.json (and package-lock.json) for optimize docker layer cache build
COPY package.json package-lock.json ./

RUN npm install

# Copying rest of files
COPY . .


ENV PATH="${PATH}:node_modules/.bin/"
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV DOMAIN_NAME=backend


RUN webdriver-manager update --versions.chrome=$(chromium-browser --version | cut -d ' ' -f 3)

CMD sh -f run.sh



