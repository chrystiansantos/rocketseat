import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

interface CardPost {
  cardData: {
    id: number
    title: string
    body: string
    created_at: string
  }
}

export function CardPost({
  cardData: { id, body, title, created_at },
}: CardPost) {
  const description = body?.substring(0, 192) + '...'

  const publishedDateRelativeToNow = formatDistanceToNow(created_at, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <Link
      href={`/post/${id}`}
      className="p-1 block rounded-[10px] h-72 hover:bg-gradient-to-r from-blue to-label"
    >
      <div className="bg-post p-8 rounded-[10px] h-full flex flex-col">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-title flex-1">{title}</span>
          <time className="text-sm text-span whitespace-nowrap">
            {publishedDateRelativeToNow}
          </time>
        </div>
        <p className="text-text mt-5 flex-1">{description}</p>
      </div>
    </Link>
  )
}
