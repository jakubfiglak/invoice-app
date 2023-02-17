import type { ComponentMeta } from '@storybook/react'

import UserAvatar from './UserAvatar'

export const generated = () => {
  return <UserAvatar />
}

export default {
  title: 'Components/app-layout/UserAvatar',
  component: UserAvatar,
} as ComponentMeta<typeof UserAvatar>
