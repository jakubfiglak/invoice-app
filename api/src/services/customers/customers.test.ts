import { faker } from '@faker-js/faker'

import type { CurrentUser } from '@redwoodjs/auth'

import { customerInputFactory } from 'src/test/factories'

import { createCustomer, updateCustomer } from './customers'
import { type StandardScenario, userId } from './customers.scenarios'

const currentUser = {
  id: userId,
  email: faker.internet.email(),
  name: faker.internet.userName(),
  avatarUrl: faker.internet.url(),
}

describe('customers', () => {
  beforeEach(() => {
    mockCurrentUser(currentUser as CurrentUser)
  })

  scenario('creates a customer', async (scenario: StandardScenario) => {
    const input = customerInputFactory.build({
      addressId: scenario.address.one.id,
    })

    const result = await createCustomer(input)

    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.addressId).toBe(input.addressId)
  })

  scenario('updates a customer', async (scenario: StandardScenario) => {
    const { one: existingCustomer } = scenario.customer

    const input = customerInputFactory.build({ addressId: undefined })

    const result = await updateCustomer({
      id: existingCustomer.id,
      input,
    })

    expect(result.addressId).toBe(existingCustomer.addressId)

    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
  })
})
