import { faker } from '@faker-js/faker'

import { render, screen } from 'src/test/utils'

import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders properly labelled loading skeleton', () => {
    render(<Skeleton />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders proper number of loading skeletons if COUNT prop is passed', () => {
    const count = faker.datatype.number({ max: 10 })

    render(<Skeleton count={count} />)

    expect(screen.queryAllByText(/loading/i)).toHaveLength(count)
  })
})
