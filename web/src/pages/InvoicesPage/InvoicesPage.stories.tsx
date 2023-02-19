import type { ComponentMeta } from '@storybook/react'

import InvoicesPage from './InvoicesPage'

export const generated = () => {
  return <InvoicesPage />
}

export default {
  title: 'Pages/InvoicesPage',
  component: InvoicesPage,
} as ComponentMeta<typeof InvoicesPage>
