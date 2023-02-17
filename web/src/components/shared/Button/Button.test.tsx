import { faker } from '@faker-js/faker'

import { render, screen, within, userEvent } from 'src/test/utils'

import Button from './Button'

describe('Button', () => {
  it('renders children properly', () => {
    const text = faker.lorem.word()

    render(<Button>{text}</Button>)

    expect(screen.getByRole('button', { name: text })).toBeInTheDocument()
  })

  it('triggers the onClick callback', async () => {
    const text = faker.lorem.word()
    const onClick = jest.fn()

    render(<Button onClick={onClick}>{text}</Button>)

    const button = screen.getByRole('button', { name: text })

    await userEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })

  it('renders the icon and children if variant prop is set to "primary-with-icon"', () => {
    const text = faker.lorem.word()

    render(<Button variant="primary-with-icon">{text}</Button>)

    const button = screen.getByRole('button', { name: text })

    expect(within(button).getByTestId('icon')).toBeInTheDocument()
  })
})
