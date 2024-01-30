import { ReactNode } from 'react'

interface GitHubBlogLayoutProps {
  children: ReactNode
}

export default function GitHubBlogLayout({ children }: GitHubBlogLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <div
        className="h-[296px]"
        style={{
          backgroundImage: 'url(/images/cover.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-[864px] mx-auto">{children}</div>
    </div>
  )
}
