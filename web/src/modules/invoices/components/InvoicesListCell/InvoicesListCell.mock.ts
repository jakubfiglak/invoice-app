import { InvoicesListQuery } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */): InvoicesListQuery => ({
  invoices: [
    {
      id: '123',
    },
  ],
})
