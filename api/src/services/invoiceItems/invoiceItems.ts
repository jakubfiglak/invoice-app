import { db } from 'src/lib/db'

export type InvoiceItemInput = {
  price: number
  quantity: number
  productId: string
  invoiceId: string
}

export const createInvoiceItems = (input: InvoiceItemInput[]) => {
  return db.invoiceItem.createMany({
    data: input,
  })
}

export const deleteInvoiceItems = (invoiceId: string) => {
  return db.invoiceItem.deleteMany({
    where: { invoiceId },
  })
}
