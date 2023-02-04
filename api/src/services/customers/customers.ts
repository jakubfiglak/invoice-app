import { db } from 'src/lib/db'

export type CustomerInput = {
  name?: string
  email?: string
  addressId?: string
}

export const createCustomer = (input: CustomerInput) => {
  return db.customer.create({
    data: { ...input, authorId: context.currentUser?.id as string },
  })
}

export type UpdateCustomerArgs = {
  id: string
  input: CustomerInput
}

export const updateCustomer = ({ id, input }: UpdateCustomerArgs) => {
  return db.customer.update({
    data: input,
    where: { id },
  })
}
