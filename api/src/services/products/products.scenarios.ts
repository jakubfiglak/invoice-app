import { faker } from '@faker-js/faker'
import type { Prisma, Product } from '@prisma/client'
import { User } from 'types/graphql'

import {
  productCreateArgsDataFactory,
  userCreateArgsDataFactory,
} from 'src/test/factories'

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
      data: userCreateArgsDataFactory.build({ id: testUserId }),
    },
    anotherUser: {
      data: userCreateArgsDataFactory.build({ id: anotherUserId }),
    },
  },
  product: {
    firstCreatedByTestUser: {
      data: productCreateArgsDataFactory.build({ authorId: testUserId }),
    },
    secondCreatedByTestUser: {
      data: productCreateArgsDataFactory.build({ authorId: testUserId }),
    },
    firstCreatedByAnotherUser: {
      data: productCreateArgsDataFactory.build({ authorId: anotherUserId }),
    },
    secondCreatedByAnotherUser: {
      data: productCreateArgsDataFactory.build({ authorId: anotherUserId }),
    },
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  product: Record<ProductName, Product>
}
