import { useEffect } from 'react'

import { navigate, routes, useParams } from '@redwoodjs/router'

import Button from 'src/components/Button'
import { InvoiceFilterStatus } from 'src/modules/invoices/types'

import InvoicesCountCell from '../../components/InvoicesCountCell'
import InvoicesListCell from '../../components/InvoicesListCell'
import InvoiceStatusFilterSelect from '../../components/InvoiceStatusFilterSelect'

const InvoicesView = () => {
  const params = useParams()

  useEffect(() => {
    if (!params.status) {
      navigate(routes.invoices({ ...params, status: 'all' }))
    }
  }, [params])

  const status = params.status?.toUpperCase() as InvoiceFilterStatus | undefined

  return (
    <div>
      <div className="flex items-center justify-between py-8">
        <div>
          <h1 className="mb-1 text-lg font-bold">Invoices</h1>
          <InvoicesCountCell
            status={status === 'ALL' ? undefined : status}
            className="text-sm"
          />
        </div>
        <div className="flex items-center gap-4 lg:gap-10">
          <InvoiceStatusFilterSelect
            value={status || 'ALL'}
            onChange={(newStatus) =>
              navigate(routes.invoices({ status: newStatus.toLowerCase() }))
            }
          />
          <Button
            variant="primary-with-icon"
            onClick={() => console.log('clicked')}
          >
            <span className="lg:hidden">New</span>
            <span className="hidden lg:inline">New Invoice</span>
          </Button>
        </div>
      </div>

      <InvoicesListCell status={status === 'ALL' ? undefined : status} />
    </div>
  )
}

export default InvoicesView
