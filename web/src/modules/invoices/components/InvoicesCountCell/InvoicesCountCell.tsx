import { twMerge } from 'tailwind-merge'
import type {
  InvoicesCountQuery,
  InvoicesCountQueryVariables,
  InvoiceStatus,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Skeleton from 'src/components/Skeleton'

export const QUERY = gql`
  query InvoicesCountQuery($status: InvoiceStatus) {
    invoices(status: $status) {
      id
    }
  }
`

interface ICommonProps {
  className?: string
  status?: InvoiceStatus
}

export const Loading = ({ className }: ICommonProps) => {
  return <Skeleton className={twMerge('h-[15px] @lg:h-20', className)} />
}

export const Empty = ({ className, status }: ICommonProps) => {
  return (
    <p className={twMerge('text-sm', className)}>
      <span>No {status ? status.toLowerCase() : ''} invoices</span>
    </p>
  )
}

export const Failure = ({
  error,
}: CellFailureProps<InvoicesCountQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ISuccessProps
  extends CellSuccessProps<InvoicesCountQuery, InvoicesCountQueryVariables>,
    ICommonProps {}

export const Success = ({ invoices, status, className }: ISuccessProps) => {
  return (
    <p className={twMerge('text-sm', className)}>
      <span className="lg:hidden">
        {invoices.length} {status ? status.toLowerCase() : ''}invoices
      </span>
      <span className="hidden lg:inline">
        There are {invoices.length} {status ? status.toLowerCase() : 'total'}{' '}
        invoices
      </span>
    </p>
  )
}
