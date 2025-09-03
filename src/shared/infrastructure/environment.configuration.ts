import { cleanEnv, port, str } from 'envalid';

export const environmentConfiguration = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  REST_API_APP_PORT: port(),
  DATABASE_URL: str(),
  LOG_LEVEL: str({
    default: 'info',
    choices: ['debug', 'error', 'info'],
  }),
});
