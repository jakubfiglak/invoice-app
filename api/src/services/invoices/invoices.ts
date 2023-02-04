import { addDays } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  InvoiceRelationResolvers,
} from 'types/graphql'

import { ForbiddenError, RedwoodGraphQLError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  AddressInput,
  createAddress,
  updateAddress,
} from 'src/services/addresses/addresses'

import { draftInvoiceInputSchema, pendingInvoiceInputSchema } from './schemas'

export const invoices: QueryResolvers['invoices'] = ({ status }) => {
  return db.invoice.findMany({
    where: { authorId: context.currentUser?.id, status: status || undefined },
  })
}

export const invoice: QueryResolvers['invoice'] = ({ id }) => {
  return db.invoice.findFirst({
    where: { id, authorId: context.currentUser?.id },
  })
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
          ? addDays(new Date(issueDate), paymentTerms)
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
  existingSenderAddressId?: string | null
  input: AddressInput
}

async function updateOrCreateInvoiceSenderAddress({
  existingSenderAddressId,
  input,
}: UpdateOrCreateInvoiceSenderAddressArgs) {
  let invoiceSenderAddressId = existingSenderAddressId

  if (invoiceSenderAddressId) {
    await updateAddress({
      id: invoiceSenderAddressId,
      input,
    })
  } else {
    const senderAddress = await createAddress(input)

    invoiceSenderAddressId = senderAddress.id
  }

  return invoiceSenderAddressId
}

export const updateInvoice: MutationResolvers['updateInvoice'] = async ({
  id,
  input,
}) => {
  const invoice = await db.invoice.findUnique({ where: { id } })

  if (!invoice) {
    throw new RedwoodGraphQLError('Invoice to update not found')
  }

  if (invoice?.authorId !== context.currentUser?.id && !hasRole('ADMIN')) {
    throw new ForbiddenError("You don't have permission to do that")
  }

  if (invoice?.status === 'PAID') {
    throw new ForbiddenError(
      'You cannot update an invoice with the status of PAID'
    )
  }

  const {
    billFromCity,
    billFromCountry,
    billFromPostCode,
    billFromStreet,
    clientCity,
    clientCountry,
    clientEmail,
    clientName,
    clientPostCode,
    clientStreet,
    description,
    issueDate,
    items,
    paymentTerms,
  } = pendingInvoiceInputSchema.parse(input)

  const invoiceSenderAddressId = await updateOrCreateInvoiceSenderAddress({
    existingSenderAddressId: invoice.senderAddressId,
    input: {
      city: billFromCity,
      country: billFromCountry,
      postCode: billFromPostCode,
      street: billFromStreet,
    },
  })

  // Handle customer update
  let customerId = invoice.customerId

  if (customerId) {
    const updatedCustomer = await db.customer.update({
      where: { id: customerId },
      data: {
        name: clientName,
        email: clientEmail,
      },
    })

    let customerAddressId = updatedCustomer.addressId

    if (customerAddressId) {
      await db.address.update({
        where: { id: customerAddressId },
        data: {
          city: clientCity,
          country: clientCountry,
          postCode: clientPostCode,
          street: clientStreet,
        },
      })
    } else {
      const newCustomerAddress = await db.address.create({
        data: {
          city: clientCity,
          country: clientCountry,
          postCode: clientPostCode,
          street: clientStreet,
        },
      })

      customerAddressId = newCustomerAddress.id
    }
    await db.customer.update({
      where: { id: customerId },
      data: { addressId: customerAddressId },
    })
  } else {
    const customer = await db.customer.create({
      data: {
        name: clientName,
        email: clientEmail,
        address: {
          create: {
            city: clientCity,
            country: clientCountry,
            postCode: clientPostCode,
            street: clientStreet,
          },
        },
        author: { connect: { id: invoice.authorId } },
      },
    })

    customerId = customer.id
  }

  // Handle items update
  // First - we need to delete all already exisitng invoice items
  await db.invoiceItem.deleteMany({ where: { invoiceId: invoice.id } })

  // Then we need to create new items based on the input
  await db.invoiceItem.createMany({
    data: items.map(({ productId, price, quantity }) => ({
      invoiceId: invoice.id,
      productId,
      price,
      quantity,
    })),
  })

  return db.invoice.update({
    data: {
      status: 'PENDING',
      senderAddressId: invoiceSenderAddressId,
      customerId,
      issueDate,
      description,
      paymentTerms,
      paymentDue: addDays(new Date(issueDate), paymentTerms),
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

  if (invoice.authorId !== context.currentUser?.id && !hasRole('ADMIN')) {
    throw new ForbiddenError("You don't have permission to do that")
  }

  if (invoice.status !== 'DRAFT') {
    throw new ForbiddenError(
      `You cannot delete an invoice with the status of ${invoice.status}`
    )
  }

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
  items: (_obj, { root }) => {
    return db.invoice.findUnique({ where: { id: root?.id } }).items()
  },
}
