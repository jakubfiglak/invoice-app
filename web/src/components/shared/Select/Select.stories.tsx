import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { optionFactory } from './option-factory'
import Select from './Select'

const Template: ComponentStory<typeof Select> = (args) => {
  return (
    <div className="max-w-sm">
      <Select {...args} />
    </div>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  name: 'Select',
  label: 'Test',
  options: optionFactory.buildList(3),
}

export default {
  title: 'Components/shared/Select',
  component: Select,
} as ComponentMeta<typeof Select>
