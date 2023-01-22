export const schema = gql`
  type Invoice {
    id: String!
    description: String
    paymentDue: DateTime!
    paymentTerms: Int!
    status: InvoiceStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer
    customerId: String
    senderAddress: Address
    senderAddressId: String
    items: [InvoiceItem]!
    author: User!
    authorId: String!
  }

  enum InvoiceStatus {
    DRAFT
    PENDING
    PAID
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: String!): Invoice @requireAuth
  }

  input CreateInvoiceInput {
    description: String
    paymentDue: DateTime!
    paymentTerms: Int
    status: InvoiceStatus
    customerId: String
    senderAddressId: String
    authorId: String!
  }

  input UpdateInvoiceInput {
    description: String
    paymentDue: DateTime
    paymentTerms: Int
    status: InvoiceStatus
    customerId: String
    senderAddressId: String
    authorId: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
      @requireAuth
    deleteInvoice(id: String!): Invoice! @requireAuth
  }
`
