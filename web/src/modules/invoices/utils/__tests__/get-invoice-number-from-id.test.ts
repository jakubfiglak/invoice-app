import { getInvoiceNumberFromId } from '../get-invoice-number-from-id'

describe('getInvoiceNumberFromId', () => {
  it('should return uppercased input if input lenght is less than or equal to 6 characters', () => {
    expect(getInvoiceNumberFromId('abc123')).toBe('ABC123')
    expect(getInvoiceNumberFromId('abc')).toBe('ABC')
    expect(getInvoiceNumberFromId('a')).toBe('A')
  })

  it('should return uppercased last 6 characters of the input if input lenght is greater than 6 characters', () => {
    expect(getInvoiceNumberFromId('qwertyabc123')).toBe('ABC123')
    expect(getInvoiceNumberFromId('1234567890qwertyzxcvbn')).toBe('ZXCVBN')
  })
})
