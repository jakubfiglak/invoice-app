import type {
  InvoicesCountQuery,
  InvoicesCountQueryVariables,
} from 'types/graphql'

import { invoiceFactory } from 'src/test/factories'

// Define your own mock data here:
export const standard = (
  vars?: InvoicesCountQueryVariables
): InvoicesCountQuery => {
  return {
    invoices: invoiceFactory
      .buildList(5)
      .filter((invoice) =>
        vars?.status ? invoice.status === vars.status : true
      ),
  }
}
