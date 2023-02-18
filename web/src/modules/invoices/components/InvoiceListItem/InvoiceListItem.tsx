import { twMerge } from 'tailwind-merge'
import { InvoiceStatus } from 'types/graphql'

import { getInvoiceNumberFromId } from 'src/modules/invoices/utils/get-invoice-number-from-id'
import { formatDate, formatMoney } from 'src/utils'

import InvoiceStatusBadge from '../InvoiceStatusBadge'

interface IInvoiceListItemProps {
  id: string
  dueDate: string
  totalAmount: number
  customerName?: string | null
  status: InvoiceStatus
  className?: string
}

const InvoiceListItem = ({
  id,
  dueDate,
  totalAmount,
  customerName,
  status,
  className,
}: IInvoiceListItemProps) => {
  return (
    <div
      className={twMerge(
        'rounded-lg bg-white p-6 text-sm shadow-md dark:bg-night-blue',
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <h4 className="font-bold">
          <span className="text-steel-blue">#</span>
          {getInvoiceNumberFromId(id)}
        </h4>
        <span className="text-light-slate-gray dark:text-white">
          {customerName}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <time className="mb-2 block text-light-slate-gray dark:text-light-steel-blue">
            Due {formatDate(dueDate)}
          </time>
          <span className="block text-md font-bold">
            {formatMoney(totalAmount)}
          </span>
        </div>
        <InvoiceStatusBadge status={status} className="w-28" />
      </div>
    </div>
  )
}

export default InvoiceListItem
