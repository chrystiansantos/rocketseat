import { ReactNode } from "react"

interface AvatarTitle {
  children: ReactNode
}

export function AvatarTitle({ children }: AvatarTitle) {
  return (
    <strong className="text-body-sm text-gray-200">{children}</strong>
  )
}