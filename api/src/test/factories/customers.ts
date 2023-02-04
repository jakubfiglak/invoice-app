import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import { Factory } from 'fishery'

import type { CustomerInput } from 'src/services/customers/customers'

export const customerInputFactory = Factory.define<CustomerInput>(() => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  addressId: createId(),
}))
