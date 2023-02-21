import { addDays } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  InvoiceRelationResolvers,
  CreateInvoiceItemInput,
  InvoiceStatus,
} from 'types/graphql'

import { ForbiddenError, RedwoodGraphQLError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  AddressInput,
  createAddress,
  updateAddress,
} from 'src/services/addresses/addresses'
import {
  createCustomer,
  CustomerInput,
  updateCustomer,
} from 'src/services/customers/customers'
import {
  createInvoiceItems,
  deleteInvoiceItems,
} from 'src/services/invoiceItems/invoiceItems'

import { draftInvoiceInputSchema, pendingInvoiceInputSchema } from './schemas'

function setAuthorFilters() {
  return hasRole('ADMIN') ? {} : { authorId: context.currentUser?.id }
}

export const invoices: QueryResolvers['invoices'] = ({ status }) => {
  return db.invoice.findMany({
    where: { status: status || undefined, ...setAuthorFilters() },
  })
}

export const invoice: QueryResolvers['invoice'] = ({ id }) => {
  return db.invoice.findFirst({
    where: { id, ...setAuthorFilters() },
  })
}

type CalculatePaymentDueDateArgs = {
  issueDate: string | Date
  paymentTerms: number
}

function calculatePaymentDueDate({
  issueDate,
  paymentTerms,
}: CalculatePaymentDueDateArgs) {
  return addDays(new Date(issueDate), paymentTerms)
}

export const createInvoice: MutationResolvers['createInvoice'] = ({
  input,
}) => {
  let parsedInput

  const pendingInvoiceInputSchemaParseResult =
    pendingInvoiceInputSchema.safeParse(input)

  if (pendingInvoiceInputSchemaParseResult.success) {
    parsedInput = pendingInvoiceInputSchemaParseResult.data
  } else {
    parsedInput = draftInvoiceInputSchema.parse(input)
  }

  const {
    description,
    issueDate,
    paymentTerms,
    billFromCity,
    billFromCountry,
    billFromPostCode,
    billFromStreet,
    clientName,
    clientEmail,
    clientCity,
    clientCountry,
    clientStreet,
    clientPostCode,
    items,
  } = parsedInput

  return db.invoice.create({
    data: {
      description,
      issueDate,
      paymentDue:
        issueDate && paymentTerms
          ? calculatePaymentDueDate({ issueDate, paymentTerms })
          : undefined,
      paymentTerms,
      senderAddress: {
        create: {
          city: billFromCity,
          country: billFromCountry,
          street: billFromStreet,
          postCode: billFromPostCode,
        },
      },
      customer: {
        create: {
          name: clientName,
          email: clientEmail,
          address: {
            create: {
              city: clientCity,
              country: clientCountry,
              street: clientStreet,
              postCode: clientPostCode,
            },
          },
          author: { connect: { id: context.currentUser?.id } },
        },
      },
      items: items
        ? {
            createMany: {
              data: items.map(({ productId, price, quantity }) => ({
                productId,
                price,
                quantity,
              })),
            },
          }
        : undefined,
      status: pendingInvoiceInputSchemaParseResult.success
        ? 'PENDING'
        : 'DRAFT',
      author: { connect: { id: context.currentUser?.id } },
    },
  })
}

type UpdateOrCreateInvoiceSenderAddressArgs = {
  existingAddressId?: string | null
  input: AddressInput
}

async function updateOrCreateAddress({
  existingAddressId,
  input,
}: UpdateOrCreateInvoiceSenderAddressArgs) {
  let addressId = existingAddressId

  if (addressId) {
    await updateAddress({
      id: addressId,
      input,
    })
  } else {
    const address = await createAddress(input)

    addressId = address.id
  }

  return addressId
}

type UpdateOrCreateInvoiceCustomerArgs = {
  existingCustomerId?: string | null
  customerInput: CustomerInput
  addressInput: AddressInput
}

async function updateOrCreateCustomer({
  existingCustomerId,
  customerInput,
  addressInput,
}: UpdateOrCreateInvoiceCustomerArgs) {
  // Handle customer update
  let customerId = existingCustomerId

  if (customerId) {
    const updatedCustomer = await updateCustomer({
      id: customerId,
      input: customerInput,
    })

    const customerAddressId = await updateOrCreateAddress({
      existingAddressId: updatedCustomer.addressId,
      input: addressInput,
    })

    await updateCustomer({
      id: customerId,
      input: { addressId: customerAddressId },
    })
  } else {
    const address = await createAddress(addressInput)
    const customer = await createCustomer({
      ...customerInput,
      addressId: address.id,
    })

    customerId = customer.id
  }

  return customerId
}

