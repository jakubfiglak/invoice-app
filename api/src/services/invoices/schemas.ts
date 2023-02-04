import { z } from 'zod'

export const draftInvoiceInputSchema = z.object({
  billFromStreet: z.string().min(1).max(100).optional(),
  billFromCity: z.string().min(1).max(100).optional(),
  billFromPostCode: z.string().min(1).max(10).optional(),
  billFromCountry: z.string().min(1).max(100).optional(),
  clientName: z.string().min(1).max(100).optional(),
  clientEmail: z.string().email().optional(),
  clientCity: z.string().min(1).max(100).optional(),
  clientStreet: z.string().min(1).max(100).optional(),
  clientPostCode: z.string().min(1).max(10).optional(),
  clientCountry: z.string().min(1).max(100).optional(),
  issueDate: z.union([z.string().datetime(), z.date()]).optional(),
  description: z.string().min(1).max(200).optional(),
  paymentTerms: z.number().int().positive().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().int().positive(),
      })
    )
    .optional(),
})

export const pendingInvoiceInputSchema = draftInvoiceInputSchema.required()
