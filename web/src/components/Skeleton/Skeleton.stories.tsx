import type { ComponentMeta } from '@storybook/react'

import Skeleton from './Skeleton'

export const generated = () => {
  return <Skeleton />
}

export default {
  title: 'Components/shared/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>
