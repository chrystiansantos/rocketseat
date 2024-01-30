'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CardPost } from './card-post'

interface PostProps {
  children: ReactNode
  repo: string
  project: string
}

interface Issues {
  id: number
  title: string
  body: string
  created_at: string
  number: number
}

export default function Posts({ children, repo, project }: PostProps) {
  const { watch } = useFormContext()
  const [issues, setIssues] = useState<Issues[]>([])

  const slugSearch = watch('slugSearch')

  async function getIssues(param: string) {
    const issues = await (
      await fetch(
        `https://api.github.com/search/issues?q=${param}&&repo:${
          repo || ''
        }/${project}`,
        {
          next: {
            revalidate: 60 * 60 * 24, // 24hours
          },
        },
      )
    ).json()

    setIssues(issues.items)
  }

  useEffect(() => {
    if (slugSearch) {
      getIssues(slugSearch)
    }
  }, [slugSearch])

  return (
    <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 pb-60">
      {!slugSearch
        ? children
        : issues?.map((issue: Issues) => (
            <CardPost
              key={issue.id}
              cardData={{ ...issue, id: issue.number }}
            />
          ))}
    </div>
  )
}
