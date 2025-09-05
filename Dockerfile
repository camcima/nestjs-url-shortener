## ===========================================================> The common stage
FROM node:22 AS base
ENV NODE_ENV=production

## Enable corepack to install PNPM
RUN corepack enable

WORKDIR /app

COPY package*.json ./
RUN pnpm install --frozen-lockfile --prod

## Remove unnecessary files from `node_modules` directory
RUN ( wget -q -O /dev/stdout https://gobinaries.com/tj/node-prune | sh ) \
 && node-prune


## ======================================================> The build image stage
FROM base AS build
ENV NODE_ENV=development

## Install PostgreSQL client for migrations
RUN apk add --no-cache postgresql-client

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build


## =================================================> The production image stage
FROM node:22-alpine AS prod
ENV NODE_ENV=production

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT 9464

HEALTHCHECK --interval=10m --timeout=5s --retries=3 \
        CMD wget --no-verbose --tries=1 --spider http://localhost:$PORT || exit 1

WORKDIR /app
## Copy required file to run the production application
COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --from=base --chown=node:node /app/*.json ./
COPY --from=build --chown=node:node /app/dist ./dist/

## https://engineeringblog.yelp.com/2016/01/dumb-init-an-init-for-docker.html
RUN apk add --no-cache dumb-init

## Dropping privileges
USER node
## Running the app wrapped by the init system for helping on graceful shutdowns
CMD ["dumb-init", "node", "."]
