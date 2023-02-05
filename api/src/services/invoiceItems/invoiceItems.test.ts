import { db } from 'src/lib/db'
import { invoiceItemInputFactory } from 'src/test/factories'

import { createInvoiceItems, deleteInvoiceItems } from './invoiceItems'
import type { StandardScenario } from './invoiceItems.scenarios'

describe('invoiceItems', () => {
  scenario('creates invoice items', async (scenario: StandardScenario) => {
    const itemOneInput = invoiceItemInputFactory.build({
      invoiceId: scenario.invoice.one.id,
      productId: scenario.product.one.id,
    })

    const itemTwoInput = invoiceItemInputFactory.build({
      invoiceId: scenario.invoice.one.id,
      productId: scenario.product.two.id,
    })

    const result = await createInvoiceItems([itemOneInput, itemTwoInput])

    expect(result.count).toBe(2)
  })

  scenario(
    'deletes all invoice items for a given invoiceId',
    async (scenario: StandardScenario) => {
      const result = await deleteInvoiceItems(scenario.invoice.one.id)

      expect(result.count).toBe(2)

      const remainingInvoiceItems = await db.invoiceItem.findMany()

      expect(remainingInvoiceItems.length).toBe(0)
    }
  )
})
