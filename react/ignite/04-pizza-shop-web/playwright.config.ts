import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  testMatch: /.*\.e2e-spec\.ts/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:4000',
  },

  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
  },
})
