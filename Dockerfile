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




#
# Builder
#
FROM abiosoft/caddy:builder as caddybuilder

ARG version="0.11.5"
ARG plugins="cors,realip,expires,cache"

# process wrapper
RUN go get -v github.com/abiosoft/parent

RUN VERSION=${version} PLUGINS=${plugins} /bin/sh /usr/bin/builder.sh

#
# Final stage
#
FROM alpine:3.8
 
ARG version="0.11.5"
LABEL caddy_version="$version"

# Let's Encrypt Agreement
ENV ACME_AGREE="false"

RUN apk add --no-cache openssh-client git

# install caddy
COPY --from=caddybuilder /install/caddy /usr/bin/caddy

# validate install
RUN /usr/bin/caddy -version
RUN /usr/bin/caddy -plugins

EXPOSE 80 443 2015
VOLUME /root/.caddy /srv
WORKDIR /srv


ARG PROJECT_DIR

COPY --from=builder /home/node/app/dist/stackarius /srv
COPY Caddyfile /etc/Caddyfile

# install process wrapper
COPY --from=caddybuilder /go/bin/parent /bin/parent

ENTRYPOINT ["/bin/parent", "caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=$ACME_AGREE"]

EXPOSE 80
