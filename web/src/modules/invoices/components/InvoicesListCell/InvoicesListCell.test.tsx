import { render } from 'src/test/utils'

import { Loading, Empty, Failure, Success } from './InvoicesListCell'
import { standard } from './InvoicesListCell.mock'

describe('InvoicesListCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success invoices={standard().invoices} />)
    }).not.toThrow()
  })
})
