import { MetaTags } from '@redwoodjs/web'

import InvoicesView from 'src/modules/invoices/views/InvoicesView/InvoicesView'

const InvoicesPage = () => {
  return (
    <>
      <MetaTags title="Invoices" description="Invoices page" />

      <InvoicesView />
    </>
  )
}

export default InvoicesPage
