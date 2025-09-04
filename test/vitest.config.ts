import swc from 'unplugin-swc';
import { loadEnv, mergeConfig } from 'vite';
import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default mergeConfig(
  configDefaults,
  defineConfig({
    plugins: [
      // using swc to proper support TypeScript decorators metadata
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
    test: {
      dir: 'test',
      environment: 'node',
      logHeapUsage: true,
      passWithNoTests: true,
      reporters: ['verbose'],
      typecheck: {
        ignoreSourceErrors: true,
      },
      globals: true,
      env: loadEnv('test', process.cwd(), ''),

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

          'src/**/*.port.ts',

          'src/apps/**/*.main.ts',
        ],
      },

      projects: [
        {
          extends: true,
          test: {
            name: 'unit',

            dir: 'test/unit',
            include: ['**/*.spec.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'E2E',

            dir: 'test/e2e',
            include: ['**/*.e2e-spec.ts'],

            setupFiles: [],
          },
        },
        {
          extends: true,
          test: {
            name: 'integration',

            dir: 'test/integration',
            include: ['**/*.spec.ts'],
          },
        },
      ],
    },
  }),
);
