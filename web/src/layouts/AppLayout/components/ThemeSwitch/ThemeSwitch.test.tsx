import { faker } from '@faker-js/faker'

import { testIds } from 'src/test/ids'
import { render, screen, userEvent } from 'src/test/utils'

import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  it('passes the class name properly', () => {
    const className = faker.random.word()

    render(<ThemeSwitch className={className} />)

    expect(screen.getByRole('button', { name: /toggle theme/i })).toHaveClass(
      className
    )
  })

  it('displays different icon when clicked', async () => {
    render(<ThemeSwitch />)

    const button = screen.getByRole('button', { name: /toggle theme/i })

    expect(screen.getByTestId(testIds.darkModeIcon)).toBeInTheDocument()

    await userEvent.click(button)

    expect(screen.getByTestId(testIds.lightModeIcon)).toBeInTheDocument()
  })
})
