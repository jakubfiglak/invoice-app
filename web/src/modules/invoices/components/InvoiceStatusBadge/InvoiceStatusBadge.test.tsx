import { faker } from '@faker-js/faker'
import type { InvoiceStatus } from 'types/graphql'

import { render, screen } from 'src/test/utils'

import InvoiceStatusBadge from './InvoiceStatusBadge'

describe('InvoiceStatusBadge', () => {
  it('renders status properly', () => {
    const status = faker.helpers.arrayElement<InvoiceStatus>([
      'DRAFT',
      'PAID',
      'PENDING',
    ])

    render(<InvoiceStatusBadge status={status} />)

    screen.debug()

    expect(screen.getByText(status, { exact: false })).toBeInTheDocument()
  })
})
