export const schema = gql`
  type Customer {
    id: String!
    name: String
    email: String
    createdAt: DateTime!
    updatedAt: DateTime!
    address: Address
    addressId: String
    invoices: [Invoice]!
    author: User!
    authorId: String!
  }
`
