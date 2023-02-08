import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from './Button'

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
  children: 'Click me',
  variant: 'primary',
}

export const PrimaryWithIcon = Template.bind({})

PrimaryWithIcon.args = {
  ...Primary.args,
  variant: 'primary-with-icon',
}

export default {
  title: 'Components/shared/Button',
  component: Button,
} as ComponentMeta<typeof Button>
