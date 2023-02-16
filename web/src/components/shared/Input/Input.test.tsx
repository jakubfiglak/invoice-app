import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import Input from './Input'

describe('Input', () => {
  it('should call onChange function', async () => {
    const onChange = jest.fn()

    render(
      <Input
        label={faker.lorem.word()}
        name={faker.lorem.word()}
        onChange={onChange}
      />
    )

    const input = screen.getByRole('textbox')

    const value = faker.lorem.word()

    await userEvent.type(input, value)

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value,
        }),
      })
    )
  })

  it('should display passed value', () => {
    const value = faker.lorem.word()

    render(
      <Input
        label={faker.lorem.word()}
        name={faker.lorem.word()}
        value={value}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByRole('textbox')).toHaveValue(value)
  })

  it('should be properly labeled', () => {
    const label = faker.lorem.word()

    render(<Input label={label} name={faker.lorem.word()} />)

    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  it('should display placeholder correctly', () => {
    const placeholder = faker.lorem.word()

    render(<Input label={faker.lorem.word()} placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('should be disabled if proper prop was passed', () => {
    render(<Input label={faker.lorem.word()} disabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should be required if proper prop was passed', () => {
    render(<Input label={faker.lorem.word()} required />)

    expect(screen.getByRole('textbox')).toBeRequired()
  })
})
