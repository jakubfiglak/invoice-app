import { ComponentProps } from 'react'

import { faker } from '@faker-js/faker'

import { routes } from '@redwoodjs/router'

import { render, screen } from 'src/test/utils'

import InvoiceListItem from './InvoiceListItem'

function renderInvoiceListItem(
  overrides: Partial<ComponentProps<typeof InvoiceListItem>>
) {
  return render(
    <InvoiceListItem
      id={faker.datatype.uuid()}
      status="PENDING"
      customerName={faker.name.fullName()}
      dueDate={faker.date.past().toISOString()}
      totalAmount={Number(faker.finance.amount())}
      {...overrides}
    />
  )
}

describe('InvoiceListItem', () => {
  it('links to the proper invoice page', () => {
    const id = faker.datatype.uuid()

    renderInvoiceListItem({ id })

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      routes.invoice({ id })
    )
  })

  it('renders invoice number properly', () => {
    const id = 'qwerty123abc'

    renderInvoiceListItem({ id })

    expect(
      screen.getByRole('heading', { name: '# 123ABC' })
    ).toBeInTheDocument()
  })

  it('renders total amount properly', () => {
    const totalAmount = 5000

    renderInvoiceListItem({ totalAmount })

    expect(screen.getByText('£5,000.00')).toBeInTheDocument()
  })

  it('renders customer name properly', () => {
    const customerName = faker.name.fullName()

    renderInvoiceListItem({ customerName })

    expect(screen.getByText(customerName)).toBeInTheDocument()
  })

  it('renders N/A if customer name is not provided', () => {
    renderInvoiceListItem({ customerName: undefined })

    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('renders due date properly', () => {
    const dueDate = '2023-04-04'

    renderInvoiceListItem({ dueDate })

    expect(screen.getByText(/due 04 apr 2023/i)).toBeInTheDocument()
  })

  it('renders invoice status properly', () => {
    renderInvoiceListItem({ status: 'PENDING' })

    expect(screen.getByText(/pending/i)).toBeInTheDocument()
  })
})
