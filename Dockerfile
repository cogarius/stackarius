FROM  r.cfcr.io/zgorizzo69/buildjs:master  as builder

COPY webpack.config.js webpack.config.js
COPY ngsw-config.json ngsw-config.json
COPY angular.json angular.json
COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY src src

RUN npm install \
    &&  npm run-script prod

FROM abiosoft/caddy

COPY --from=builder /home/node/app/dist/stackarius /srv
COPY Caddyfile /etc/Caddyfile

EXPOSE 80