import { addressInputFactory } from 'src/test/factories'

import { createAddress, updateAddress } from './addresses'
import type { StandardScenario } from './addresses.scenarios'

describe('addresses', () => {
  scenario('creates an address', async () => {
    const input = addressInputFactory.build()

    const result = await createAddress(input)

    expect(result.city).toBe(input.city)
    expect(result.country).toBe(input.country)
    expect(result.street).toBe(input.street)
    expect(result.postCode).toBe(input.postCode)
  })

  scenario('updates an address', async (scenario: StandardScenario) => {
    const { one: existingAddress } = scenario.address

    const input = addressInputFactory.build({
      postCode: undefined,
      street: undefined,
    })

    const result = await updateAddress({
      id: existingAddress.id,
      input,
    })

    expect(result.postCode).toBe(existingAddress.postCode)
    expect(result.street).toBe(existingAddress.street)

    expect(result.city).toBe(input.city)
    expect(result.country).toBe(input.country)
  })
})
