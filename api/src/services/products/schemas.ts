import { z } from 'zod'

export const createProductInputSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must be at least 1 character long')
    .max(100, 'Name must be at most 100 characters long'),
  price: z.number().min(0, 'Price cannot be negative'),
})

export const updateProductInputSchema = createProductInputSchema.partial()
