import { useState } from 'react'

import { InvoiceStatus } from 'types/graphql'

import InvoicesListCell from '../../components/InvoicesListCell'

const InvoicesView = () => {
  const [status] = useState<InvoiceStatus | undefined>(undefined)

  return (
    <div>
      <InvoicesListCell status={status} />
    </div>
  )
}

export default InvoicesView
