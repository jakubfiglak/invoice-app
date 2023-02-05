export const schema = gql`
  type InvoiceItem {
    id: String!
    quantity: Int!
    price: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    invoice: Invoice!
    invoiceId: String!
    product: Product!
    productId: String!
  }
`
