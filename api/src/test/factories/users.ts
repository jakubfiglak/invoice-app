import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma } from '@prisma/client'
import { Factory } from 'fishery'

export const userCreateArgsDataFactory = Factory.define<
  Prisma.UserCreateArgs['data']
>(() => ({
  id: createId(),
  email: faker.internet.email(),
  name: faker.internet.userName(),
  hashedPassword: faker.internet.password(),
  salt: faker.internet.password(),
}))
