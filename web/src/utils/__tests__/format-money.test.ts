import { formatMoney } from '../format-money'

describe('formatDate', () => {
  it('formats money properly', () => {
    expect(formatMoney(5)).toBe('£5.00')
    expect(formatMoney(666.0)).toBe('£666.00')
    expect(formatMoney(1000)).toBe('£1,000.00')
    expect(formatMoney(150000.56)).toBe('£150,000.56')
  })
})
