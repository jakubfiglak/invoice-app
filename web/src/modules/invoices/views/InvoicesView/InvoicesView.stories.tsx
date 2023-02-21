import type { ComponentMeta } from '@storybook/react'

import InvoicesView from './InvoicesView'

export const generated = () => {
  return <InvoicesView />
}

export default {
  title: 'Views/invoices/InvoicesView',
  component: InvoicesView,
} as ComponentMeta<typeof InvoicesView>
