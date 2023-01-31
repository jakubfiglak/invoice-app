import { faker } from '@faker-js/faker'
import type { Prisma, Invoice, Product, User } from '@prisma/client'

import {
  invoiceCreateArgsDataFactory,
  productCreateArgsDataFactory,
  userCreateArgsDataFactory,
} from 'src/test/factories'

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
      data: userCreateArgsDataFactory.build({ id: testUserId }),
    },
    anotherUser: {
      data: userCreateArgsDataFactory.build({ id: anotherUserId }),
    },
  },
  product: {
    one: {
      data: productCreateArgsDataFactory.build({ authorId: testUserId }),
    },
    two: {
      data: productCreateArgsDataFactory.build({ authorId: testUserId }),
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
  },
})

export type StandardScenario = {
  user: Record<UserName, User>
  product: Record<ProductName, Product>
  invoice: Record<InvoiceName, Invoice>
}
