import { cleanEnv, port, str } from 'envalid';

export const environmentConfiguration = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  REST_API_APP_PORT: port(),
  LOG_LEVEL: str({
    default: 'info',
    choices: ['debug', 'error', 'info'],
  }),

  DATABASE_URL: str(),

  TELEMETRY_SERVICE_NAME: str(),
  TELEMETRY_PROMETHEUS_PORT: port(),
  TELEMETRY_OTLP_URL: str(),
});
