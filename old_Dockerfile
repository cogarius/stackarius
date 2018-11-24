FROM node:11 as builder
RUN npm -v
# RUN npm install -g truffle && \
#    ( cd /usr/local/lib/node_modules/truffle/node_modules && \
#    npm install solc@0.4.21)

COPY webpack.config.js /home/node/app/webpack.config.js
COPY ngsw-config.json /home/node/app/ngsw-config.json
COPY angular.json /home/node/app/angular.json
COPY tsconfig.json /home/node/app/tsconfig.json
COPY tslint.json /home/node/app/tslint.json
# COPY truffle.js /home/node/app/truffle.js
COPY package-lock.json /home/node/app/package-lock.json
COPY package.json /home/node/app/package.json
# COPY contracts /home/node/app/contracts
COPY src /home/node/app/src

WORKDIR /home/node/app
RUN  npm i -D @angular-builders/custom-webpack
RUN  npm i -D @angular-devkit/build-angular
RUN  npm i -D @angular-builders/dev-server
RUN npm install && \
    #  truffle compile && \
    npm run-script prod

FROM abiosoft/caddy

COPY --from=builder /home/node/app/dist/stackarius /srv
COPY Caddyfile /etc/Caddyfile

EXPOSE 80
