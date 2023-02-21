import { testIds } from 'src/test/ids'
import { render, screen } from 'src/test/utils'

import { Loading, Empty, Failure, Success } from './InvoicesListCell'
import { standard } from './InvoicesListCell.mock'

describe('InvoicesListCell', () => {
  it('Loading renders loading skeletons', () => {
    render(<Loading />)

    const skeletons = screen.getAllByText(/loading/i)

    expect(skeletons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Empty successfully', async () => {
    render(<Empty />)

    expect(screen.getByTestId(testIds.invoicesPlaceholder)).toBeInTheDocument()
    expect(screen.getByText(/there is nothing here/i)).toBeInTheDocument()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('Success renders all passed invoices', async () => {
    const { invoices } = standard()

    render(<Success invoices={invoices} />)

    invoices.forEach((invoice) =>
      expect(
        screen.getByTestId(testIds.invoiceListItem(invoice.id))
      ).toBeInTheDocument()
    )
  })
})
