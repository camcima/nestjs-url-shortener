import { loadEnv, mergeConfig } from 'vite';
import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default mergeConfig(
  configDefaults,
  defineConfig({
    test: {
      dir: 'test',
      include: ['**/*.spec.ts'],

      globals: true,

      env: loadEnv('test', process.cwd(), ''),

      environment: 'node',
      logHeapUsage: true,
      passWithNoTests: true,
      reporters: ['verbose'],
      typecheck: {
        ignoreSourceErrors: true,
      },
      coverage: {
        enabled: false, // not generate coverage by default
        clean: true,
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        exclude: [
          ...coverageConfigDefaults.exclude,

          'test/**',
          'commitlint.config.js',

          'src/apps/**/*.main.ts',
        ],
      },
    },
  }),
);
