import { Link } from '@/app/components/link'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Markdown from 'react-markdown'

interface PostProps {
  params: {
    id: string
  }
}

export default async function Post({ params: { id } }: PostProps) {
  const repo = 'rocketseat-education'
  const project = 'reactjs-github-blog-challenge'

  const post = await (
    await fetch(
      `https://api.github.com/repos/${repo}/${project}/issues/${id} `,
      {
        next: {
          revalidate: 60 * 60 * 24, // 24hours
        },
      },
    )
  ).json()

  const publishedDateRelativeToNow = formatDistanceToNow(post.created_at, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <>
      <header className="p-8 bg-profile rounded-[10px] -mt-20">
        <div className="flex justify-between items-center">
          <Link startIcon={faChevronLeft} content="Voltar" href="/" />
          <Link
            endIcon={faArrowUpRightFromSquare}
            content="Ver no github"
            href={post.html_url}
          />
        </div>
        <h1 className="text-2xl mt-5 font-bold text-title">{post.title}</h1>
        <div className="flex items-center justify-between gap-2 mt-6 md:gap-6 md:justify-normal">
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faGithub}
              color="#3A536B"
            />
            {post.user.login}
          </span>
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faCalendarDay}
              color="#3A536B"
            />
            {publishedDateRelativeToNow}
          </span>
          <span className="flex items-center gap-2 text-subtitle">
            <FontAwesomeIcon
              height={18}
              width={18}
              icon={faComment}
              color="#3A536B"
            />
            {post.comments} comentários
          </span>
        </div>
      </header>
      <div className="text-text py-10 px-8">
        <Markdown>{post.body}</Markdown>
      </div>
    </>
  )
}
