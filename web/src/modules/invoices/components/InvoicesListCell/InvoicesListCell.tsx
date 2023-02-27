import { twMerge } from 'tailwind-merge'
import type {
  InvoicesListQuery,
  InvoicesListQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Skeleton from 'src/components/Skeleton'
import { testIds } from 'src/test/ids'

import InvoiceListItem from '../InvoiceListItem'

import Placeholder from './assets/placeholder.svg'

export const QUERY = gql`
  query InvoicesListQuery($status: InvoiceStatus) {
    invoices(status: $status) {
      id
      customer {
        id
        name
      }
      paymentDue
      status
      totalAmount
    }
  }
`

interface ICommonProps {
  className?: string
}

export const Loading = ({ className }: ICommonProps) => {
  return (
    <div className={twMerge('space-y-4 @container', className)}>
      <Skeleton count={5} className="h-32 @lg:h-20" />
    </div>
  )
}

export const Empty = ({ className }: ICommonProps) => {
  return (
    <div className={twMerge('mx-auto max-w-[240px] text-center', className)}>
      <Placeholder
        className="mx-auto mb-10"
        data-testid={testIds.invoicesPlaceholder}
      />
      <h4 className="mb-6 text-lg font-bold">There is nothing here</h4>
      <p className="text-sm text-light-slate-gray">
        Create an invoice by clicking the{' '}
        <em className="font-bold not-italic">New</em> button and get started
      </p>
    </div>
  )
}

export const Failure = ({
  error,
}: CellFailureProps<InvoicesListQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ISuccessProps
  extends CellSuccessProps<InvoicesListQuery, InvoicesListQueryVariables>,
    ICommonProps {}

export const Success = ({ invoices, className }: ISuccessProps) => {
  return (
    <div className={twMerge('space-y-4', className)}>
      {invoices.map((invoice) => (
        <InvoiceListItem
          key={invoice.id}
          id={invoice.id}
          dueDate={invoice.paymentDue}
          status={invoice.status}
          customerName={invoice.customer?.name}
          totalAmount={invoice.totalAmount ? invoice.totalAmount / 100 : 0}
        />
      ))}
    </div>
  )
}
