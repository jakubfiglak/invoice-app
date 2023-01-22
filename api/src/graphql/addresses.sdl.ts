export const schema = gql`
  type Address {
    id: String!
    street: String
    city: String
    postCode: String
    country: String
    createdAt: DateTime!
    updatedAt: DateTime!
    customers: [Customer]!
    invoices: [Invoice]!
  }
`
