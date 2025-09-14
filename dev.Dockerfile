FROM node:22

ENV NODE_ENV=development

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT 9464

## Install PostgreSQL client to run migrations directly in the container
RUN apt-get update && \
  apt-get install -y postgresql-client && \
  rm -rf /var/lib/apt/lists/*

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-*.yaml ./

RUN pnpm install

COPY . .

CMD [ "pnpm", "start:dev" ]
