import { render, screen } from 'src/test/utils'

import { Loading, Empty, Failure, Success } from './InvoicesCountCell'
import { standard } from './InvoicesCountCell.mock'

describe('InvoicesCountCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders "No invoices" text', async () => {
    render(<Empty />)

    expect(screen.getByText(/no invoices/i)).toBeInTheDocument()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders "X invoices" text on mobile if there is no STATUS filter applied', async () => {
    const { invoices } = standard()

    render(<Success invoices={invoices} />)

    expect(screen.getByText(`${invoices.length} invoices`)).toBeInTheDocument()
  })

  it('renders "There are X total invoices" text on desktop if there is no STATUS filter applied', async () => {
    const { invoices } = standard()

    render(<Success invoices={invoices} />)

    expect(
      screen.getByText(`There are ${invoices.length} total invoices`)
    ).toBeInTheDocument()
  })

  it('renders "X STATUS invoices" text on mobile if there is STATUS filter applied', async () => {
    const status = 'DRAFT'

    const { invoices } = standard({ status })

    render(<Success invoices={invoices} status={status} />)

    expect(
      screen.getByText(`${invoices.length} ${status.toLowerCase()} invoices`)
    ).toBeInTheDocument()
  })

  it('renders "There are X STATUS invoices" text on desktop if there is STATUS filter applied', async () => {
    const status = 'DRAFT'

    const { invoices } = standard({ status })

    render(<Success invoices={invoices} status={status} />)

    expect(
      screen.getByText(`There are ${invoices.length} ${status} invoices`, {
        exact: false,
      })
    ).toBeInTheDocument()
  })
})
