import type { ComponentMeta } from '@storybook/react'

import Header from './Header'

export const generated = () => {
  return (
    <div className="h-[1000px]">
      <Header />
    </div>
  )
}

export default {
  title: 'Components/app-layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>
