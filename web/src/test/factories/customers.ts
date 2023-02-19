import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { Customer } from 'types/graphql'

import { addressFactory } from './addresses'
import { userFactory } from './users'

export const customerFactory = Factory.define<Customer>(() => {
  const author = userFactory.build()
  const address = addressFactory.build()

  return {
    __typename: 'Customer',
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    author,
    authorId: author.id,
    address,
    addressId: address.id,
    invoices: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
})
