import { db } from 'src/lib/db'

export type AddressInput = {
  city?: string
  country?: string
  street?: string
  postCode?: string
}

export const createAddress = (input: AddressInput) => {
  return db.address.create({
    data: input,
  })
}

export type UpdateAddressArgs = {
  id: string
  input: AddressInput
}

export const updateAddress = ({ id, input }: UpdateAddressArgs) => {
  return db.address.update({ where: { id }, data: input })
}
