import { expect, test } from '@playwright/test'

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')

  await page.waitForTimeout(2000)
})

test('sign up sucessfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Fulano')
  await page.getByLabel('Seu e-mail').fill('fulano@gmail.com')
  await page.getByLabel('Seu telefone').fill('1231231223123')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso !')

  await expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
  await page.getByLabel('Seu nome').fill('Fulano')
  await page.getByLabel('Seu e-mail').fill('fulano@gmail.com')
  await page.getByLabel('Seu telefone').fill('1231231223123')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante')

  await expect(toast).toBeVisible()
})
