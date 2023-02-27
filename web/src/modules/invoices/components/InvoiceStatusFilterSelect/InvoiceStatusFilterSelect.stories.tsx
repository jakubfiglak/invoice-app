import type { ComponentMeta } from '@storybook/react'

import InvoiceStatusFilterSelect from './InvoiceStatusFilterSelect'

export const generated = () => {
  return (
    <div className="max-w-sm">
      <InvoiceStatusFilterSelect onChange={(value) => console.log(value)} />
    </div>
  )
}

export default {
  title: 'Components/invoices/InvoiceStatusFilterSelect',
  component: InvoiceStatusFilterSelect,
} as ComponentMeta<typeof InvoiceStatusFilterSelect>
