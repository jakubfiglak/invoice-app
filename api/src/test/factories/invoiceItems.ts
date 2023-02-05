import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import { Factory } from 'fishery'
import type { CreateInvoiceItemInput } from 'types/graphql'

import { InvoiceItemInput } from 'src/services/invoiceItems/invoiceItems'

export const createInvoiceItemInputFactory =
  Factory.define<CreateInvoiceItemInput>(() => ({
    productId: createId(),
    price: faker.datatype.number(),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  }))

export const invoiceItemInputFactory = Factory.define<InvoiceItemInput>(() => ({
  price: faker.datatype.number(),
  quantity: faker.datatype.number({ min: 1, max: 10 }),
  productId: createId(),
  invoiceId: createId(),
}))
