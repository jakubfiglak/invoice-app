import { faker } from '@faker-js/faker'
import type { Invoice } from '@prisma/client'
import { formatISO } from 'date-fns'

import type { CurrentUser } from '@redwoodjs/auth'

import { db } from 'src/lib/db'
import {
  createInvoiceItemInputFactory,
  createCustomerInputFactory,
  createAddressInputFactory,
  createInvoiceInputFactory,
} from 'src/test/factories'

import {
  invoices,
  invoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from './invoices'
import { type StandardScenario, testUserId } from './invoices.scenarios'

const currentUser = {
  id: testUserId,
  email: faker.internet.email(),
  name: faker.internet.userName(),
  avatarUrl: faker.internet.url(),
}

describe('invoices service', () => {
  beforeEach(() => {
    mockCurrentUser(currentUser as CurrentUser)
  })

  describe('get all', () => {
    scenario(
      'returns all invoices created by current user',
      async (scenario: StandardScenario) => {
        const result = await invoices({})

        expect(result.length).toEqual(
          Object.values(scenario.invoice).filter(
            (invoice) => invoice.authorId === currentUser.id
          ).length
        )

        expect(result).toContainEqual(scenario.invoice.draftCreatedByTestUser)
        expect(result).toContainEqual(scenario.invoice.pendingCreatedByTestUser)
        expect(result).toContainEqual(scenario.invoice.paidCreatedByTestUser)
        expect(result).not.toContainEqual(
          scenario.invoice.draftCreatedByAnotherUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.pendingCreatedByAnotherUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.paidCreatedByAnotherUser
        )
      }
    )

    scenario(
      'returns all invoices filtered by status',
      async (scenario: StandardScenario) => {
        const result = await invoices({ status: 'DRAFT' })

        expect(result.length).toEqual(
          Object.values(scenario.invoice).filter(
            (invoice) =>
              invoice.authorId === currentUser.id && invoice.status === 'DRAFT'
          ).length
        )

        expect(result).toContainEqual(scenario.invoice.draftCreatedByTestUser)
        expect(result).not.toContainEqual(
          scenario.invoice.pendingCreatedByTestUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.paidCreatedByTestUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.draftCreatedByAnotherUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.pendingCreatedByAnotherUser
        )
        expect(result).not.toContainEqual(
          scenario.invoice.paidCreatedByAnotherUser
        )
      }
    )
  })

  describe('get one', () => {
    scenario(
      'returns an invoice created by current user',
      async (scenario: StandardScenario) => {
        const result = await invoice({
          id: scenario.invoice.draftCreatedByTestUser.id,
        })
        expect(result).toEqual(scenario.invoice.draftCreatedByTestUser)
      }
    )

    scenario(
      'does not return an invoice if created by another user',
      async (scenario: StandardScenario) => {
        const result = await invoice({
          id: scenario.invoice.draftCreatedByAnotherUser.id,
        })
        expect(result).toBe(null)
      }
    )
  })

  describe('create', () => {
    scenario('validates input properly', async () => {
      let result

      try {
        result = await createInvoice({
          input: {
            billFromCity: faker.random.alphaNumeric(200),
            billFromCountry: faker.random.alphaNumeric(200),
            billFromPostCode: faker.random.alphaNumeric(20),
          },
        })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(`
          [ZodError: [
            {
              "code": "too_big",
              "maximum": 100,
              "type": "string",
              "inclusive": true,
              "exact": false,
              "message": "String must contain at most 100 character(s)",
              "path": [
                "billFromCity"
              ]
            },
            {
              "code": "too_big",
              "maximum": 10,
              "type": "string",
              "inclusive": true,
              "exact": false,
              "message": "String must contain at most 10 character(s)",
              "path": [
                "billFromPostCode"
              ]
            },
            {
              "code": "too_big",
              "maximum": 100,
              "type": "string",
              "inclusive": true,
              "exact": false,
              "message": "String must contain at most 100 character(s)",
              "path": [
                "billFromCountry"
              ]
            }
          ]]
        `)
      }

      expect(result).toBeUndefined()
    })

    scenario(
      'creates an empty invoice with the status of DRAFT and relation to author',
      async () => {
        const result = await createInvoice({ input: {} })

        expect(result.authorId).toBe(currentUser.id)
        expect(result.status).toBe('DRAFT')
        expect(result.paymentDue).toBeNull()
      }
    )

    scenario('creates related sender address record', async () => {
      const {
        billFromCity,
        billFromCountry,
        billFromPostCode,
        billFromStreet,
      } = createAddressInputFactory.build()

      const result = await createInvoice({
        input: {
          billFromCity,
          billFromCountry,
          billFromPostCode,
          billFromStreet,
        },
      })

      const senderAddress = await db.address.findUnique({
        where: { id: result.senderAddressId as string },
      })

      expect(senderAddress).toMatchObject({
        city: billFromCity,
        country: billFromCountry,
        street: billFromStreet,
        postCode: billFromPostCode,
      })
      expect(result.status).toBe('DRAFT')
    })

    scenario('creates related customer record', async () => {
      const {
        clientCity,
        clientCountry,
        clientEmail,
        clientName,
        clientPostCode,
        clientStreet,
      } = createCustomerInputFactory.build()

      const result = await createInvoice({
        input: {
          clientCity,
          clientCountry,
          clientStreet,
          clientPostCode,
          clientName,
          clientEmail,
        },
      })

      const customer = await db.customer.findUnique({
        where: { id: result.customerId as string },
      })

      expect(customer).toMatchObject({
        name: clientName,
        email: clientEmail,
      })

      const customerAddress = await db.address.findUnique({
        where: { id: customer?.addressId as string },
      })

      expect(customerAddress).toMatchObject({
        city: clientCity,
        country: clientCountry,
        street: clientStreet,
        postCode: clientPostCode,
      })
      expect(result.status).toBe('DRAFT')
    })

    scenario(
      'creates related invoice item records',
      async (scenario: StandardScenario) => {
        const firstItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.one.id,
        })
        const secondItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.two.id,
        })

        const result = await createInvoice({
          input: {
            items: [firstItemInput, secondItemInput],
          },
        })

        const firstItem = await db.invoiceItem.findFirst({
          where: {
            invoiceId: result.id,
            productId: scenario.product.one.id,
          },
        })

        expect(firstItem).toMatchObject(firstItemInput)

        const secondItem = await db.invoiceItem.findFirst({
          where: {
            invoiceId: result.id,
            productId: scenario.product.two.id,
          },
        })

        expect(secondItem).toMatchObject(secondItemInput)
        expect(result.status).toBe('DRAFT')
      }
    )

    scenario(
      'calculates paymentDue date properly and saves it to the database if issueDate and paymentTerms arguments are provided',
      async () => {
        const issueDate = new Date('2023-01-01')
        const paymentTerms = 14
        const expectedPaymentDueDateString = '2023-01-15' // issueDate + 14 days

        const result = await createInvoice({
          input: { issueDate, paymentTerms },
        })

        expect(expectedPaymentDueDateString).toBe(
          formatISO(new Date(result.paymentDue as Date), {
            representation: 'date',
          })
        )
        expect(result.status).toBe('DRAFT')
      }
    )

    scenario(
      'creates an invoice with the status of PENDING if all fields are provided',
      async (scenario: StandardScenario) => {
        const firstItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.one.id,
        })
        const secondItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.two.id,
        })

        const result = await createInvoice({
          input: createInvoiceInputFactory.build({
            items: [firstItemInput, secondItemInput],
          }),
        })

        expect(result.status).toBe('PENDING')
      }
    )
  })
})