type UpdateInvoiceItemsArgs = {
  invoiceId: string
  itemsInput: CreateInvoiceItemInput[]
}

async function updateInvoiceItems({
  invoiceId,
  itemsInput,
}: UpdateInvoiceItemsArgs) {
  // First - we need to delete all already exisitng invoice items
  await deleteInvoiceItems(invoiceId)

  // Then we need to create new items based on the input
  await createInvoiceItems(itemsInput.map((item) => ({ invoiceId, ...item })))
}

function checkPermissions(authorId: string) {
  if (authorId !== context.currentUser?.id && !hasRole('ADMIN')) {
    throw new ForbiddenError("You don't have permission to do that")
  }
}

type CheckAllowedStatusesArgs = {
  status: InvoiceStatus
  allowedStatuses: InvoiceStatus[]
}

function checkAllowedStatuses({
  status,
  allowedStatuses,
}: CheckAllowedStatusesArgs) {
  if (!allowedStatuses.includes(status)) {
    throw new ForbiddenError(
      `This operation is not allowed on an invoice with the status of ${status}`
    )
  }
}

export const updateInvoice: MutationResolvers['updateInvoice'] = async ({
  id,
  input,
}) => {
  const invoice = await db.invoice.findUnique({ where: { id } })

  if (!invoice) {
    throw new RedwoodGraphQLError('Invoice to update not found')
  }

  checkPermissions(invoice.authorId)

  checkAllowedStatuses({
    status: invoice.status,
    allowedStatuses: ['DRAFT', 'PENDING'],
  })

  const { description, issueDate, items, paymentTerms, ...parsedInput } =
    pendingInvoiceInputSchema.parse(input)

  const senderAddressId = await updateOrCreateAddress({
    existingAddressId: invoice.senderAddressId,
    input: {
      city: parsedInput.billFromCity,
      country: parsedInput.billFromCountry,
      postCode: parsedInput.billFromPostCode,
      street: parsedInput.billFromStreet,
    },
  })

  const customerId = await updateOrCreateCustomer({
    existingCustomerId: invoice.customerId,
    customerInput: {
      name: parsedInput.clientName,
      email: parsedInput.clientEmail,
    },
    addressInput: {
      city: parsedInput.clientCity,
      country: parsedInput.clientCountry,
      postCode: parsedInput.clientPostCode,
      street: parsedInput.clientStreet,
    },
  })

  await updateInvoiceItems({ invoiceId: invoice.id, itemsInput: items })

  return db.invoice.update({
    data: {
      status: 'PENDING',
      senderAddressId,
      customerId,
      issueDate,
      description,
      paymentTerms,
      paymentDue: calculatePaymentDueDate({ issueDate, paymentTerms }),
    },
    where: { id },
  })
}

export const deleteInvoice: MutationResolvers['deleteInvoice'] = async ({
  id,
}) => {
  const invoice = await db.invoice.findUnique({ where: { id } })

  if (!invoice) {
    throw new RedwoodGraphQLError('Invoice to delete not found')
  }

  checkPermissions(invoice.authorId)

  checkAllowedStatuses({
    status: invoice.status,
    allowedStatuses: ['DRAFT'],
  })

  return db.invoice.delete({
    where: { id },
  })
}

export const Invoice: InvoiceRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.invoice.findUnique({ where: { id: root?.id } }).customer()
  },
  senderAddress: (_obj, { root }) => {
    return db.invoice.findUnique({ where: { id: root?.id } }).senderAddress()
  },
  items: async (_obj, { root }) => {
    const items = await db.invoice
      .findUnique({ where: { id: root?.id } })
      .items()

    return items || []
  },
  totalAmount: async (_obj, { root }) => {
    const items = await db.invoice
      .findUnique({ where: { id: root?.id } })
      .items()

    if (!items) {
      return 0
    }

    return items.reduce((acc, curr) => {
      if (!curr?.price || !curr?.quantity) {
        return acc
      }

      return acc + curr.price * curr.quantity
    }, 0)
  },
}
