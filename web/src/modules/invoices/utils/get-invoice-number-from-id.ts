export function getInvoiceNumberFromId(id: string) {
  if (id.length <= 6) {
    return id.toUpperCase()
  }

  return id.substring(id.length - 6).toUpperCase()
}
