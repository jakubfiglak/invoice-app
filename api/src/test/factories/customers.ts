import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { CreateInvoiceInput } from 'types/graphql'

type CreateCustomerInput = Pick<
  CreateInvoiceInput,
  | 'clientCity'
  | 'clientCountry'
  | 'clientStreet'
  | 'clientPostCode'
  | 'clientName'
  | 'clientEmail'
>

export const createCustomerInputFactory = Factory.define<CreateCustomerInput>(
  () => ({
    clientCity: faker.address.city(),
    clientCountry: faker.address.country(),
    clientStreet: faker.address.street(),
    clientPostCode: faker.address.zipCode(),
    clientName: faker.internet.userName(),
    clientEmail: faker.internet.email(),
  })
)
