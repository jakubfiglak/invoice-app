import { createId } from '@paralleldrive/cuid2'
import type { Prisma, Customer, Address, User } from '@prisma/client'

import {
  addressInputFactory,
  customerInputFactory,
  userCreateArgsDataFactory,
} from 'src/test/factories'

type UserName = 'testUser'
type AddressName = 'one' | 'two'
type CustomerName = 'one' | 'two'

export const userId = createId()
const addressId = createId()

export const standard = defineScenario<
  Prisma.UserCreateArgs | Prisma.AddressCreateArgs | Prisma.CustomerCreateArgs
>({
  user: {
    testUser: {
      data: userCreateArgsDataFactory.build({ id: userId }),
    },
  },
  address: {
    one: {
      data: { ...addressInputFactory.build(), id: addressId },
    },
    two: {
      data: addressInputFactory.build(),
    },
  },
  customer: {
    one: {
      data: { ...customerInputFactory.build({ addressId }), authorId: userId },
    },
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  address: Record<AddressName, Address>
  customer: Record<CustomerName, Customer>
}
