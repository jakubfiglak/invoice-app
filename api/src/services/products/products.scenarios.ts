import type { Prisma, Product } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: 'String',
        price: 7281335,
        updatedAt: '2023-01-22T12:50:21.385Z',
        author: {
          create: {
            email: 'String2186214',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-01-22T12:50:21.385Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        price: 6048706,
        updatedAt: '2023-01-22T12:50:21.385Z',
        author: {
          create: {
            email: 'String7686192',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-01-22T12:50:21.385Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Product, 'product'>
