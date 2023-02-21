import type {
  InvoicesListQuery,
  InvoicesListQueryVariables,
} from 'types/graphql'

import { invoiceFactory } from 'src/test/factories'

// Define your own mock data here:
export const standard = (
  vars?: InvoicesListQueryVariables
): InvoicesListQuery => {
  return {
    invoices: invoiceFactory
      .buildList(5)
      .filter((invoice) =>
        vars?.status ? invoice.status === vars.status : true
      ),
  }
}
