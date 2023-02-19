import type { ComponentMeta, ComponentStory } from '@storybook/react'

import InvoiceStatusBadge from './InvoiceStatusBadge'

const Template: ComponentStory<typeof InvoiceStatusBadge> = (args) => {
  return <InvoiceStatusBadge {...args} className="w-28" />
}

export const Draft = Template.bind({})
Draft.args = { status: 'DRAFT' }

export const Pending = Template.bind({})
Pending.args = { status: 'PENDING' }

export const Paid = Template.bind({})
Paid.args = { status: 'PAID' }

export default {
  title: 'Components/invoices/InvoiceStatusBadge',
  component: InvoiceStatusBadge,
} as ComponentMeta<typeof InvoiceStatusBadge>
