import type { ComponentMeta } from '@storybook/react'

import InvoicePage from './InvoicePage'

export const generated = () => {
  return <InvoicePage />
}

export default {
  title: 'Pages/InvoicePage',
  component: InvoicePage,
} as ComponentMeta<typeof InvoicePage>
