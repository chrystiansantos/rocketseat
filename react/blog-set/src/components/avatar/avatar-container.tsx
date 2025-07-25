import { ReactNode } from "react"

interface AvatarContainerProps {
  children: ReactNode
}

export function AvatarContainer({ children }: AvatarContainerProps) {
  return (
    <div className="flex items-center gap-3">
      {children}
    </div>
  )
}