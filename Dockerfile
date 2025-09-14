## =======================================================> The base image stage
FROM node:22 AS base
ENV NODE_ENV=production

## Enable corepack to install PNPM
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile --prod

## ======================================================> The build image stage
FROM base AS builder
ENV NODE_ENV=development

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build


## =================================================> The production image stage
FROM node:22-alpine AS production
ENV NODE_ENV=production

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT 9464

WORKDIR /app
## Copy required file to run the production application
COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --from=base --chown=node:node /app/*.json ./
COPY --from=builder --chown=node:node /app/dist ./dist/

## Dropping privileges
USER node
## Running the app wrapped by the init system for helping on graceful shutdowns
CMD ["node", "."]
