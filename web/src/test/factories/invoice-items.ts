import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import { InvoiceItem } from 'types/graphql'

import { invoiceFactory } from './invoices'
import { productFactory } from './products'

export const invoiceItemFactory = Factory.define<InvoiceItem>(() => {
  const invoice = invoiceFactory.build()
  const product = productFactory.build()

  return {
    __typename: 'InvoiceItem',
    id: faker.datatype.uuid(),
    price: Number(faker.finance.amount()),
    quantity: faker.datatype.number({ max: 10 }),
    product,
    productId: product.id,
    invoice,
    invoiceId: invoice.id,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
})
