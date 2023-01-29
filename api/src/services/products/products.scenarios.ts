import { faker } from '@faker-js/faker'
import type { Prisma, Product } from '@prisma/client'
import { User } from 'types/graphql'

export const testUserId = faker.datatype.uuid()
const anotherUserId = faker.datatype.uuid()

type UserName = 'testUser' | 'anotherUser'
type ProductName =
  | 'firstCreatedByTestUser'
  | 'secondCreatedByTestUser'
  | 'firstCreatedByAnotherUser'
  | 'secondCreatedByAnotherUser'

export const standard = defineScenario<
  Prisma.ProductCreateArgs | Prisma.UserCreateArgs,
  'product' | 'user'
>({
  user: {
    testUser: {
      data: {
        id: testUserId,
        email: faker.internet.email(),
        name: faker.internet.userName(),
        hashedPassword: faker.internet.password(),
        salt: faker.internet.password(),
      },
    },
    anotherUser: {
      data: {
        id: anotherUserId,
        email: faker.internet.email(),
        name: faker.internet.userName(),
        hashedPassword: faker.internet.password(),
        salt: faker.internet.password(),
      },
    },
  },
  product: {
    firstCreatedByTestUser: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: testUserId,
      },
    },
    secondCreatedByTestUser: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: testUserId,
      },
    },
    firstCreatedByAnotherUser: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: anotherUserId,
      },
    },
    secondCreatedByAnotherUser: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: anotherUserId,
      },
    },
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  product: Record<ProductName, Product>
}
