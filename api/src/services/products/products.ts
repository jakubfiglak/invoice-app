import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { hasRole } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { createProductInputSchema, updateProductInputSchema } from './schemas'

export const products: QueryResolvers['products'] = () => {
  return db.product.findMany({
    where: { authorId: context.currentUser?.id },
  })
}

export const product: QueryResolvers['product'] = ({ id }) => {
  return db.product.findFirst({
    where: { id, authorId: context.currentUser?.id },
  })
}

export const createProduct: MutationResolvers['createProduct'] = ({
  input,
}) => {
  const parsedInput = createProductInputSchema.parse(input)

  return db.product.create({
    data: { ...parsedInput, authorId: context.currentUser?.id as string },
  })
}

export const updateProduct: MutationResolvers['updateProduct'] = async ({
  id,
  input,
}) => {
  const product = await db.product.findUnique({ where: { id } })

  if (product?.authorId !== context.currentUser?.id && !hasRole('ADMIN')) {
    throw new ForbiddenError("You don't have permission to do that")
  }

  const parsedInput = updateProductInputSchema.parse(input)

  return db.product.update({
    data: parsedInput,
    where: { id },
  })
}

export const deleteProduct: MutationResolvers['deleteProduct'] = async ({
  id,
}) => {
  const product = await db.product.findUnique({ where: { id } })

  if (product?.authorId !== context.currentUser?.id && !hasRole('ADMIN')) {
    throw new ForbiddenError("You don't have permission to do that")
  }

  return db.product.delete({
    where: { id },
  })
}
