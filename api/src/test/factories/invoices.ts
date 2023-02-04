import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma } from '@prisma/client'
import { Factory } from 'fishery'
import type { CreateInvoiceInput } from 'types/graphql'

import { createAddressInputFactory } from './addresses'
import { createCustomerInputFactory } from './customers'

export const invoiceInputFactory = Factory.define<CreateInvoiceInput>(() => ({
  ...createAddressInputFactory.build(),
  ...createCustomerInputFactory.build(),
  description: faker.random.words(10),
  issueDate: faker.date.past(),
  paymentTerms: faker.datatype.number({ min: 1, max: 30 }),
  items: [],
}))

export const invoiceCreateArgsDataFactory = Factory.define<
  Prisma.InvoiceCreateArgs['data']
>(() => ({
  description: faker.random.words(3),
  issueDate: faker.date.past().toISOString(),
  paymentDue: faker.date.future().toISOString(),
  paymentTerms: 7,
  status: 'DRAFT',
  authorId: createId(),
}))
