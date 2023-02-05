import { z } from 'zod'

export const createProductInputSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().int().positive(),
})

export const updateProductInputSchema = createProductInputSchema.partial()
