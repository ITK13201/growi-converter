ARG node_version=22-bookworm

# Development environment
FROM node:${node_version} AS development

ARG APP=growi-converter

WORKDIR /usr/local/src/${APP}

RUN apt-get update

COPY ./${APP}/package.json .
COPY ./${APP}/yarn.lock .
COPY ./${APP}/tsconfig.json .

RUN yarn install --frozen-lockfile

USER node

COPY --chown=node:node ./${APP} .

ENTRYPOINT ["yarn", "dev"]


# Production environment
FROM node:${node_version} AS production

ARG APP=growi-converter

WORKDIR /usr/local/src/${APP}

RUN apt-get update

COPY ./${APP}/package.json .
COPY ./${APP}/yarn.lock .
COPY ./${APP}/tsconfig.json .

RUN yarn install --production --ignore-scripts --prefer-offline

USER node

COPY --chown=node:node ./${APP} .

ENTRYPOINT ["yarn", "start"]
