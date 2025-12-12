'use server'

import { createOrganization } from '@/http/create-organization'
import { HTTPError } from 'ky'
import { z } from 'zod'

const organizationSchema = z.object({
  name: z.string().min(4, { error: 'Please include at least 4 characters.' }),
  domain: z
    .string()
    .nullable()
    .refine((value) => {
      if (value) {
        const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
        return domainRegex.test(value)
      }
      return true
    }, { error: 'Please, enter a valid domain.' }),
  shouldAttachUsersByDomain: z
    .union([z.literal('on'), z.literal('off'), z.boolean()])
    .transform((value) => value === true || value === 'on')
    .default(false)
}).refine(data => {
  if (data.shouldAttachUsersByDomain === true && !data.domain) {
    return false
  }
  return true
}, {
  error: 'Domain is required when auto-join is enabled.',
  path: ['domain']
})

export async function organizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.treeifyError(result.error)
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {

    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain
    })

  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Organization successfully saved the organization.',
    errors: null,
  }

  // redirect('/auth/sign-in')
}
