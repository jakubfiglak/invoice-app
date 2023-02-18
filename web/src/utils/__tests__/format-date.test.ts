import { formatDate } from '../format-date'

describe('formatDate', () => {
  it('formats date properly if passed as a string', () => {
    expect(formatDate('2020-01-01')).toBe('01 Jan 2020')
    expect(formatDate('2021-08-23')).toBe('23 Aug 2021')
    expect(formatDate('2000-12-04')).toBe('04 Dec 2000')
  })

  it('formats date properly if passed as a date object', () => {
    expect(formatDate(new Date('2020-01-01'))).toBe('01 Jan 2020')
    expect(formatDate(new Date('2021-08-23'))).toBe('23 Aug 2021')
    expect(formatDate(new Date('2000-12-04'))).toBe('04 Dec 2000')
  })

  it('formats date properly if passed as a timestamp', () => {
    expect(formatDate(new Date('2020-01-01').getTime())).toBe('01 Jan 2020')
    expect(formatDate(new Date('2021-08-23').getTime())).toBe('23 Aug 2021')
    expect(formatDate(new Date('2000-12-04').getTime())).toBe('04 Dec 2000')
  })
})
