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
    invoices(status: InvoiceStatus): [Invoice!]! @requireAuth
    invoice(id: String!): Invoice @requireAuth
  }

  input CreateInvoiceItemInput {
    productId: String!
    quantity: Int!
    price: Int!
  }

  input CreateInvoiceInput {
    billFromStreet: String
    billFromCity: String
    billFromPostCode: String
    billFromCountry: String
    clientName: String
    clientEmail: String
    clientStreet: String
    clientCity: String
    clientPostCode: String
    clientCountry: String
    issueDate: DateTime
    description: String
    paymentTerms: Int
    status: InvoiceStatus
    items: [CreateInvoiceItemInput]
  }

  input UpdateInvoiceInput {
    billFromStreet: String
    billFromCity: String
    billFromPostCode: String
    billFromCountry: String
    clientName: String
    clientEmail: String
    clientStreet: String
    clientCity: String
    clientPostCode: String
    clientCountry: String
    description: String
    paymentTerms: Int
    items: [CreateInvoiceItemInput]
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
      @requireAuth
    deleteInvoice(id: String!): Invoice! @requireAuth
  }
`
