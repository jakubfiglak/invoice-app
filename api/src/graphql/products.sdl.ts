export const schema = gql`
  type Product {
    id: String!
    name: String!
    price: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    authorId: String!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: String!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    price: Int!
  }

  input UpdateProductInput {
    name: String
    price: Int
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: String!, input: UpdateProductInput!): Product!
      @requireAuth
    deleteProduct(id: String!): Product! @requireAuth
  }
`
