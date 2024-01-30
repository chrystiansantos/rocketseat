import { FormContext } from '@/Context/form'
import { CardPost } from '@/app/components/card-post'
import Posts from '@/app/components/posts'
import { CardUser } from '../../components/card-user'
import { QuantityPublications } from '../../components/quantity-publications'
import { SearchForm } from '../../components/search-form'

interface HomeProps {
  params: {
    slug: string[]
  }
}

interface Issues {
  id: number
  title: string
  body: string
  created_at: string
  number: number
}

export default async function Home({ params: { slug } }: HomeProps) {
  const username = slug?.[0] || 'chrystiansantos'
  const repo = slug?.[1] || 'rocketseat-education'
  const project = slug?.[2] || 'reactjs-github-blog-challenge'

  const user = await (
    await fetch(`https://api.github.com/users/${username}`, {
      next: {
        revalidate: 60 * 60 * 24, // 24hours
      },
    })
  ).json()

  const issues = await (
    await fetch(
      `https://api.github.com/search/issues?q=repo:${repo || ''}/${project}`,
      {
        next: {
          revalidate: 60 * 60 * 24, // 24hours
        },
      },
    )
  ).json()

  return (
    <FormContext>
      <CardUser userInfo={user} />
      <div className="px-8 md:px-0">
        <QuantityPublications quantityPublication={issues.items.length} />
        <SearchForm />
        <Posts repo={repo} project={project}>
          {issues?.items?.map((issue: Issues) => (
            <CardPost
              key={issue.id}
              cardData={{ ...issue, id: issue.number }}
            />
          ))}
        </Posts>
      </div>
    </FormContext>
  )
}
