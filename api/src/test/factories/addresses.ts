import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { CreateInvoiceInput } from 'types/graphql'

type CreateAddressInput = Pick<
  CreateInvoiceInput,
  'billFromCity' | 'billFromCountry' | 'billFromStreet' | 'billFromPostCode'
>

export const createAddressInputFactory = Factory.define<CreateAddressInput>(
  () => ({
    billFromCity: faker.address.city(),
    billFromCountry: faker.address.country(),
    billFromStreet: faker.address.street(),
    billFromPostCode: faker.address.zipCode(),
  })
)
