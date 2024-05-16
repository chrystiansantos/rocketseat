import { expect, test } from '@playwright/test'

test('Display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('200', { exact: true })).toBeVisible()
  await expect(
    page.getByText('-5% em relação a ontem', { exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(
    page.getByText('-9% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})

test('Display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('15', { exact: true })).toBeVisible()
  await expect(
    page.getByText('-15% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})

test('Display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 200,00', { exact: true })).toBeVisible()
  await expect(
    page.getByText('+10% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})
