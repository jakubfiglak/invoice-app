import type { Prisma, Invoice } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InvoiceCreateArgs>({
  invoice: {
    one: {
      data: {
        paymentDue: '2023-01-22T12:59:24.386Z',
        updatedAt: '2023-01-22T12:59:24.386Z',
        author: {
          create: {
            email: 'String4796847',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-01-22T12:59:24.386Z',
          },
        },
      },
    },
    two: {
      data: {
        paymentDue: '2023-01-22T12:59:24.386Z',
        updatedAt: '2023-01-22T12:59:24.386Z',
        author: {
          create: {
            email: 'String8217486',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-01-22T12:59:24.386Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invoice, 'invoice'>
