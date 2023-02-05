import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import type { Prisma, Invoice, Product, User } from '@prisma/client'

import {
  invoiceCreateArgsDataFactory,
  productCreateArgsDataFactory,
  userCreateArgsDataFactory,
} from 'src/test/factories'

export const testUserId = createId()
const anotherUserId = createId()
const firstProductId = createId()
const secondProductId = createId()

type UserName = 'testUser' | 'anotherUser'
type ProductName = 'one' | 'two' | 'three' | 'four'
type InvoiceName =
  | 'draftCreatedByTestUser'
  | 'pendingCreatedByTestUser'
  | 'paidCreatedByTestUser'
  | 'draftCreatedByAnotherUser'
  | 'pendingCreatedByAnotherUser'
  | 'paidCreatedByAnotherUser'
  | 'fullCreatedByTestUser'

export const standard = defineScenario<
  Prisma.ProductCreateArgs | Prisma.UserCreateArgs | Prisma.InvoiceCreateArgs,
  'product' | 'user' | 'invoice'
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
    one: {
      data: productCreateArgsDataFactory.build({
        id: firstProductId,
        authorId: testUserId,
      }),
    },
    two: {
      data: productCreateArgsDataFactory.build({
        id: secondProductId,
        authorId: testUserId,
      }),
    },
    three: {
      data: productCreateArgsDataFactory.build({ authorId: anotherUserId }),
    },
    four: {
      data: productCreateArgsDataFactory.build({ authorId: anotherUserId }),
    },
  },
  invoice: {
    draftCreatedByTestUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'DRAFT',
        authorId: testUserId,
      }),
    },
    pendingCreatedByTestUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'PENDING',
        authorId: testUserId,
      }),
    },
    paidCreatedByTestUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'PAID',
        authorId: testUserId,
      }),
    },
    draftCreatedByAnotherUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'DRAFT',
        authorId: anotherUserId,
      }),
    },
    pendingCreatedByAnotherUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'PENDING',
        authorId: anotherUserId,
      }),
    },
    paidCreatedByAnotherUser: {
      data: invoiceCreateArgsDataFactory.build({
        status: 'PAID',
        authorId: anotherUserId,
      }),
    },
    fullCreatedByTestUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'DRAFT',
        author: { connect: { id: testUserId } },
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
            author: { connect: { id: testUserId } },
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
