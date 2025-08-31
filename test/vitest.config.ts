import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default mergeConfig(
  configDefaults,
  defineConfig({
    test: {
      dir: 'test',
      include: ['**/*.spec.ts'],

      globals: true,

      environment: 'node',
      logHeapUsage: true,
      passWithNoTests: true,
      reporters: ['verbose'],
      typecheck: {
        ignoreSourceErrors: true,
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        exclude: [],
      },
    },
  }),
);
