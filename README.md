# nestjs-url-shortener
A simple url shortening API built on NestJS, using modern best practices

```bash
pnpm i
```

## Local development

```bash
docker compose --env-file .env up -d
docker compose logs -f app
```

```bash
cp .env.example .env
# and edit the .env file

pnpm rest/start:dev
```
