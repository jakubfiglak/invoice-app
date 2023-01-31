import { addDays } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  InvoiceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import {
  draftInvoiceInputSchema,
  pendingInvoiceInputSchema,
} from 'src/services/invoices/schemas'

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

export const updateInvoice: MutationResolvers['updateInvoice'] = ({
  id,
  input,
}) => {
  return db.invoice.update({
    data: input,
    where: { id },
  })
}

export const deleteInvoice: MutationResolvers['deleteInvoice'] = ({ id }) => {
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
  author: (_obj, { root }) => {
    return db.invoice.findUnique({ where: { id: root?.id } }).author()
  },
}
