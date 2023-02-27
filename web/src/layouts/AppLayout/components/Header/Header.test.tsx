import { faker } from '@faker-js/faker'

import { render, screen } from 'src/test/utils'

import Header from './Header'

describe('Header', () => {
  it('passes the class name properly', () => {
    const className = faker.random.word()

    render(<Header className={className} />)

    expect(screen.getByRole('banner')).toHaveClass(className)
  })

  it('renders all elements properly', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /invoices/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /user avatar/i })
    ).toBeInTheDocument()
  })
})
