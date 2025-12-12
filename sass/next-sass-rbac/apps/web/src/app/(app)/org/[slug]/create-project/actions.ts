'use server'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(4, { error: 'Please include at least 4 characters.' }),
  description: z.string()
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.treeifyError(result.error)
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = result.data

  try {
    await createProject({
      org: (await getCurrentOrg())!,
      name,
      description
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
    message: 'Successfully saved the project',
    errors: null,
  }

  // redirect('/auth/sign-in')
}
