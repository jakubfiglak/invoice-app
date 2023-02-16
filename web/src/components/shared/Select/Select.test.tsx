import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import { optionFactory } from './option-factory'
import Select from './Select'

describe('Select', () => {
  it('should call onChange function', async () => {
    const onChange = jest.fn()
    const options = optionFactory.buildList(3)

    render(
      <Select
        label={faker.lorem.word()}
        options={options}
        onChange={onChange}
      />
    )

    const select = screen.getByRole('combobox')
    const value = options[1].value

    await userEvent.selectOptions(select, value)

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value,
        }),
      })
    )
  })

  it('should properly select options', async () => {
    const onChange = jest.fn()
    const options = optionFactory.buildList(3)

    render(
      <Select
        label={faker.lorem.word()}
        options={options}
        onChange={onChange}
      />
    )

    const select = screen.getByRole('combobox')

    await userEvent.selectOptions(select, options[1].value)

    expect(
      screen.getByRole<HTMLOptionElement>('option', { name: options[0].label })
        .selected
    ).toBe(false)

    expect(
      screen.getByRole<HTMLOptionElement>('option', { name: options[1].label })
        .selected
    ).toBe(true)

    expect(
      screen.getByRole<HTMLOptionElement>('option', { name: options[2].label })
        .selected
    ).toBe(false)
  })

  it('should display passed value', () => {
    const options = optionFactory.buildList(3)
    const value = options[1].value

    render(
      <Select
        label={faker.lorem.word()}
        options={options}
        value={value}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByRole('combobox')).toHaveValue(value)
  })

  it('should be properly labeled', () => {
    const label = faker.lorem.word()

    render(
      <Select
        label={label}
        name={faker.lorem.word()}
        options={optionFactory.buildList(3)}
      />
    )

    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  it('should be disabled if proper prop was passed', () => {
    render(
      <Select
        label={faker.lorem.word()}
        options={optionFactory.buildList(3)}
        disabled
      />
    )

    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('should be required if proper prop was passed', () => {
    render(
      <Select
        label={faker.lorem.word()}
        options={optionFactory.buildList(3)}
        required
      />
    )

    expect(screen.getByRole('combobox')).toBeRequired()
  })
})
