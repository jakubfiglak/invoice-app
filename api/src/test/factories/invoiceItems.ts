import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { CreateInvoiceItemInput } from 'types/graphql'

export const createInvoiceItemInputFactory =
  Factory.define<CreateInvoiceItemInput>(() => ({
    productId: faker.datatype.uuid(),
    price: faker.datatype.number(),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  }))
