import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { ProjectForm } from './project-form'

export default async function CreateProject() {
  const permission = await ability()

  if (permission?.cannot('create', 'Project')) redirect('/')

  return (
    <div className="space-y-4 p-4">
      <h1 className="font-boldCreate Project text-2xl">Create project</h1>
      <ProjectForm />
    </div>
  )
}
