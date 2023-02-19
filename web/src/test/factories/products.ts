import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import { Product } from 'types/graphql'

import { userFactory } from './users'

export const productFactory = Factory.define<Product>(() => {
  const author = userFactory.build()

  return {
    __typename: 'Product',
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    price: Number(faker.finance.amount()),
    authorId: author.id,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
})
