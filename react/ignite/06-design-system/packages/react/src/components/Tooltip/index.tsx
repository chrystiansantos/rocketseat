import * as TooltipUI from '@radix-ui/react-tooltip'
import { ComponentProps } from 'react'

export interface TooltipProps extends ComponentProps<typeof TooltipUI.Root> {
  content: string
}

export function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <TooltipUI.Provider>
      <TooltipUI.Root {...props}>
        <TooltipUI.Trigger asChild>{children}</TooltipUI.Trigger>
        <TooltipUI.Portal>
          <TooltipUI.Content className="TooltipUIContent" sideOffset={5}>
            {content}
            <TooltipUI.Arrow className="TooltipUIArrow" />
          </TooltipUI.Content>
        </TooltipUI.Portal>
      </TooltipUI.Root>
    </TooltipUI.Provider>
  )
}
