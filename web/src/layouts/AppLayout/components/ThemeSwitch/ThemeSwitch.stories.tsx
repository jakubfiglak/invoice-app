import type { ComponentMeta } from '@storybook/react'

import ThemeSwitch from './ThemeSwitch'

export const generated = () => {
  return <ThemeSwitch />
}

export default {
  title: 'Components/app-layout/ThemeSwitch',
  component: ThemeSwitch,
} as ComponentMeta<typeof ThemeSwitch>
