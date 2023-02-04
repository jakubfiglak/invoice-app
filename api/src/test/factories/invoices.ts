import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma } from '@prisma/client'
import { Factory } from 'fishery'
import type { CreateInvoiceInput } from 'types/graphql'

import { createCustomerInputFactory } from './customers'

type CreateSenderAddressInput = Pick<
  CreateInvoiceInput,
  'billFromCity' | 'billFromCountry' | 'billFromStreet' | 'billFromPostCode'
>

export const createSenderAddressInputFactory =
  Factory.define<CreateSenderAddressInput>(() => ({
    billFromCity: faker.address.city(),
    billFromCountry: faker.address.country(),
    billFromStreet: faker.address.street(),
    billFromPostCode: faker.address.zipCode(),
  }))

export const invoiceInputFactory = Factory.define<CreateInvoiceInput>(() => ({
  ...createSenderAddressInputFactory.build(),
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
