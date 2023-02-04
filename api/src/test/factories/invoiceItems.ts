import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import { Factory } from 'fishery'
import type { CreateInvoiceItemInput } from 'types/graphql'

export const createInvoiceItemInputFactory =
  Factory.define<CreateInvoiceItemInput>(() => ({
    productId: createId(),
    price: faker.datatype.number(),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  }))
