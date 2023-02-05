import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import { formatISO } from 'date-fns'
import { InvoiceItem } from 'types/graphql'

import type { CurrentUser } from '@redwoodjs/auth'

import { db } from 'src/lib/db'
import {
  createInvoiceItemInputFactory,
  createInvoiceCustomerInputFactory,
  createSenderAddressInputFactory,
  invoiceInputFactory,
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
      } = createSenderAddressInputFactory.build()

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
      } = createInvoiceCustomerInputFactory.build()

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

        expect(
          formatISO(new Date(result.paymentDue as Date), {
            representation: 'date',
          })
        ).toBe(expectedPaymentDueDateString)
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
          input: invoiceInputFactory.build({
            items: [firstItemInput, secondItemInput],
          }),
        })

        expect(result.status).toBe('PENDING')
      }
    )
  })

  describe('update', () => {
    scenario(
      'throws an error if user is trying to update an ivoice created by another user',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateInvoice({
            id: scenario.invoice.draftCreatedByAnotherUser.id,
            input: {},
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: You don't have permission to do that]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws an error if user is trying to update an ivoice with the status of PAID',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateInvoice({
            id: scenario.invoice.paidCreatedByTestUser.id,
            input: {},
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: This operation is not allowed on an invoice with the status of PAID]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws an error if user is trying to update non-existing invoice',
      async () => {
        let result

        try {
          result = await updateInvoice({
            id: createId(),
            input: {},
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: Invoice to update not found]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws a validation error if not all required fields are provided',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await updateInvoice({
            id: scenario.invoice.draftCreatedByTestUser.id,
            input: {},
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(`
            [ZodError: [
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "billFromStreet"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "billFromCity"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "billFromPostCode"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "billFromCountry"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientName"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientEmail"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientCity"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientStreet"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientPostCode"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "clientCountry"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_union",
                "unionErrors": [
                  {
                    "issues": [
                      {
                        "code": "invalid_type",
                        "expected": "string",
                        "received": "undefined",
                        "path": [
                          "issueDate"
                        ],
                        "message": "Required"
                      }
                    ],
                    "name": "ZodError"
                  },
                  {
                    "issues": [
                      {
                        "code": "invalid_type",
                        "expected": "date",
                        "received": "undefined",
                        "path": [
                          "issueDate"
                        ],
                        "message": "Required"
                      }
                    ],
                    "name": "ZodError"
                  }
                ],
                "path": [
                  "issueDate"
                ],
                "message": "Invalid input"
              },
              {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                  "description"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "number",
                "received": "undefined",
                "path": [
                  "paymentTerms"
                ],
                "message": "Required"
              },
              {
                "code": "invalid_type",
                "expected": "array",
                "received": "undefined",
                "path": [
                  "items"
                ],
                "message": "Required"
              }
            ]]
          `)
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'updates related address record if it exists',
      async (scenario: StandardScenario) => {
        const { fullCreatedByTestUser: existingInvoice } = scenario.invoice

        const input = invoiceInputFactory.build()

        const result = await updateInvoice({ id: existingInvoice.id, input })

        expect(existingInvoice.senderAddressId).toBe(result.senderAddressId)

        const updatedAddressRecord = await db.address.findUnique({
          where: { id: result.senderAddressId as string },
        })

        expect(updatedAddressRecord?.city).toBe(input.billFromCity)
        expect(updatedAddressRecord?.country).toBe(input.billFromCountry)
        expect(updatedAddressRecord?.street).toBe(input.billFromStreet)
        expect(updatedAddressRecord?.postCode).toBe(input.billFromPostCode)

        expect(result.status).toBe('PENDING')
      }
    )

    scenario(
      "creates related address record if it doesn't exist",
      async (scenario: StandardScenario) => {
        const { draftCreatedByTestUser: existingInvoice } = scenario.invoice

        const input = invoiceInputFactory.build()

        const result = await updateInvoice({ id: existingInvoice.id, input })

        const createdAddressRecord = await db.address.findUnique({
          where: { id: result.senderAddressId as string },
        })

        expect(createdAddressRecord?.city).toBe(input.billFromCity)
        expect(createdAddressRecord?.country).toBe(input.billFromCountry)
        expect(createdAddressRecord?.street).toBe(input.billFromStreet)
        expect(createdAddressRecord?.postCode).toBe(input.billFromPostCode)

        expect(result.status).toBe('PENDING')
      }
    )

    scenario(
      'updates related customer record if it exists',
      async (scenario: StandardScenario) => {
        const { fullCreatedByTestUser: existingInvoice } = scenario.invoice

        const input = invoiceInputFactory.build()

        const result = await updateInvoice({ id: existingInvoice.id, input })

        expect(existingInvoice.customerId).toBe(result.customerId)

        const updatedCustomerRecord = await db.customer.findUnique({
          where: { id: result.customerId as string },
        })

        const customerAddressRecord = await db.address.findUnique({
          where: { id: updatedCustomerRecord?.addressId as string },
        })

        expect(updatedCustomerRecord?.name).toBe(input.clientName)
        expect(updatedCustomerRecord?.email).toBe(input.clientEmail)

        expect(customerAddressRecord?.city).toBe(input.clientCity)
        expect(customerAddressRecord?.country).toBe(input.clientCountry)
        expect(customerAddressRecord?.street).toBe(input.clientStreet)
        expect(customerAddressRecord?.postCode).toBe(input.clientPostCode)

        expect(result.status).toBe('PENDING')
      }
    )

    scenario(
      "creates related customer record if it doesn't exist",
      async (scenario: StandardScenario) => {
        const { draftCreatedByTestUser: existingInvoice } = scenario.invoice

        const input = invoiceInputFactory.build()

        const result = await updateInvoice({ id: existingInvoice.id, input })

        const createdCustomerRecord = await db.customer.findUnique({
          where: { id: result.customerId as string },
        })

        const customerAddressRecord = await db.address.findUnique({
          where: { id: createdCustomerRecord?.addressId as string },
        })

        expect(createdCustomerRecord?.name).toBe(input.clientName)
        expect(createdCustomerRecord?.email).toBe(input.clientEmail)

        expect(customerAddressRecord?.city).toBe(input.clientCity)
        expect(customerAddressRecord?.country).toBe(input.clientCountry)
        expect(customerAddressRecord?.street).toBe(input.clientStreet)
        expect(customerAddressRecord?.postCode).toBe(input.clientPostCode)

        expect(result.status).toBe('PENDING')
      }
    )

    scenario(
      'deletes all related invoice item records and creates new ones',
      async (scenario: StandardScenario) => {
        const existingInvoice = await db.invoice.findUnique({
          where: { id: scenario.invoice.fullCreatedByTestUser.id },
          include: { items: true },
        })

        const firstItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.one.id,
        })

        const secondItemInput = createInvoiceItemInputFactory.build({
          productId: scenario.product.two.id,
        })

        const input = invoiceInputFactory.build({
          items: [firstItemInput, secondItemInput],
        })

        const result = await updateInvoice({
          id: existingInvoice?.id as string,
          input,
        })

        // Make sure old items have been deleted
        for (const item of existingInvoice?.items as InvoiceItem[]) {
          const itemResult = await db.invoiceItem.findUnique({
            where: { id: item.id },
          })

          expect(itemResult).toBe(null)
        }

        // Get updated invoice
        const updatedInvoice = await db.invoice.findUnique({
          where: { id: result.id },
          include: { items: true },
        })

        // Make sure new items have been created
        expect(updatedInvoice?.items.length).toBe(2)
        expect(updatedInvoice?.items[0].productId).toBe(scenario.product.one.id)
        expect(updatedInvoice?.items[1].productId).toBe(scenario.product.two.id)

        expect(result.status).toBe('PENDING')
      }
    )

    scenario(
      'updates all invoice fields properly',
      async (scenario: StandardScenario) => {
        const { fullCreatedByTestUser: existingInvoice } = scenario.invoice

        const newIssueDate = new Date('2023-01-01')
        const newPaymentTerms = 14
        const expectedPaymentDueDateString = '2023-01-15' // issueDate + 14 days

        const input = invoiceInputFactory.build({
          issueDate: newIssueDate,
          paymentTerms: newPaymentTerms,
        })

        const result = await updateInvoice({ id: existingInvoice.id, input })

        expect(result.description).toBe(input.description)
        expect(result.paymentTerms).toBe(input.paymentTerms)
        expect(
          formatISO(new Date(result.paymentDue as Date), {
            representation: 'date',
          })
        ).toBe(expectedPaymentDueDateString)

        expect(result.status).toBe('PENDING')
      }
    )
  })

  describe('delete', () => {
    scenario(
      'throws an error if user is trying to delete an invoice created by another user',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await deleteInvoice({
            id: scenario.invoice.draftCreatedByAnotherUser.id,
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: You don't have permission to do that]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws an error if user is trying to delete an invoice with the status of PENDING',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await deleteInvoice({
            id: scenario.invoice.pendingCreatedByTestUser.id,
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: This operation is not allowed on an invoice with the status of PENDING]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'throws an error if user is trying to delete an invoice with the status of PAID',
      async (scenario: StandardScenario) => {
        let result

        try {
          result = await deleteInvoice({
            id: scenario.invoice.paidCreatedByTestUser.id,
          })
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[GraphQLError: This operation is not allowed on an invoice with the status of PAID]`
          )
        }

        expect(result).toBeUndefined()
      }
    )

    scenario(
      'deletes an invoice if user is an author',
      async (scenario: StandardScenario) => {
        const result = await deleteInvoice({
          id: scenario.invoice.draftCreatedByTestUser.id,
        })

        expect(result.id).toBe(scenario.invoice.draftCreatedByTestUser.id)
        expect(result.description).toBe(
          scenario.invoice.draftCreatedByTestUser.description
        )
      }
    )

    scenario(
      'deletes an invoice if user is an admin',
      async (scenario: StandardScenario) => {
        mockCurrentUser({ ...currentUser, roles: 'ADMIN' })

        const result = await deleteInvoice({
          id: scenario.invoice.draftCreatedByAnotherUser.id,
        })

        expect(result.id).toBe(scenario.invoice.draftCreatedByAnotherUser.id)
        expect(result.description).toBe(
          scenario.invoice.draftCreatedByAnotherUser.description
        )
      }
    )
  })
})
