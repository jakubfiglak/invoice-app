import { twMerge } from 'tailwind-merge'
import type { InvoiceStatus } from 'types/graphql'

import { badgeVariants, dotVariants } from './variants'

interface IInvoiceStatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

const InvoiceStatusBadge = ({
  status,
  className,
}: IInvoiceStatusBadgeProps) => {
  return (
    <div className={twMerge(badgeVariants({ status, className }))}>
      <span className={twMerge(dotVariants({ status }))} />
      <span>{status.toLowerCase()}</span>
    </div>
  )
}

export default InvoiceStatusBadge
