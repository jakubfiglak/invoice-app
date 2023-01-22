import type { Invoice } from '@prisma/client'

import {
  invoices,
  invoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from './invoices'
import type { StandardScenario } from './invoices.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invoices', () => {
  scenario('returns all invoices', async (scenario: StandardScenario) => {
    const result = await invoices()

    expect(result.length).toEqual(Object.keys(scenario.invoice).length)
  })

  scenario('returns a single invoice', async (scenario: StandardScenario) => {
    const result = await invoice({ id: scenario.invoice.one.id })

    expect(result).toEqual(scenario.invoice.one)
  })

  scenario('creates a invoice', async (scenario: StandardScenario) => {
    const result = await createInvoice({
      input: {
        paymentDue: '2023-01-22T12:59:24.357Z',
        authorId: scenario.invoice.two.authorId,
      },
    })

    expect(result.paymentDue).toEqual(new Date('2023-01-22T12:59:24.357Z'))
    expect(result.updatedAt).toEqual(new Date('2023-01-22T12:59:24.357Z'))
    expect(result.authorId).toEqual(scenario.invoice.two.authorId)
  })

  scenario('updates a invoice', async (scenario: StandardScenario) => {
    const original = (await invoice({ id: scenario.invoice.one.id })) as Invoice
    const result = await updateInvoice({
      id: original.id,
      input: { paymentDue: '2023-01-23T12:59:24.357Z' },
    })

    expect(result.paymentDue).toEqual(new Date('2023-01-23T12:59:24.357Z'))
  })

  scenario('deletes a invoice', async (scenario: StandardScenario) => {
    const original = (await deleteInvoice({
      id: scenario.invoice.one.id,
    })) as Invoice
    const result = await invoice({ id: original.id })

    expect(result).toEqual(null)
  })
})
