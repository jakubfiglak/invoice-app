export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    role: Role!
    avatarUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    customers: [Customer]!
    products: [Product]!
    invoices: [Invoice]!
  }

  enum Role {
    USER
    ADMIN
  }
`
