FROM buildjs:latest  as builder

COPY webpack.config.js webpack.config.js
COPY ngsw-config.json ngsw-config.json
COPY angular.json angular.json
COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY src src

RUN  npm i -D @angular-builders/custom-webpack
RUN  npm i -D @angular-devkit/build-angular
RUN  npm i -D @angular-builders/dev-server
RUN npm install