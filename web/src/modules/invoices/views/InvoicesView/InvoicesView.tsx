import { navigate, routes } from '@redwoodjs/router'

import Button from 'src/components/Button'

import InvoicesCountCell from '../../components/InvoicesCountCell'
import InvoicesListCell from '../../components/InvoicesListCell'
import InvoiceStatusFilterSelect from '../../components/InvoiceStatusFilterSelect'
import { useStatus } from '../../utils'

const InvoicesView = () => {
  const status = useStatus()

  return (
    <div>
      <div className="flex items-center justify-between py-8">
        <div>
          <h1 className="mb-1 text-lg font-bold">Invoices</h1>
          <InvoicesCountCell status={status} className="text-sm" />
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

      <InvoicesListCell status={status} />
    </div>
  )
}

export default InvoicesView
