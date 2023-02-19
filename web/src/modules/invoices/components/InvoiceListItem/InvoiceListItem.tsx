import { twMerge } from 'tailwind-merge'
import { InvoiceStatus } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { getInvoiceNumberFromId } from 'src/modules/invoices/utils/get-invoice-number-from-id'
import { formatDate, formatMoney } from 'src/utils'

import InvoiceStatusBadge from '../InvoiceStatusBadge'

import Chevron from './chevron.svg'

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
    <Link
      to={routes.invoice({ id })}
      className={twMerge(
        'block rounded-lg border border-transparent bg-white p-6 text-sm shadow-md transition-colors @container hover:border hover:border-lavender-purple focus:border focus:border-lavender-purple focus:outline-0 dark:bg-night-blue',
        className
      )}
    >
      <div className="justify-between @xl:flex">
        <div className="mb-6 flex items-center justify-between @xl:mb-0 @xl:gap-8">
          <h4 className="font-bold">
            <span className="text-steel-blue">#</span>
            {getInvoiceNumberFromId(id)}
          </h4>
          <span className="text-light-slate-gray dark:text-white">
            {customerName || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between @xl:gap-10">
          <div className="items-center @xl:flex @xl:gap-10">
            <time className="mb-2 block text-light-slate-gray @xl:mb-0 dark:text-light-steel-blue">
              Due {formatDate(dueDate)}
            </time>
            <span className="block text-md font-bold">
              {formatMoney(totalAmount)}
            </span>
          </div>
          <div className="items-center gap-4 @xl:flex">
            <InvoiceStatusBadge status={status} className="w-28" />
            <Chevron className="hidden @xl:block" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InvoiceListItem
