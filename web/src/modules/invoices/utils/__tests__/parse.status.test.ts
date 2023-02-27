import { parseStatus } from '../parse-status'

describe('parseStatus', () => {
  it('returns undefined if no argument is passed', () => {
    expect(parseStatus()).toBeUndefined()
  })

  it('returns undefined if passed argument is not one of the expected values (paid, draft or pending)', () => {
    expect(parseStatus('whatever')).toBeUndefined()
    expect(parseStatus('qwerty123')).toBeUndefined()
    expect(parseStatus('zxcvbnm')).toBeUndefined()
  })

  it("parses the argument correctly and returns it's upperCased version if it's one of the expected values (paid, draft or pending)", () => {
    expect(parseStatus('paid')).toBe('PAID')
    expect(parseStatus('pAiD')).toBe('PAID')
    expect(parseStatus('PAID')).toBe('PAID')
    expect(parseStatus('draft')).toBe('DRAFT')
    expect(parseStatus('dRaFt')).toBe('DRAFT')
    expect(parseStatus('DRAFT')).toBe('DRAFT')
    expect(parseStatus('pending')).toBe('PENDING')
    expect(parseStatus('pEnDiNg')).toBe('PENDING')
    expect(parseStatus('PENDING')).toBe('PENDING')
  })
})
