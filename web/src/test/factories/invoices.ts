import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { Invoice } from 'types/graphql'

import { addressFactory } from './addresses'
import { customerFactory } from './customers'
import { userFactory } from './users'

export const invoiceFactory = Factory.define<Invoice>(() => {
  const author = userFactory.build()
  const customer = customerFactory.build()
  const senderAddress = addressFactory.build()

  return {
    __typename: 'Invoice',
    id: faker.datatype.uuid(),
    paymentDue: faker.date.future().toISOString(),
    paymentTerms: faker.datatype.number({ max: 30 }),
    status: 'PENDING',
    description: faker.lorem.paragraph(),
    author,
    authorId: author.id,
    items: [],
    customer,
    customerId: customer.id,
    senderAddress,
    senderAddressId: senderAddress.id,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
})
