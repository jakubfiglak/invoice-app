import type {
  InvoicesListQuery,
  InvoicesListQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query InvoicesListQuery {
    invoices {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<InvoicesListQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  invoices,
}: CellSuccessProps<InvoicesListQuery, InvoicesListQueryVariables>) => {
  return <div>{JSON.stringify(invoices)}</div>
}
