'use client'
import { Button } from "@/components/ui/button"
import { useShare } from "@/hooks"

interface PostShareProps {
  postUrl: string
  title: string
  description: string

}

export function PostShare({ postUrl, title, description }: PostShareProps) {
  const { shareButtons } = useShare({
    url: postUrl,
    title,
    text: description
  })

  return (
    <aside className="space-y-6">
      <div className="rounded-lg bg-gray-700">
        <h2 className="hidden md:block mb-4 text-heading-xs text-gray-100">Compartilhar</h2>
        <div className="flex justify-between md:flex-col gap-2">
          {shareButtons.map(provider => (
            <Button
              key={provider.provider}
              variant="outline"
              className="w-fit md:w-full justify-start gap-2"
              onClick={() => provider.action()}>
              {provider.icon}
              <span className="hidden md:block">
                {provider.name}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}