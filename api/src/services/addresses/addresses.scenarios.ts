import type { Prisma, Address } from '@prisma/client'

import { addressInputFactory } from 'src/test/factories'

type AddressName = 'one' | 'two'

export const standard = defineScenario<Prisma.AddressCreateArgs>({
  address: {
    one: {
      data: addressInputFactory.build(),
    },
    two: {
      data: addressInputFactory.build(),
    },
  },
})

export type StandardScenario = { address: Record<AddressName, Address> }
