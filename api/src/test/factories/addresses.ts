import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import type { AddressInput } from 'src/services/addresses/addresses'

export const addressInputFactory = Factory.define<AddressInput>(() => ({
  city: faker.address.city(),
  country: faker.address.country(),
  street: faker.address.street(),
  postCode: faker.address.zipCode(),
}))
