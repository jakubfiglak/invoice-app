import { z } from 'zod'

const statusSchema = z.enum(['PENDING', 'PAID', 'DRAFT'])

export function parseStatus(status?: string) {
  if (!status) {
    return undefined
  }

  const result = statusSchema.safeParse(status.toUpperCase())

  if (result.success) {
    return result.data
  }

  if (result.error) {
    return undefined
  }
}
