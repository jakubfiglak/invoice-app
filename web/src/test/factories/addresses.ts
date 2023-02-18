import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { Address } from 'types/graphql'

export const addressFactory = Factory.define<Address>(() => {
  return {
    __typename: 'Address',
    id: faker.datatype.uuid(),
    city: faker.address.city(),
    country: faker.address.country(),
    postCode: faker.address.zipCode(),
    street: faker.address.street(),
    customers: [],
    invoices: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
})
