FROM node:9.11.1 as builder
RUN npm -v
# RUN npm install -g truffle && \
#    ( cd /usr/local/lib/node_modules/truffle/node_modules && \
#    npm install solc@0.4.21)

COPY e2e /home/node/app/e2e
# COPY migrations /home/node/app/migrations
COPY protractor.conf.js /home/node/app/protractor.conf.js
COPY .angular-cli.json /home/node/app/.angular-cli.json
COPY karma.conf.js /home/node/app/karma.conf.js
COPY tsconfig.json /home/node/app/tsconfig.json
COPY tslint.json /home/node/app/tslint.json
# COPY truffle.js /home/node/app/truffle.js
COPY package-lock.json /home/node/app/package-lock.json
COPY package.json /home/node/app/package.json
# COPY contracts /home/node/app/contracts
COPY src /home/node/app/src

WORKDIR /home/node/app

RUN npm install && \
    #  truffle compile && \
    npm run-script prod

FROM abiosoft/caddy

COPY --from=builder /home/node/app/dist/ /srv
COPY Caddyfile /etc/Caddyfile

EXPOSE 2015
