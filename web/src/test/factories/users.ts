import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { User } from 'types/graphql'

export const userFactory = Factory.define<User>(() => ({
  __typename: 'User',
  id: faker.datatype.uuid(),
  role: 'USER',
  email: faker.internet.email(),
  name: faker.internet.userName(),
  avatarUrl: faker.image.avatar(),
  customers: [],
  invoices: [],
  products: [],
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
}))
