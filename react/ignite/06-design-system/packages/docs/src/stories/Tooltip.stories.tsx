// import { Tooltip, TooltipProps } from '@ignite-ui/react'
// import type { Meta, StoryObj } from '@storybook/react'

// export default {
//   title: 'Data display/Tooltip',
//   component: Tooltip,
//   args: {
//     // content: 'The day is avaliable for you',
//     // children: <Button variant="secondary">Select day</Button>,
//   },
//   argTypes: {
//     // children: {
//     // table: {
//     //   disable: true,
//     // },
//     // },
//     // delayDuration: {
//     //   control: {
//     //     type: 'number',
//     //   },
//     // },
//   },
// } as Meta<TooltipProps>

// export const Primary: StoryObj<TooltipProps> = {}

import { Avatar, AvatarProps } from '@ignite-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Data display/Tooltip',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    src: 'https://github.com/chrystiansantos.png',
    alt: 'Chrystian Santos',
  },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}

export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
}
