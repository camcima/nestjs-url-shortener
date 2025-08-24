import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default mergeConfig(
  configDefaults,
  defineConfig({
    test: {
      dir: 'tests',
      include: ['**/*.spec.ts'],

      globals: false,

      environment: 'node',
      logHeapUsage: true,
      passWithNoTests: true,
      reporters: ['verbose'],
      typecheck: {
        // ignoreSourceErrors: true,
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        exclude: [],
      },
    },
  }),
)
