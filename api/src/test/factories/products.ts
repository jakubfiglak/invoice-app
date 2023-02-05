import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma } from '@prisma/client'
import { Factory } from 'fishery'
import type { CreateProductInput } from 'types/graphql'

export const createProductInputFactory = Factory.define<CreateProductInput>(
  () => ({
    name: faker.random.word(),
    price: faker.datatype.number(),
  })
)

export const productCreateArgsDataFactory = Factory.define<
  Prisma.ProductCreateArgs['data']
>(() => ({
  name: faker.random.word(),
  price: faker.datatype.number(),
  authorId: createId(),
}))
