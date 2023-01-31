import { faker } from '@faker-js/faker'
import type { Prisma, Invoice, Product, User } from '@prisma/client'

export const testUserId = faker.datatype.uuid()
const anotherUserId = faker.datatype.uuid()

type UserName = 'testUser' | 'anotherUser'
type ProductName = 'one' | 'two' | 'three' | 'four'
type InvoiceName =
  | 'draftCreatedByTestUser'
  | 'pendingCreatedByTestUser'
  | 'paidCreatedByTestUser'
  | 'draftCreatedByAnotherUser'
  | 'pendingCreatedByAnotherUser'
  | 'paidCreatedByAnotherUser'

export const standard = defineScenario<
  Prisma.ProductCreateArgs | Prisma.UserCreateArgs | Prisma.InvoiceCreateArgs,
  'product' | 'user' | 'invoice'
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
    one: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: testUserId,
      },
    },
    two: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: testUserId,
      },
    },
    three: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: anotherUserId,
      },
    },
    four: {
      data: {
        name: faker.random.word(),
        price: faker.datatype.number(),
        authorId: anotherUserId,
      },
    },
  },
  invoice: {
    draftCreatedByTestUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'DRAFT',
        authorId: testUserId,
      },
    },
    pendingCreatedByTestUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'PENDING',
        authorId: testUserId,
      },
    },
    paidCreatedByTestUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'PAID',
        authorId: testUserId,
      },
    },
    draftCreatedByAnotherUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'DRAFT',
        authorId: anotherUserId,
      },
    },
    pendingCreatedByAnotherUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'PENDING',
        authorId: anotherUserId,
      },
    },
    paidCreatedByAnotherUser: {
      data: {
        description: faker.random.words(3),
        issueDate: faker.date.past().toISOString(),
        paymentDue: faker.date.future().toISOString(),
        paymentTerms: 7,
        status: 'PAID',
        authorId: anotherUserId,
      },
    },
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  product: Record<ProductName, Product>
  invoice: Record<InvoiceName, Invoice>
}
