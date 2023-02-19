import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { invoiceFactory, invoiceItemFactory } from 'src/test/factories'

import InvoiceListItem from './InvoiceListItem'

const Template: ComponentStory<typeof InvoiceListItem> = (args) => {
  return <InvoiceListItem {...args} className="max-w-3xl" />
}

export const Primary = Template.bind({})

const { id, paymentDue, customer, status } = invoiceFactory.build({
  items: invoiceItemFactory.buildList(3),
})

Primary.args = {
  id,
  dueDate: paymentDue,
  totalAmount: 1000,
  customerName: customer?.name,
  status,
}

export default {
  title: 'Components/invoices/InvoiceListItem',
  component: InvoiceListItem,
  argTypes: { dueDate: { control: { type: 'date' } } },
} as ComponentMeta<typeof InvoiceListItem>
