import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Input from './Input'

const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <div className="max-w-sm">
      <Input {...args} />
    </div>
  )
}

export const TextInput = Template.bind({})

TextInput.args = {
  name: 'address',
  label: 'Street Address',
  placeholder: 'Placeholder',
}

export const DatePicker = Template.bind({})

DatePicker.args = {
  name: 'test',
  label: 'Issue Date',
  type: 'date',
}

export default {
  title: 'Components/shared/Input',
  component: Input,
} as ComponentMeta<typeof Input>
