import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma, User, Product, Invoice } from '@prisma/client'

import {
  productCreateArgsDataFactory,
  userCreateArgsDataFactory,
} from 'src/test/factories'

type UserName = 'testUser' | 'anotherUser'
type ProductName = 'one' | 'two'
type InvoiceName = 'one'

export const userId = createId()
const firstProductId = createId()
const secondProductId = createId()

export const standard = defineScenario<
  Prisma.ProductCreateArgs | Prisma.UserCreateArgs | Prisma.InvoiceCreateArgs,
  'product' | 'user' | 'invoice'
>({
  user: {
    testUser: {
      data: userCreateArgsDataFactory.build({ id: userId }),
    },
  },
  product: {
    one: {
      data: productCreateArgsDataFactory.build({
        id: firstProductId,
        authorId: userId,
      }),
    },
    two: {
      data: productCreateArgsDataFactory.build({
        id: secondProductId,
        authorId: userId,
      }),
    },
  },
  invoice: {
    one: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'DRAFT',
        author: { connect: { id: userId } },
        senderAddress: {
          create: {
            city: faker.address.city(),
            country: faker.address.country(),
            street: faker.address.street(),
            postCode: faker.address.zipCode(),
          },
        },
        customer: {
          create: {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            author: { connect: { id: userId } },
            address: {
              create: {
                city: faker.address.city(),
                country: faker.address.country(),
                street: faker.address.street(),
                postCode: faker.address.zipCode(),
              },
            },
          },
        },
        items: {
          createMany: {
            data: [
              {
                productId: firstProductId,
                price: faker.datatype.number(),
                quantity: faker.datatype.number({ min: 1, max: 10 }),
              },
              {
                productId: secondProductId,
                price: faker.datatype.number(),
                quantity: faker.datatype.number({ min: 1, max: 10 }),
              },
            ],
          },
        },
      },
    },
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  product: Record<ProductName, Product>
  invoice: Record<InvoiceName, Invoice>
}
