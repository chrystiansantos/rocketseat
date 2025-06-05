import { ReactNode } from "react"

interface AvatarDescriptionProps {
  children: ReactNode
}

export function AvatarDescription({ children }: AvatarDescriptionProps) {
  return (
    <div className="text-gray-300 text-body-xs">
      {children}
    </div>
  )
}