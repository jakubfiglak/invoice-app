import { faker } from '@faker-js/faker'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from './Button'

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />
}

export const Primary = Template.bind({})

Primary.args = {
  variant: 'primary',
}

export const PrimaryWithIcon = Template.bind({})

PrimaryWithIcon.args = {
  variant: 'primary-with-icon',
}

export const Secondary = Template.bind({})

Secondary.args = {
  variant: 'secondary',
}

export const Tertiary = Template.bind({})

Tertiary.args = {
  variant: 'tertiary',
}

export const Danger = Template.bind({})

Danger.args = {
  variant: 'danger',
}

export default {
  title: 'Components/shared/Button',
  component: Button,
  args: { children: faker.lorem.word() },
} as ComponentMeta<typeof Button>
