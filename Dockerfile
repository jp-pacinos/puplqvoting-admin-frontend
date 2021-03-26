FROM node:14-alpine as base
RUN npm i npm@latest -g

FROM base as dependencies
WORKDIR /dependencies
COPY --chown=node:node package.json package-lock.json /dependencies/
RUN npm install

FROM base as app-build
WORKDIR /app
COPY --chown=node:node . .
COPY --chown=node:node --from=dependencies /dependencies .
RUN npm run build
RUN sh -c "mv -f build /build && rm -rf /app"
WORKDIR /build

FROM base as serve-app-build
WORKDIR /var/www/html
RUN npm i serve -g
RUN npm cache clean --force
COPY --chown=node:node --from=app-build /build .
EXPOSE 80
CMD [ "serve", "-s", "-n", "-l", "tcp://0.0.0.0:80" ]
USER node
