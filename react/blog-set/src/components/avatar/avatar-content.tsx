import { ReactNode } from "react"

interface AvatarContentProps {
  children: ReactNode
}

export function AvatarContent({ children }: AvatarContentProps) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}